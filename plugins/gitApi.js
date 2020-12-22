export default function (context, inject) {
    const baseUrl = context.env.GITLAB_BASEURL
    const projectPath = context.env.GITLAB_PROJECT_PATH.replace(/\//g, '%2F')
    const apiVersion = 'v4'
    const token = context.store.$auth.strategy.token.get()
    const headers = {
        "Authorization": token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    const filePath = 'deploy/telegraf/OPC_UA'

    inject('gitApi', {
        getDefaultPath,
        getProjecs,
        getProjectTree,
        getProjectFile,
        getProjectCommits,
        getFileCommits,
        getLastFileCommit,
        getUserAvatar,
        pushFileToRepo,
        updateFileInRepo,
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

    async function pushFileToRepo(file, commitMessage = 'Upload new file(s)') {
        const filePath = 'graphics/'
        try {
            const filename = file.name
            filename.replace(/\s/g, '%20').replace(/\./g, '%2E')
            const path = filePath.replace(/\//g, '%2F').replace(/\./g, '%2E')

            let contentBuffer = await readFileAsync(file);

            return unWrap(await fetch(`${baseUrl}/api/${apiVersion}/projects/${projectPath}/repository/files/${path}${filename}`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    branch: "master",
                    author_email: context.store.$auth.user.email,
                    author_name: context.store.$auth.user.name,
                    content: contentBuffer,
                    commit_message: commitMessage
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function updateFileInRepo(file, commitMessage = 'Upload new file(s)') {
        const filePath = 'graphics/'
        try {
            const filename = file.name
            filename.replace(/\s/g, '%20').replace(/\./g, '%2E')
            const path = filePath.replace(/\//g, '%2F').replace(/\./g, '%2E')

            let contentBuffer = await readFileAsync(file);

            return unWrap(await fetch(`${baseUrl}/api/${apiVersion}/projects/${projectPath}/repository/files/${path}${filename}`, {
                headers,
                method: 'PUT',
                body: JSON.stringify({
                    branch: "master",
                    author_email: context.store.$auth.user.email,
                    author_name: context.store.$auth.user.name,
                    content: contentBuffer,
                    commit_message: commitMessage
                })
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

    function getDefaultPath() {
        return context.env.GITLAB_BASEURL +
            "/" +
            context.env.GITLAB_PROJECT_PATH +
            "/-/"
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

    function readFileAsync(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = () => {
                reject(new Error("Whoops! Could not read file.." + reader.result));
            }

            if (file.type == 'image/svg+xml') {
                reader.readAsText(file);
            } else {
                reader.readAsArrayBuffer(file);
            }
        })
    }
}