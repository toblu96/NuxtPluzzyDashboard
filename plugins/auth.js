export default async function (context, inject) {

    const baseUrl = context.$config.NODERED_BASEURL

    context.store.$auth.$storage.watchState('loggedIn', async loggedIn => {

        // reset token in NodeRed if not logged in
        if (!context.store.$auth.loggedIn) {
            return unWrap(await fetch(`${baseUrl}/api/token`, {
                method: 'DELETE',
                body: JSON.stringify({
                    GITLAB_TOKEN: '',
                    SWARMPIT_TOKEN: '',
                })
            }))
        }

    })


    // send token to NodeRed after logged in..
    return unWrap(await fetch(`${baseUrl}/api/token`, {
        method: 'POST',
        body: JSON.stringify({
            GITLAB_TOKEN: context.store.$auth.strategy.token.get(),
            SWARMPIT_TOKEN: context.$config.SWARMPIT_TOKEN,
        })
    }))

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
}