import {
    InfluxDB,
    FluxTableMetaData,
    flux,
    fluxDuration,
} from "@influxdata/influxdb-client";

export default function (context, inject) {

    // config data
    let url = process.env.influx_url;
    let token = process.env.influx_token;
    let org = process.env.influx_org;
    let queryApi = null;

    inject('timedb', {
        getConfig,
        getLastEntry,

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

}