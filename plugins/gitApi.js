export default function (context, inject) {
    const baseUrl = context.env.GITLAB_BASEURL
    const projectPath = context.env.GITLAB_PROJECT_PATH.replace(/\//g, '%2F')
    const apiVersion = 'v4'
    const token = context.store.$auth.strategy.token.get()
    const headers = {
        "Authorization": token
    }

    const filePath = 'deploy/telegraf/OPC_UA'

    inject('gitApi', {
        getProjecs,
        getProjectTree,
        getProjectFile,
        getProjectCommits,
        getFileCommits,
        getLastFileCommit,
        getUserAvatar,
    })

    async function getProjecs() {
        try {
            return unWrap(await fetch(`${baseUrl}/api/${apiVersion}/projects`, { headers }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getProjectTree(treePath = '') {
        try {
            return unWrap(await fetch(`${baseUrl}/api/${apiVersion}/projects/${projectPath}/repository/tree?recursive=true&path=${treePath}`, { headers }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getProjectFile(filePath) {
        try {

            const path = filePath.replace(/\//g, '%2F').replace(/\./g, '%2E')
            return unWrap(await fetch(`${baseUrl}/api/${apiVersion}/projects/${projectPath}/repository/files/${path}?ref=master`, { headers }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getProjectCommits() {
        try {
            return unWrap(await fetch(`${baseUrl}/api/${apiVersion}/projects/${projectPath}/repository/commits`, { headers }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getFileCommits(filePath) {
        try {
            return unWrap(await fetch(`${baseUrl}/api/${apiVersion}/projects/${projectPath}/repository/commits?path=${filePath}`, { headers }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getLastFileCommit(filePath) {
        try {
            return unWrapFirst(await fetch(`${baseUrl}/api/${apiVersion}/projects/${projectPath}/repository/commits?path=${filePath}`, { headers }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getUserAvatar(email) {
        try {
            return unWrap(await fetch(`${baseUrl}/api/${apiVersion}/avatar?email=${email}`, { headers }))
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
    async function unWrapFirst(response) {
        const tmpJson = await response.json()
        const json = []
        json.push(tmpJson[0])
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