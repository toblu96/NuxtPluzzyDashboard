<template>
  <li class="relative col-span-1 flex shadow-sm rounded-md">
    <div
      class="flex-shrink-0 flex items-center justify-center p-3 w-16 bg-yellow-400 text-white text-sm font-medium rounded-l-md"
    >
      <img
        v-if="fileType(shortFilePath(fileData.path)) == 'OPC UA'"
        class="w-full"
        src="~/assets/images/icons/siemens-icon.svg"
      />
      <img
        v-if="fileType(shortFilePath(fileData.path)) == 'MQTT'"
        class="w-full"
        src="~/assets/images/icons/iot-icon.svg"
      />
    </div>
    <div
      class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate"
    >
      <div class="flex-1 px-4 py-2 text-sm truncate">
        <a href="#" class="text-gray-900 font-medium hover:text-gray-600">{{
          fileData.name
        }}</a>
        <p class="text-gray-500">
          {{ fileType(shortFilePath(fileData.path)) }} Connection
        </p>
      </div>
      <div class="flex-shrink-0 pr-2">
        <button
          @click="showDropdown = !showDropdown"
          v-click-away="'close'"
          class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <span class="sr-only">Open options</span>
          <!-- Heroicon name: dots-vertical -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
            />
          </svg>
        </button>

        <transition
          enter-active-class="ease-out duration-100"
          enter-class="opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="ease-in duration-75"
          leave-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-show="showDropdown"
            class="origin-top-right absolute z-10 right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <div
              class="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <a
                :href="gitlabFilePath(fileData.path)"
                target="_blank"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                >View in Git
              </a>
              <button
                href="#"
                class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Delete
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </li>
</template>

<script>
import ClickAway from "~/directives/click-away";

export default {
  props: {
    fileData: {
      type: Object,
      required: true,
    },
  },
  directives: {
    "click-away": ClickAway,
  },
  data: function () {
    return {
      showDropdown: false,
    };
  },
  methods: {
    close() {
      this.showDropdown = false;
    },

    gitlabFilePath(filename) {
      return (
        process.env.GITLAB_BASEURL +
        "/" +
        process.env.GITLAB_PROJECT_PATH +
        "/-/blob/master/" +
        filename
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