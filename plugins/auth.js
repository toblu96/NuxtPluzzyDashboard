export default async function (context, inject) {
    const baseUrl = context.env.NODERED_BASEURL

    context.store.$auth.$storage.watchState('loggedIn', async loggedIn => {
        console.log('new value: ' + loggedIn)

        // reset token in NodeRed if not logged in
        if (!context.store.$auth.loggedIn) {
            return unWrap(await fetch(`${baseUrl}/api/token`, {
                method: 'DELETE',
                body: JSON.stringify({
                    gitlab_token: '',
                })
            }))
        }

    })


    // send token to NodeRed after logged in..
    return unWrap(await fetch(`${baseUrl}/api/token`, {
        method: 'POST',
        body: JSON.stringify({
            gitlab_token: context.store.$auth.strategy.token.get(),
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