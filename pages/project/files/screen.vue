<template>
  <!-- Projects List -->
  <div class="bg-white lg:min-w-0 lg:flex-1">
    <div
      class="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0"
    >
      <!-- Projects List Header -->
      <div class="flex items-center">
        <h1 class="flex-1 text-lg font-medium">Screen Files</h1>
        <div>
          <button
            @click="$nuxt.$emit('modal-upload-screen-open')"
            type="button"
            class="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 xl:w-full"
          >
            <!-- Heroicon name: upload -->
            <svg
              class="mr-3 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              ></path>
            </svg>
            <p>Upload New Screen</p>
          </button>
        </div>
      </div>
    </div>

    <!-- Projects List Cards -->
    <div>
      <ul
        v-if="files.length > 0"
        class="relative z-0 divide-y divide-gray-200 border-b border-gray-200"
      >
        <li
          v-for="file in files"
          :key="file.path"
          class="relative space-y-4 pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
          :class="
            file.isDeleting
              ? 'animate-pulse bg-gradient-to-r from-orange-100 to-pink-100'
              : ''
          "
        >
          <!-- card heading -->
          <div class="flex justify-between">
            <div>
              <span class="block">
                <h2 class="text-sm font-medium">
                  <a :href="gitlabFilePath(file.path)" target="_blank">
                    <span class="absolute inset-0" aria-hidden="true"></span>
                    {{ file.name }} <span class="sr-only">Running</span>
                  </a>
                </h2>
              </span>
            </div>
            <div>
              <div class="hidden sm:flex itemsd-center space-x-4">
                <div class="group relative">
                  <button
                    :disabled="file.isDeleting"
                    @click="$store.commit('gitFiles/deleteFile', file.path)"
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
            </div>
          </div>

          <!-- image preview -->
          <div class="flex justify-between">
            <div class="w-full">
              <img
                class="h-20 sm:h-56 mx-auto"
                :src="gitlabRawFilePath(file.path)"
                alt=""
              />
            </div>

            <div class="flex sm:hidden items-center">
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
          </div>

          <!-- card footer -->
          <div class="flex justify-between">
            <div>
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
            <div>
              <p class="hidden sm:flex text-gray-500 text-sm space-x-2">
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
      </ul>
      <!-- Profile Skeleton Loader -->
      <div
        v-if="files.length == 0 && !isLoaded"
        class="animate-pulse flex space-x-3 pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
      >
        <!-- <div class="rounded-full bg-orange-200 h-12 w-12"></div> -->
        <div class="flex-1 space-y-2 py-1">
          <div class="h-4 bg-orange-200 rounded w-3/4"></div>
          <div class="h-4 bg-orange-200 rounded w-ful"></div>
        </div>
      </div>
      <!-- No Search result -->
      <div
        v-if="files.length == 0 && isLoaded"
        class="flex flex-col p-8 items-center"
      >
        <img
          class="my-8 w-full sm:w-3/4"
          src="~/assets/images/search-not-found.svg"
        />
        <div
          class="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 text-sm"
        >
          <p class="flex-auto">Can't find any files with the name containing</p>
          <span
            class="flex-auto text-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800"
          >
            {{ searchString }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      files: "gitFiles/getGraphicFiles",
      searchString: "gitFiles/getSearchString",
      isLoaded: "gitFiles/isLoaded",
    }),
  },
  async mounted() {
    this.$store.commit("gitFiles/updateGraphicFiles");
  },
  methods: {
    gitlabFilePath(filename) {
      return (
        this.$config.GITLAB_BASEURL +
        "/" +
        this.$config.GITLAB_PROJECT_PATH +
        "/-/blob/master/" +
        filename
      );
    },
    gitlabRawFilePath(filePath) {
      return (
        this.$config.GITLAB_BASEURL +
        "/" +
        this.$config.GITLAB_PROJECT_PATH +
        "/-/raw/master/" +
        filePath
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
  },
};
</script>

<style>
</style>