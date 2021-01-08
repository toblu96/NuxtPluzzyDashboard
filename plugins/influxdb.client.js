import {
    InfluxDB,
    FluxTableMetaData,
    flux,
    fluxDuration,
    Point,
    HttpError,
} from "@influxdata/influxdb-client";
const { hostname } = require('os')

export default function (context, inject) {

    // config data
    let url = process.env.INFLUXDB_BASEURL;
    let token = process.env.INFLUXDB_TOKEN;
    let org = process.env.INFLUXDB_ORGNAME;
    let queryApi = null;
    let writeEventApi = null;


    inject('timedb', {
        getConfig,
        getLastEntry,
        getRunningBatch,
        getFinishedBatches,
        writeEvent,

    })

    initQueryApi();

    function initQueryApi() {
        queryApi = new InfluxDB({ url, token }).getQueryApi(org);
    }

    function getConfig() {
        return { url, token, org, start }
    }

    // get last entry from specific tagName in InfluxDB
    async function getLastEntry(tagName) {
        const fluxQuery = flux`from(bucket: "OPC Data")
        |> range(start: -1h)
        |> filter(fn: (r) => r["name"] == "${tagName}")
        |> filter(fn: (r) => r["_field"] == "${tagName}")
        |> last()`;

        let result = new Promise((res, rej) => {
            // let localData = 'not found'
            let localData = tagName

            queryApi.queryRows(fluxQuery, {
                next(row, tableMeta) {
                    const o = tableMeta.toObject(row);
                    localData = o._value
                },
                error(error) {
                    console.error(error);
                    rej(error)
                },
                complete() {
                    res(localData)
                },
            });
        });

        return await result
    }

    // get finished batches from InfluxDB Events table
    async function getFinishedBatches() {
        const fluxQuery = flux`
        startTimeTable = from(bucket: "Events")
        |> range(start: time(v: 0), stop: now())
        |> filter(fn: (r) => r["_measurement"] == "BatchEvent")
        |> filter(fn: (r) => r["_value"] == "BatchStart")
        |> group(columns: ["BatchName"], mode:"by")
        |> first()
        |> keep(columns: ["_time", "BatchName", "loggedUser"])
        |> rename(columns: {_time: "StartTime"})

        endTimeTable = from(bucket: "Events")
        |> range(start: time(v: 0), stop: now())
        |> filter(fn: (r) => r["_measurement"] == "BatchEvent")
        |> filter(fn: (r) => r["_value"] == "BatchEnd")
        |> group(columns: ["BatchName"], mode:"by")
        |> last()
        |> keep(columns: ["_time", "BatchName", "loggedUser"])
        |> rename(columns: {_time: "EndTime"})

        join(
        tables: {StartTime: startTimeTable, EndTime: endTimeTable},
        on: ["BatchName"]
        )
        `;

        let result = new Promise((res, rej) => {
            let localData = []

            queryApi.queryRows(fluxQuery, {
                next(row, tableMeta) {
                    const o = tableMeta.toObject(row);
                    localData.push(o)
                },
                error(error) {
                    rej(new Error('[InfluxDB query for finished batches]: ' + error))
                },
                complete() {
                    res(localData)
                },
            });
        });

        return await result
    }

    async function getRunningBatch() {
        const fluxQuery = flux`
        lastStart = from(bucket: "Events")
        |> range(start: time(v: 0), stop: now())
        |> filter(fn: (r) => r["_measurement"] == "BatchEvent")
        |> filter(fn: (r) => r["_value"] == "BatchStart")
        |> first()
        |> group(columns: ["_value"], mode:"by")
        |> sort(columns: ["_time"], desc: false)
        |> last()
        lastEnd = from(bucket: "Events")
        |> range(start: time(v: 0), stop: now())
        |> filter(fn: (r) => r["_measurement"] == "BatchEvent")
        |> filter(fn: (r) => r["_value"] == "BatchEnd")
        |> last()
        |> group(columns: ["_value"], mode:"by")
        |> sort(columns: ["_time"], desc: false)
        |> last()
        union(tables: [lastStart, lastEnd])
        `;

        let result = new Promise((res, rej) => {
            let localData = []

            queryApi.queryRows(fluxQuery, {
                next(row, tableMeta) {
                    const o = tableMeta.toObject(row);
                    localData.push(o)
                },
                error(error) {
                    rej(new Error('[InfluxDB query for running batch]: ' + error))
                },
                complete() {
                    if (localData[0].BatchName == localData[1].BatchName) {
                        res([])
                    }
                    res(localData.find(element => element._value == 'BatchStart'))
                },
            });
        });

        return await result
    }

    async function writeEvent(eventName, eventType) {

        return new Promise((res, rej) => {
            writeEventApi = new InfluxDB({ url, token }).getWriteApi(org, 'Events', 'ns')
            writeEventApi.useDefaultTags({ location: 'Pluzzy Dashboard' })

            const point1 = new Point('BatchEvent')
                // .tag('EventType', eventType) // start stop batch..
                .tag('BatchName', eventName) // batch wo_01_x21
                .tag('loggedUser', context.store.$auth.user.email)
                .stringField('RuntimeEvent', eventType)
            writeEventApi.writeRecord(point1)
            writeEventApi
                .close()
                .then(() => {
                    res({
                        json: 'Event write successful',
                        ok: true,
                        status: '',
                        statusText: ''
                    })
                })
                .catch(e => {
                    console.error(e)
                    if (e instanceof HttpError && e.statusCode === 401) {
                        console.log('Run ./onboarding.js to setup a new InfluxDB database.')
                        rej({
                            json: '',
                            ok: false,
                            status: '401',
                            statusText: 'Write failed, setup a new InfluxDB database.'
                        })
                    }
                    console.log('\nFinished ERROR')
                    rej({
                        json: '',
                        ok: false,
                        status: e.statusCode || '400',
                        statusText: e.message || 'Finished ERROR'
                    })
                })
        })
    }

}