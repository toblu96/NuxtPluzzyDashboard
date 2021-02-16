export default async function (context, inject) {
    const baseUrl = context.$config.SWARMPIT_BASEURL
    const token = context.$config.SWARMPIT_TOKEN

    const headers = {
        "Authorization": token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    inject('swarmpitApi', {
        getServices,
    })


    async function getServices() {
        try {
            const reqUrl = `${baseUrl}/api/services`
            return unWrap(await fetch(`http://${window.location.host}/api/serverFetch?url=${reqUrl}`, {
                headers,
                method: 'GET',
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function unWrap(response) {
        const json = await response.json()
        const { ok, status, statusText } = response
        return {
            json,
            ok,
            status,
            statusText
        }
    }

    function getErrorResponse(error) {
        return {
            ok: false,
            status: 500,
            statusText: error.message,
            json: {}
        }
    }
}