<template>
  <div class="mx-auto py-4">
    <!-- header -->
    <header class="flex mb-4 sm:mb-0 space-x-2 text-center">
      <NuxtLink
        to="/project/explore"
        class="group flex items-center space-x-2.5"
        ><svg
          class="w-6 h-6 text-gray-400 group-hover:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        <span
          class="text-sm text-gray-500 group-hover:text-gray-900 font-medium"
          >Back</span
        ></NuxtLink
      >
    </header>
    <!-- subheader -->
    <div
      v-if="file != undefined"
      class="pb-5 border-b border-gray-200 sm:flex sm:items-end sm:justify-between"
    >
      <h3 class="hidden sm:block text-lg leading-6 font-medium text-gray-900">
        {{ file.name }}
      </h3>
      <div class="mt-3 sm:mt-0 sm:ml-4">
        <ExploreDataConnectionCard :fileData="file" />
      </div>
    </div>

    <!-- main content -->
    <div v-if="isLoaded" class="py-4">
      <!-- No Search result -->
      <div
        v-if="configFile.nodes == undefined || configFile.nodes.length == 0"
        class="flex flex-col p-8 items-center w-full"
      >
        <img
          class="my-8 w-full sm:w-1/2"
          src="~/assets/images/search-not-found.svg"
        />
        <div
          class="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 text-base font-medium text-gray-900"
        >
          Could not find any tags in this data configuration
        </div>
      </div>
      <!-- content -->
      <div v-else class="flex flex-col md:flex-row md:space-x-4 w-full">
        <!-- tag search list -->
        <div class="md:w-2/5 mb-4">
          <!-- checkbox groups -->
          <nav class="sticky top-4 space-y-1 bg-gray-200 rounded-md p-4">
            <div class="space-y-4">
              <!-- Search input -->
              <div>
                <label for="search" class="sr-only">Search Data Tags</label>
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
                    placeholder="Search tags"
                    v-model="searchString"
                    ref="searchInput"
                    @keydown.esc="
                      $refs.searchInput.blur();
                      searchString = '';
                    "
                  />
                </div>
              </div>

              <div class="flex items-center space-x-3 px-4">
                <input
                  v-model="selectAll"
                  type="checkbox"
                  class="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
                />

                <legend class="text-base font-medium text-gray-900">
                  Available Data Tags
                </legend>
              </div>
            </div>

            <!-- Tag checkboxes -->
            <fieldset class="h-96 md:h-halfview overflow-y-auto">
              <label
                v-for="tag in filteredSearch(configFile.nodes, searchString)"
                :for="`${tag.Name}-0`"
                :key="tag.id"
                class="hover:bg-orange-100 relative border p-4 flex rounded-md mr-4 cursor-pointer"
              >
                <input
                  :id="`${tag.Name}-0`"
                  :name="`${tag.Name}-0`"
                  :value="tag.Name"
                  v-model="panelNodes"
                  type="checkbox"
                  class="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
                />
                <div class="ml-3 flex flex-col">
                  <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                  <span
                    id="privacy-setting-0-label"
                    class="text-gray-600 block text-sm font-medium"
                  >
                    {{ tag.Name }}
                  </span>
                  <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                  <span
                    id="privacy-setting-0-description"
                    class="text-gray-500 block text-sm"
                  >
                    {{ tag.Description }}
                  </span>
                </div>
              </label>

              <!-- Empty state notification -->
              <div
                v-show="
                  filteredSearch(configFile.nodes, searchString).length === 0
                "
                class="rounded-md bg-red-50 p-4 ml-4"
              >
                <div class="flex">
                  <div class="flex-shrink-0">
                    <!-- Heroicon name: solid/x-circle -->
                    <svg
                      class="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800">
                      No tags found..
                    </h3>
                  </div>
                </div>
              </div>
            </fieldset>
          </nav>
        </div>
        <!-- grafana panel list -->
        <div class="w-full space-y-4">
          <iframe
            v-for="node in panelNodes"
            :key="node"
            class="w-full h-64 sm:h-96 rounded-md"
            :src="`${$config.GRAFANA_BASEURL}/d-solo/1sIiLXaGz/public-dashboard?orgId=1&var-TagName=${node}&theme=light&panelId=4&refresh=10s`"
          ></iframe>

          <div
            v-show="panelNodes.length == 0"
            class="flex w-full justify-center bg-white rounded-md p-4"
          >
            <div class="w-full sm:w-1/2">
              <img class="my-8" src="~/assets/images/search-not-found.svg" />
              <h3 class="text-sm font-medium">
                There are no tags selected. Please select a data tag from the
                list.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Skeleton loader -->
    <div
      v-else
      class="animate-pulse py-4 flex flex-col md:flex-row md:space-x-4"
    >
      <div class="h-48 bg-orange-200 rounded w-2/5"></div>
      <div class="h-48 bg-orange-200 rounded w-full"></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "application-second-nav",
  data: function () {
    return {
      configFile: {},
      searchString: "",
      panelNodes: [],
      isLoaded: false,
    };
  },
  async asyncData({ params, store }) {
    const id = params.id; // When calling /abc the slug will be "abc"
    return { id };
  },
  computed: {
    file() {
      return this.$store.getters["gitFiles/getConfigFileById"](this.id);
    },
    selectAll: {
      get() {
        return this.configFile.nodes
          ? this.panelNodes.length == this.configFile.nodes.length
          : false;
      },
      set(value) {
        var selected = [];

        if (value) {
          this.configFile.nodes.forEach(function (tag) {
            selected.push(tag.Name);
          });
        }

        this.panelNodes = selected;
      },
    },
  },
  watch: {
    file: async function (file) {
      if (file != undefined) {
        await this.getTimedbTags(file.name);
      }
    },
  },
  mounted() {
    this.$store.commit("gitFiles/updateConfigFiles");
  },
  methods: {
    async getTimedbTags(filename) {
      const response = await this.$gitApi.getProjectFileRaw(
        "deploy/config/" + filename.replace(".conf", ".json")
      );
      if (!response.ok) {
        console.error(response.status, response.statusText);
        this.isLoaded = true;
        return;
      }
      this.configFile = response.json;

      // select first tag after page reload
      if (this.configFile.nodes.length > 0)
        this.panelNodes.push(this.configFile.nodes[0].Name);

      this.isLoaded = true;
    },
    filteredSearch(data, searchString) {
      return data.filter((data) =>
        data.Name.toLowerCase().includes(searchString.toLowerCase())
      );
    },
  },
};
</script>

<style>
</style>