<template>
  <div class="px-4 py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
    <!-- second header -->
    <div class="pb-5 border-b border-gray-200 sm:pb-0">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Animated Graphics
      </h3>
      <div class="mt-3 sm:mt-4">
        <!-- Dropdown menu on small screens -->
        <div class="sm:hidden">
          <label for="selected-tab" class="sr-only">Select a tab</label>
          <select
            @change="activeImageIndex = $event.target.selectedIndex"
            id="selected-tab"
            name="selected-tab"
            class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
          >
            <option
              v-for="(image, idx) in images"
              :key="image.path"
              :selected="idx == activeImageIndex"
            >
              {{ image.name.replace(".svg", "") }}
            </option>
          </select>
        </div>
        <!-- Tabs at small breakpoint and up -->
        <div class="hidden sm:block">
          <nav class="-mb-px flex space-x-8 overflow-x-auto">
            <button
              v-for="(image, idx) in images"
              :key="image.path"
              @click="activeImageIndex = idx"
              :class="
                activeImageIndex == idx
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              "
              class="focus:outline-none whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
            >
              {{ image.name.replace(".svg", "") }}
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- File content -->
    <div
      class="flex flex-col justify-center mt-3 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
    >
      hello {{ activeImageIndex }}
    </div>

    <!-- old content -->
    <div>
      <Logo />
      <h1 class="title">NuxtPluzzyDashboard</h1>
      <div class="links flex justify-center space-x-4">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>

        <button
          type="button"
          class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          @click="$auth.loginWith('github')"
        >
          Login to GitLab
        </button>
        <button
          v-if="$auth.loggedIn"
          type="button"
          class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          @click="$auth.logout()"
        >
          Logout
        </button>

        <NuxtLink to="/secret">Secret page</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "application",
  auth: false,
  data: function () {
    return {
      images: [],
      activeImageIndex: 0,
    };
  },
  mounted() {
    this.getGitImages();
  },
  methods: {
    async getGitImages() {
      // get Project Files
      const responses = await Promise.all([
        this.$gitApi.getProjectTree("graphics"),
      ]);
      const badResponse = responses.find((response) => !response.ok);
      if (badResponse) {
        $nuxt.error({
          statusCode: badResponse.status,
          message: badResponse.statusText,
        });
      }
      this.images = responses[0].json;

      console.log(this.images);
    },
  },
};
</script>

<style>
::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded-full;
}

::-webkit-scrollbar {
  @apply h-2 w-2 bg-transparent;
}

::-webkit-scrollbar-thumb {
  @apply h-2 w-2 bg-gray-300 rounded-full;
}
</style>
