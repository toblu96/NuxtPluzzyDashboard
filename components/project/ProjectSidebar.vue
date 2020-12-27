<template>
  <div class="flex items-center justify-between">
    <div class="flex-1 space-y-8">
      <div
        class="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8"
      >
        <div>
          <!-- Profile -->
          <div
            v-if="localAuth.user != undefined"
            class="flex items-center space-x-3"
          >
            <div class="flex-shrink-0 h-12 w-12">
              <img
                class="h-12 w-12 rounded-full ring-2 ring-gray-100"
                :src="localAuth.user.avatar_url"
                alt=""
              />
            </div>
            <div class="space-y-1">
              <div class="text-sm font-medium text-gray-900">
                {{ localAuth.user.name }}
              </div>
              <a
                :href="localAuth.user.web_url"
                class="group flex items-center space-x-2.5"
                target="_blank"
              >
                <svg
                  class="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span
                  class="text-sm text-gray-500 group-hover:text-gray-900 font-medium"
                  >{{ localAuth.user.username }}</span
                >
              </a>
            </div>
          </div>
          <!-- Profile Skeleton Loader -->
          <div v-else class="animate-pulse flex space-x-3">
            <div class="rounded-full bg-orange-200 h-12 w-12"></div>
            <div class="flex-1 space-y-2 py-1">
              <div class="h-4 bg-orange-200 rounded w-3/4"></div>
              <div class="h-4 bg-orange-200 rounded w-ful"></div>
            </div>
          </div>
        </div>
        <!-- Action buttons -->
        <div class="flex flex-col sm:flex-row xl:flex-col">
          <button
            @click="$emit('showConfigModal')"
            type="button"
            class="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 xl:w-full"
          >
            Import MSR File
          </button>
          <button
            @click="$emit('showGraphicsModal')"
            type="button"
            class="mt-3 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:ml-3 xl:ml-0 xl:mt-3 xl:w-full"
          >
            Upload Graphic
          </button>
        </div>
      </div>
      <!-- Meta info -->
      <div
        v-if="localAuth.user != undefined"
        class="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6"
      >
        <div
          v-show="localAuth.user.is_admin"
          class="flex items-center space-x-2"
        >
          <!-- Heroicon name: badge-check -->
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm text-gray-500 font-medium">Admin User</span>
        </div>
        <div class="flex items-center space-x-2">
          <!-- Heroicon name: collection -->
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
            />
          </svg>
          <span class="text-sm text-gray-500 font-medium">8 Projects</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      localAuth: {},
    };
  },
  mounted() {
    this.localAuth = this.$auth;
  },
};
</script>

<style>
</style>