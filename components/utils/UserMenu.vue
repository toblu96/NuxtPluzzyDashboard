<template>
  <div
    class="ml-4 relative flex-shrink-0"
    v-click-away="'close'"
    @keydown.esc="close"
  >
    <div>
      <button
        class="bg-pink-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-700 focus:ring-white"
        id="user-menu"
        aria-haspopup="true"
        @click="isOpen = !isOpen"
      >
        <span class="sr-only">Open user menu</span>
        <img
          v-if="avatarUrl != ''"
          class="h-8 w-8 rounded-full"
          :src="avatarUrl"
        />
        <!-- Skeleton loader -->
        <svg
          v-else
          class="w-8 h-8 animate-pulse"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
    <transition
      enter-active-class="ease-out duration-100"
      enter-class="opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="ease-in duration-75"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-show="isOpen"
        class="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg pt-1 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <div class="px-4 py-3">
          <p class="text-sm leading-5">Signed in as</p>
          <p class="text-sm font-medium leading-5 text-gray-900 truncate">
            {{ $auth.user.email }}
          </p>
        </div>
        <div class="py-1">
          <NuxtLink
            to="/settings"
            class="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:bg-gray-100"
          >
            Admin
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-orange-100 text-orange-800"
            >
              Beta
            </span>
          </NuxtLink>
        </div>
        <div class="py-1">
          <button
            @click="$auth.logout()"
            class="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ClickAway from "~/directives/click-away";

export default {
  directives: {
    "click-away": ClickAway,
  },
  data: function () {
    return {
      isOpen: false,
      avatarUrl: "",
    };
  },
  mounted() {
    this.avatarUrl = this.$auth.user.avatar_url;
  },
  methods: {
    close() {
      this.isOpen = false;
    },
  },
};
</script>