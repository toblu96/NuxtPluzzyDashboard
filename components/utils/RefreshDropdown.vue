<template>
  <div>
    <span class="relative ml-5 z-0 inline-flex shadow-sm rounded-md">
      <div
        class="inline-flex items-center w-16 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700"
      >
        <!-- Refresh button -->
        <button
          v-if="refreshCycle == 0"
          @click="refreshInterval(0)"
          type="button"
          class="inline-flex w-full justify-center py-2 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <p v-else class="mx-auto">{{ refreshCycle }} s</p>
      </div>
      <span class="-ml-px relative block">
        <button
          @click="showDropdown = !showDropdown"
          id="option-menu"
          type="button"
          class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <span class="sr-only">Open options</span>
          <!-- Heroicon name: chevron-down -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <transition
          enter-active-class="transition ease-out duration-100 transform"
          enter-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75 transform"
          leave-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-show="showDropdown"
            class="origin-top-right absolute z-50 right-0 mt-2 -mr-1 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <div
              class="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="option-menu"
            >
              <button
                v-for="cycle in refreshCycles"
                :key="cycle"
                @click="
                  refreshInterval(cycle),
                    (showDropdown = false),
                    (refreshCycle = cycle)
                "
                class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {{ cycle }} s
              </button>
            </div>
          </div>
        </transition>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    refreshCycles: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    refreshCycle: 0,
    showDropdown: false,
    refreshIntervalID: null,
  }),

  beforeDestroy: function () {
    this.stopInterval();
  },
  methods: {
    stopInterval() {
      clearInterval(this.refreshIntervalID);
    },
    refreshInterval(interval) {
      let self = this;
      this.stopInterval();
      self.$nuxt.$emit("refresh-dropdown-trigger-event");
      if (interval != 0) {
        console.log("just created a new interval [" + interval + "s]");
        this.refreshIntervalID = setInterval(async function () {
          self.$nuxt.$emit("refresh-dropdown-trigger-event");
        }, interval * 1000);
      }
    },
  },
};
</script>

<style>
</style>