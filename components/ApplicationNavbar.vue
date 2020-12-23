<template>
  <!-- Navbar -->
  <nav class="flex-shrink-0 bg-gradient-to-r from-orange-500 to-pink-500">
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <!-- Logo section -->
        <NuxtLink to="/" class="flex items-center px-2 lg:px-0 xl:w-64">
          <div class="flex-shrink-0">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-gray-300.svg"
              alt="Workflow"
            />
          </div>
        </NuxtLink>

        <!-- Search section -->
        <div
          v-show="$auth.loggedIn"
          class="flex flex-1 justify-center lg:justify-end"
        >
          <div class="w-full px-2 lg:px-6">
            <label for="search" class="sr-only">Search files</label>
            <div class="relative text-pink-200 focus-within:text-pink-400">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <!-- Heroicon name: search -->
                <svg
                  class="h-5 w-5"
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
                id="search"
                name="search"
                class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-pink-200 bg-opacity-25 text-pink-100 placeholder-pink-200 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-pink-400 focus:text-gray-900 sm:text-sm"
                placeholder="Search files"
                type="search"
                v-model="searchString"
                ref="searchInput"
                @keydown.esc="
                  $refs.searchInput.blur();
                  updateSearchString('');
                "
              />
            </div>
          </div>
        </div>
        <!-- Mobile menu button -->
        <div class="flex lg:hidden">
          <button
            @click="isOpen = !isOpen"
            class="bg-pink-600 inline-flex items-center justify-center p-2 rounded-md text-pink-400 hover:text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-600 focus:ring-white"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed. -->
            <!--
              Heroicon name: menu-alt-1

              Menu open: "hidden", Menu closed: "block"
            -->
            <svg
              v-show="!isOpen"
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
            <!-- Icon when menu is open. -->
            <!--
              Heroicon name: x

              Menu open: "block", Menu closed: "hidden"
            -->
            <svg
              v-show="isOpen"
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <!-- Desktop menu -->
        <div class="hidden lg:block lg:w-80">
          <div class="flex items-center justify-end">
            <div class="flex">
              <a
                href="#"
                class="px-3 py-2 rounded-md text-sm font-medium text-pink-200 hover:text-white"
                >Documentation</a
              >
              <a
                href="#"
                class="px-3 py-2 rounded-md text-sm font-medium text-pink-200 hover:text-white"
                >Support</a
              >
            </div>
            <!-- Profile dropdown -->
            <user-menu v-if="$auth.loggedIn" />
            <div v-else>
              <button
                @click="$auth.loginWith('github')"
                class="bg-pink-100 border border-transparent rounded-md shadow py-2 px-6 ml-2 inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-500"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu content -->
    <!--
      Mobile menu, toggle classes based on menu state.

      Menu open: "block", Menu closed: "hidden"
    -->
    <div @click="isOpen = false" v-show="isOpen" class="block lg:hidden">
      <div class="px-2 pt-2 pb-3">
        <a
          href="#"
          class="block px-3 py-2 rounded-md text-base font-medium text-pink-200 hover:text-pink-100 hover:bg-pink-600"
          >Dashboard</a
        >
        <a
          href="#"
          class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-pink-200 hover:text-pink-100 hover:bg-pink-600"
          >Support</a
        >
      </div>
      <div class="py-4 border-t border-pink-600">
        <div v-if="$auth.loggedIn" class="px-2">
          <a
            href="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-pink-200 hover:text-pink-100 hover:bg-pink-600"
            >Your Profile</a
          >
          <a
            href="#"
            class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-pink-200 hover:text-pink-100 hover:bg-pink-600"
            >Settings</a
          >
          <NuxtLink
            to="/project"
            class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-pink-200 hover:text-pink-100 hover:bg-pink-600"
            >Project
          </NuxtLink>
          <button
            @click="
              $auth.logout();
              this.isOpen = false;
            "
            class="mt-1 block px-3 py-2 w-full rounded-md text-base text-left font-medium text-pink-200 hover:text-pink-100 hover:bg-pink-600"
          >
            Sign out
          </button>
        </div>
        <div v-else class="px-2">
          <button
            @click="$auth.login('github')"
            class="block px-3 py-2 w-full rounded-md text-base text-left font-medium text-pink-200 hover:text-pink-100 hover:bg-pink-600"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapMutations } from "vuex";
import debounce from "lodash/debounce";

export default {
  data: function () {
    return {
      isOpen: false,
      searchString: "",
    };
  },
  watch: {
    searchString: debounce(function (newVal, oldVal) {
      this.updateSearchString(newVal);
    }, 500),
  },
  methods: {
    ...mapMutations({
      updateSearchString: "search/updateSearchString",
    }),
  },
};
</script>

<style>
</style>