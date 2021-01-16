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
        <!-- <div class="flex flex-col sm:flex-row xl:flex-col">
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
        </div> -->
      </div>

      <!-- Sidebar Search -->
      <div>
        <label for="search" class="sr-only">Search Files</label>
        <div class="mt-1 relative rounded-md shadow-sm">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            aria-hidden="true"
          >
            <!-- Heroicon name: search -->
            <svg
              class="mr-3 h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <input
            type="search"
            name="search"
            id="search"
            class="focus:ring-pink-500 focus:border-pink-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
            placeholder="Search files"
            v-model="searchString"
            ref="searchInput"
            @keydown.esc="
              $refs.searchInput.blur();
              updateSearchString('');
            "
          />
        </div>
      </div>

      <!-- Submenu -->
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import debounce from "lodash/debounce";

export default {
  data: function () {
    return {
      localAuth: {},
      searchString: "",
    };
  },
  mounted() {
    this.localAuth = this.$auth;
  },
  watch: {
    searchString: debounce(function (newVal, oldVal) {
      this.updateSearchString(newVal);
    }, 500),
    $route(to, from) {
      this.updateSearchString("");
      this.searchString = "";
    },
  },
  methods: {
    ...mapMutations({
      updateSearchString: "gitFiles/updateSearchString",
    }),
  },
};
</script>

<style>
</style>