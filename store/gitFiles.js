export const state = () => ({
    configFiles: [],
    graphicFiles: [],
    searchString: '',
    commitMessages: [],
    loaded: false,
})

export const mutations = {
    async updateConfigFiles(state) {
        state.loaded = false
        // get Project Files
        const response = await this.$gitApi.getProjectTree("deploy/telegraf")
        if (!response.ok) {
            return $nuxt.error({
                statusCode: response.status,
                message: response.statusText,
            });
        }
        let files = response.json

        // remove folder locations so only files get listed
        files = files.filter((file, idx, files) => {
            return file.type == 'blob'
        });

        // add commit data
        await Promise.all(
            files.map(async (file, index) => {
                const response = await this.$gitApi.getLastFileCommit(file.path);
                if (!response.ok) {
                    return $nuxt.error({
                        statusCode: response.status,
                        message: response.statusText,
                    });
                }
                files[index].lastCommit = response.json[0];
            })
        );

        // sort files by name
        files.sort(function (a, b) {
            return a.name.localeCompare(b.name)
        });

        state.configFiles = files
        state.loaded = true
    },
    async updateGraphicFiles(state) {
        state.loaded = false
        // get Project Files
        const response = await this.$gitApi.getProjectTree("graphics")
        if (!response.ok) {
            $nuxt.error({
                statusCode: response.status,
                message: response.statusText,
            });
        }
        const files = response.json

        // add commit data
        await Promise.all(
            files.map(async (file, index) => {
                const response = await this.$gitApi.getLastFileCommit(file.path);
                if (!response.ok) {
                    $nuxt.error({
                        statusCode: response.status,
                        message: response.statusText,
                    });
                }
                files[index].lastCommit = response.json[0];
            })
        );

        state.graphicFiles = files
        state.loaded = true
    },
    async deleteFile(state, filePath) {
        // set deleting state
        let shouldUpdate = ''
        var deleteIndex = state.configFiles.findIndex((file) => file.path == filePath);
        if (deleteIndex != -1) {
            state.configFiles[deleteIndex].isDeleting = true
            shouldUpdate = 'config'
        }
        var deleteIndex = state.graphicFiles.findIndex((file) => file.path == filePath);
        if (deleteIndex != -1) {
            state.graphicFiles[deleteIndex].isDeleting = true
            shouldUpdate = 'graphic'
        }

        // tricking vuex into updating state (perhaps does not work because nested in IF)
        state.configFiles.push()
        state.graphicFiles.push()

        // delete Project File
        const response = await this.$gitApi.deleteFileInRepo(filePath)
        if (!response.ok) {
            $nuxt.error({
                statusCode: response.status,
                message: response.statusText,
            });
        }
        // reload files
        if (shouldUpdate == 'config')
            this.commit("gitFiles/updateConfigFiles");
        if (shouldUpdate == 'graphic')
            this.commit("gitFiles/updateGraphicFiles");
    },
    async updateCommitMessages(state) {
        // get Project Files
        const responses = await Promise.all([this.$gitApi.getProjectCommits()]);
        const badResponse = responses.find((response) => !response.ok);
        if (badResponse) {
            return $nuxt.error({
                statusCode: badResponse.status,
                message: badResponse.statusText,
            });
        }

        // only get a few ones (loading time..)
        const commits = responses[0].json.slice(0, 5);

        //   add avatar url
        await Promise.all(
            commits.map(async (commit, index) => {
                const avatarUrl = await this.$gitApi.getUserAvatar(
                    commit.author_email
                );
                commits[index].avatar_url = avatarUrl.json.avatar_url;
            })
        );

        state.commitMessages = commits;
    },


    updateSearchString(state, searchString) {
        state.searchString = searchString
    },
}


export const getters = {
    getConfigFiles: (state) => {
        return findEntry(state.configFiles, state.searchString)
    },
    getConfigFileById: state => id => state.configFiles.find(file => file.id == id),
    getGraphicFiles: (state) => {
        return findEntry(state.graphicFiles, state.searchString)
    },
    getSearchString: (state) => {
        return state.searchString
    },
    getCommitMessages: (state) => {
        return state.commitMessages
    },
    isLoaded: (state) => {
        return state.loaded
    },
}


// local functions

function findEntry(fileArray, searchString) {
    let arr = [];
    const words = searchString.split(/\s+/).filter((word) => word !== "");
    // return if there is no search string
    if (words.length == 0) return fileArray;

    for (var i = 0; i < words.length; ++i) {
        arr.push(
            ...fileArray.filter(
                (file) =>
                    file.name.toLowerCase().includes(words[i].toLowerCase()) &&
                    // only push file once
                    arr.indexOf(file) == -1
            )
        );
    }
    return arr;
}