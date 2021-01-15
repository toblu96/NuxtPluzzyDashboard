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
        <div class="w-2/5">
          <!-- checkbox groups -->
          <fieldset class="space-y-1">
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

            <div
              v-for="tag in configFile.nodes"
              :key="tag.id"
              class="hover:bg-orange-100 rounded-md"
            >
              <!-- On: "bg-indigo-50 border-indigo-200 z-10", Off: "border-gray-200" -->
              <div class="relative rounded-md p-4 flex">
                <!-- <span aria-hidden="true" class="absolute inset-0"></span> -->
                <div class="flex items-center h-5">
                  <input
                    :id="`${tag.Name}-0`"
                    :name="`${tag.Name}-0`"
                    :value="tag.Name"
                    v-model="panelNodes"
                    type="checkbox"
                    class="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
                  />
                </div>
                <label
                  :for="`${tag.Name}-0`"
                  class="ml-3 flex flex-col cursor-pointer"
                >
                  <!-- On: "text-indigo-900", Off: "text-gray-900" -->
                  <span class="block text-sm text-gray-600 font-medium">
                    {{ tag.Name }}
                  </span>
                  <!-- On: "text-indigo-700", Off: "text-gray-500" -->
                  <span class="block text-sm text-gray-500 truncate w-60">
                    {{ tag.Description }}
                  </span>
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        <!-- grafana panel list -->
        <div class="w-full space-y-4">
          <iframe
            v-for="node in panelNodes"
            :key="node"
            class="w-full h-64 sm:h-96 rounded-md"
            :src="`${$nuxt.context.env.GRAFANA_BASEURL}/d-solo/1sIiLXaGz/public-dashboard?orgId=1&var-TagName=${node}&theme=light&panelId=4&refresh=10s`"
          ></iframe>

          <div v-if="panelNodes.length == 0">
            There are no tags selected. Please select a data tag from the list.
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
  async mounted() {
    await this.$store.commit("gitFiles/updateConfigFiles");
  },
  methods: {
    async getTimedbTags(filename) {
      const response = await this.$gitApi.getProjectFileRaw(
        "deploy/config/" + filename.replace(".conf", ".json")
      );
      if (!response.ok) {
        console.error(response.status, response.statusText);
        return;
      }
      this.configFile = response.json;

      // select first tag after page reload
      if (this.configFile.nodes.length > 0)
        this.panelNodes.push(this.configFile.nodes[0].Name);

      this.isLoaded = true;
    },
  },
};
</script>

<style>
</style>