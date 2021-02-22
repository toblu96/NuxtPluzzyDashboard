<template>
  <div class="min-h-screen bg-gray-50">
    <application-navbar />
    <header v-if="$auth.loggedIn" class="bg-gray-50 shadow-sm mb-0.5">
      <div class="sm:hidden p-4">
        <label for="tabs" class="sr-only">Select a tab</label>
        <select
          @change="navigateToIndex($event.target.selectedIndex)"
          id="tabs"
          name="tabs"
          class="block w-full focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md"
        >
          <option
            v-for="item in navigationItems"
            :key="item.index"
            :selected="navIndex == item.index"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div
        class="hidden sm:flex max-w-7xl mx-auto space-x-4 py-4 px-4 sm:px-6 lg:px-8"
      >
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.index"
          :to="item.navLink"
          :class="navIndex == item.index ? 'bg-orange-100 text-orange-900' : ''"
          class="rounded-md py-2 px-3 inline-flex items-center text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 hover:text-gray-900"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      navIndex: 0,
      navigationItems: [
        {
          index: 0,
          name: "Dashboard",
          navLink: "/",
        },
        {
          index: 1,
          name: "PLC Connections",
          navLink: "/project/files/config",
        },
        {
          index: 2,
          name: "Screen Files",
          navLink: "/project/files/screen",
        },
        {
          index: 3,
          name: "Explore Data Connections",
          navLink: "/project/explore",
        },
        {
          index: 4,
          name: "Inspect System",
          navLink: "/project/inspect",
        },
      ],
    };
  },
  watch: {
    $route(to, from) {
      this.matchCurrentNavPath();
    },
  },
  mounted() {
    this.matchCurrentNavPath();
  },
  methods: {
    navigateToIndex: function (idx) {
      let navItem = this.navigationItems.find((o) => o.index == idx);
      this.$router.push(navItem.navLink);
    },
    matchCurrentNavPath() {
      this.navIndex = 0;
      for (let item of this.navigationItems) {
        if (
          $nuxt.$route.matched.some(({ path }) => path.includes(item.navLink))
        ) {
          this.navIndex = item.index;
        }
      }
    },
  },
};
</script>