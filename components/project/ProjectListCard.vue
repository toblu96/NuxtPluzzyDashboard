<template>
  <div>
    <ul
      v-if="files[0] != undefined"
      class="relative z-0 divide-y divide-gray-200 border-b border-gray-200"
    >
      <li
        v-for="file in findEntry(files, getSearchString)"
        :key="file.path"
        class="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
        :class="
          isDeletingPath == file.path
            ? 'animate-pulse bg-gradient-to-r from-orange-100 to-pink-100'
            : ''
        "
      >
        <div class="flex items-center justify-between space-x-4">
          <!-- Repo name and link -->
          <div class="min-w-0 space-y-3">
            <div class="flex items-center space-x-3">
              <span
                class="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center"
                aria-hidden="true"
              >
                <span class="h-2 w-2 bg-green-400 rounded-full"></span>
              </span>

              <span class="block">
                <h2 class="text-sm font-medium">
                  <a href="#">
                    <span class="absolute inset-0" aria-hidden="true"></span>
                    {{ file.name }} <span class="sr-only">Running</span>
                  </a>
                </h2>
              </span>
            </div>
            <a
              :href="gitlabFilePath(file.path)"
              target="_blank"
              class="relative group flex items-center space-x-2.5"
            >
              <svg
                class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.99917 0C4.02996 0 0 4.02545 0 8.99143C0 12.9639 2.57853 16.3336 6.15489 17.5225C6.60518 17.6053 6.76927 17.3277 6.76927 17.0892C6.76927 16.8762 6.76153 16.3104 6.75711 15.5603C4.25372 16.1034 3.72553 14.3548 3.72553 14.3548C3.31612 13.316 2.72605 13.0395 2.72605 13.0395C1.9089 12.482 2.78793 12.4931 2.78793 12.4931C3.69127 12.5565 4.16643 13.4198 4.16643 13.4198C4.96921 14.7936 6.27312 14.3968 6.78584 14.1666C6.86761 13.5859 7.10022 13.1896 7.35713 12.965C5.35873 12.7381 3.25756 11.9665 3.25756 8.52116C3.25756 7.53978 3.6084 6.73667 4.18411 6.10854C4.09129 5.88114 3.78244 4.96654 4.27251 3.72904C4.27251 3.72904 5.02778 3.48728 6.74717 4.65082C7.46487 4.45101 8.23506 4.35165 9.00028 4.34779C9.76494 4.35165 10.5346 4.45101 11.2534 4.65082C12.9717 3.48728 13.7258 3.72904 13.7258 3.72904C14.217 4.96654 13.9082 5.88114 13.8159 6.10854C14.3927 6.73667 14.7408 7.53978 14.7408 8.52116C14.7408 11.9753 12.6363 12.7354 10.6318 12.9578C10.9545 13.2355 11.2423 13.7841 11.2423 14.6231C11.2423 15.8247 11.2313 16.7945 11.2313 17.0892C11.2313 17.3299 11.3937 17.6097 11.8501 17.522C15.4237 16.3303 18 12.9628 18 8.99143C18 4.02545 13.97 0 8.99917 0Z"
                  fill="currentcolor"
                />
              </svg>
              <span
                class="text-sm text-gray-500 group-hover:text-gray-900 font-medium truncate"
              >
                {{ shortFilePath(file.path) }}
              </span>
            </a>
          </div>
          <div class="sm:hidden">
            <!-- Heroicon name: chevron-right -->
            <svg
              class="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <!-- Repo meta info -->
          <div
            class="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3"
          >
            <div class="flex items-center space-x-4">
              <div class="group relative">
                <button
                  @click="deleteFile(file.path)"
                  class="flex items-center space-x-1 text-sm text-gray-500 group-hover:text-gray-900 font-medium focus:outline-none"
                >
                  <svg
                    class="h-5 w-5 text-gray-500 group-hover:text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                  <span> Delete file </span>
                </button>
              </div>
            </div>
            <p class="flex text-gray-500 text-sm space-x-2">
              <span>{{ fileType(shortFilePath(file.path)) }}</span>
              <span aria-hidden="true">&middot;</span>
              <span
                >Last commit
                {{ $moment(file.lastCommit.committed_date).fromNow() }}</span
              >
              <span aria-hidden="true">&middot;</span>
              <span>{{ file.lastCommit.committer_name }}</span>
            </p>
          </div>
        </div>
      </li>
      <!-- No Search result -->
      <div
        v-show="
          getSearchString != '' &&
          findEntry(files, getSearchString)[0] == undefined
        "
        class="flex flex-col p-8 items-center"
      >
        <img
          class="w-full sm:w-1/2"
          src="~/assets/images/search-result-not-found.png"
        />
        <div
          class="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 text-sm"
        >
          <p class="flex-auto">Can't find any files with the name containing</p>
          <span
            class="flex-auto text-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800"
          >
            {{ getSearchString }}
          </span>
        </div>
      </div>
    </ul>
    <!-- Profile Skeleton Loader -->
    <div
      v-else
      class="animate-pulse flex space-x-3 pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
    >
      <!-- <div class="rounded-full bg-orange-200 h-12 w-12"></div> -->
      <div class="flex-1 space-y-2 py-1">
        <div class="h-4 bg-orange-200 rounded w-3/4"></div>
        <div class="h-4 bg-orange-200 rounded w-ful"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: function () {
    return {
      files: [],
      isDeletingPath: "",
    };
  },
  async mounted() {
    await this.reloadFiles();
  },
  computed: {
    ...mapGetters("search", ["getSearchString"]),
  },
  methods: {
    async reloadFiles() {
      this.files = await this.getRichProjectFileData();
    },
    async deleteFile(filePath) {
      this.isDeletingPath = filePath;
      // delete Project File
      const responses = await Promise.all([
        this.$gitApi.deleteFileInRepo(filePath),
      ]);
      const badResponse = responses.find((response) => !response.ok);
      if (badResponse) {
        $nuxt.error({
          statusCode: badResponse.status,
          message: badResponse.statusText,
        });
      }

      await this.reloadFiles();
      this.isDeletingPath = "";
    },
    async getRichProjectFileData() {
      // get Project Files
      const responses = await Promise.all([
        this.$gitApi.getProjectTree("deploy/telegraf/OPC_UA"),
        this.$gitApi.getProjectTree("graphics"),
      ]);
      const badResponse = responses.find((response) => !response.ok);
      if (badResponse) {
        $nuxt.error({
          statusCode: badResponse.status,
          message: badResponse.statusText,
        });
      }
      const files = [...responses[0].json, ...responses[1].json];

      // add commit data
      await Promise.all(
        files.map(async (file, index) => {
          const commit = await this.$gitApi.getLastFileCommit(file.path);
          files[index].lastCommit = commit.json[0];
        })
      );

      // add avatar url
      // await Promise.all(
      //   files.map(async (file, index) => {
      //     const avatarUrl = await this.$gitApi.getUserAvatar(
      //       file.lastCommit.author_email
      //     );
      //     files[index].lastCommit.avatar_url = avatarUrl.json.avatar_url;
      //   })
      // );
      return files;
    },
    gitlabFilePath(filename) {
      return (
        this.$config.GITLAB_BASEURL +
        "/" +
        this.$config.GITLAB_PROJECT_PATH +
        "/-/blob/master/" +
        filename
      );
    },
    shortFilePath(path) {
      return path.match(/^(.+)\//g)[0];
    },
    fileType(shortFilePath) {
      return shortFilePath
        .match(/([a-zA-z]+)(\/)$/i)[1]
        .replace("_", " ")
        .toUpperCase();
    },
    findEntry(fileArray, searchString) {
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
    },
  },
};
</script>

<style>
</style>