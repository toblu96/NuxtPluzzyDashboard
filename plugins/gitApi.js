export default function (context, inject) {
    const baseUrl = context.$config.GITLAB_BASEURL
    const projectPath = context.$config.GITLAB_PROJECT_PATH.replace(/\//g, '%2F')
    const apiVersion = 'v4'
    const token = context.store.$auth.strategy.token.get()
    const headers = {
        "Authorization": token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryBkw0n9WIXAw1z56j',
        // https://wiki.selfhtml.org/wiki/MIME-Type/%C3%9Cbersicht
        // 'Content-Type': 'application/vnd.openxmlformats-officedocument. spreadsheetml.sheet',
    }

    const filePath = 'deploy/telegraf/OPC_UA'

    inject('gitApi', {
        getDefaultPath,
        getProjecs,
        getProjectTree,
        getProjectFile,
        getProjectFileRaw,
        getProjectCommits,
        getFileCommits,
        getLastFileCommit,
        getUserAvatar,
        pushFileToRepo,
        updateFileInRepo,
        deleteFileInRepo,
        readFileAsync,
        commitFiles,
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
            const path = encodeURIComponent(filePath)
            return unWrap(await fetch(`${baseUrl}/api/${apiVersion}/projects/${projectPath}/repository/files/${path}?ref=master`, { headers }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getProjectFileRaw(filePath) {
        try {
            const path = encodeURIComponent(filePath)
            return unWrap(await fetch(`${baseUrl}/api/${apiVersion}/projects/${projectPath}/repository/files/${path}/raw?ref=master`, { headers }))
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

    async function pushFileToRepo(file, commitMessage = 'Upload new file(s)', filePath = '') {
        try {
            let contentBuffer = ''
            let filename = ''

            // check if input is a file or raw data
            if (file instanceof File) {
                contentBuffer = await readFileAsync(file);
                filename = encodeURIComponent(file.name)
            } else {
                contentBuffer = JSON.stringify(file)
                filename = encodeURIComponent(file.name + '.json')
            }

            const path = encodeURIComponent(filePath)


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

    async function updateFileInRepo(file, commitMessage = 'Upload new file(s)', filePath = '') {
        try {
            let contentBuffer = ''
            let filename = ''

            // check if input is a file or raw data
            if (file instanceof File) {
                contentBuffer = await readFileAsync(file);
                filename = encodeURIComponent(file.name)
            } else {
                contentBuffer = JSON.stringify(file)
                filename = encodeURIComponent(file.name + '.json')
            }

            const path = encodeURIComponent(filePath)

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

    async function deleteFileInRepo(filePath, commitMessage = 'Delete file(s)') {
        try {
            const path = encodeURIComponent(filePath)

            return unWrap(await fetch(`${baseUrl}/api/${apiVersion}/projects/${projectPath}/repository/files/${path}`, {
                headers,
                method: 'DELETE',
                body: JSON.stringify({
                    branch: "master",
                    author_email: context.store.$auth.user.email,
                    author_name: context.store.$auth.user.name,
                    commit_message: commitMessage
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function commitFiles(files, commitMessage = 'Upload new file(s)', filePath = '') {
        try {
            let commitActions = {
                "branch": "master",
                "commit_message": commitMessage,
                "actions": []
            }
            let contentBuffer = ''
            let filename = ''

            // read current files
            const response = await this.getProjectTree(filePath)
            if (!response.ok) {
                console.error({
                    statusCode: badResponse.status,
                    message: badResponse.statusText,
                });
            }
            const existingFiles = response.json;

            // check for old files to delete
            const filesToDelete = checkDiff(existingFiles, files)
            for (let file of filesToDelete) {
                commitActions.actions.push({
                    "action": "delete",
                    "file_path": file.path
                })
            }

            // fill new files and check if they exist alredy (to update them)
            for (let file of files) {
                // check if input is a file or raw data
                if (file instanceof File) {
                    contentBuffer = await readFileAsync(file);
                    // filename = encodeURIComponent(file.name)
                    filename = filePath + file.name
                } else {
                    contentBuffer = JSON.stringify(file)
                    // filename = encodeURIComponent(file.name + '.json')
                    filename = filePath + file.name + '.json'
                }

                // check if file is new
                let fileIndex = existingFiles.findIndex(o => o.name.replace('.json', '') == file.name)
                if (fileIndex == -1) {
                    commitActions.actions.push({
                        "action": "create",
                        "file_path": filename,
                        "content": contentBuffer
                    })
                } else {
                    commitActions.actions.push({
                        "action": "update",
                        "file_path": filename,
                        "content": contentBuffer
                    })

                }
            }

            return unWrap(await fetch(`${baseUrl}/api/${apiVersion}/projects/${projectPath}/repository/commits`, {
                headers,
                method: 'POST',
                body: JSON.stringify(commitActions)
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }


    async function unWrap(response) {
        let json = ''
        try {
            json = await response.json()
        } catch (error) {
            json = 'No Content from response'
        }
        const { ok, status, statusText } = response
        return {
            json,
            ok,
            status,
            statusText
        }
    }

    function getDefaultPath() {
        return context.$config.GITLAB_BASEURL +
            "/" +
            context.$config.GITLAB_PROJECT_PATH +
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
            } else if (file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                reader.readAsBinaryString(file);
            } else {
                reader.readAsArrayBuffer(file);
            }
        })
    }

    function checkDiff(existingFiles, newFiles) {
        return existingFiles.filter((existingFile) => {
            let exists = false;
            for (let index = 0; index < newFiles.length; index++) {
                if (
                    newFiles[index].name.replace(".json", "") ==
                    existingFile.name.replace(".json", "")
                ) {
                    exists = true;
                    break;
                }
            }
            return !exists;
        });
    }
}