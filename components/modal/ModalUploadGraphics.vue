<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" v-show="showModal">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Background overlay, show/hide based on modal state. -->
      <transition
        enter-active-class="ease-out duration-300"
        enter-class="opacity-0"
        enter-to-class="transform opacity-100"
        leave-active-class="ease-in duration-200"
        leave-class="opacity-100 "
        leave-to-class="opacity-0"
      >
        <div
          @click="hide"
          v-show="startAnimation"
          class="fixed inset-0 transition-opacity"
          aria-hidden="true"
        >
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
      </transition>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <!-- Modal panel, show/hide based on modal state. -->
      <transition
        enter-active-class="ease-out duration-300"
        enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          v-show="startAnimation"
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div
            class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <!-- Header -->
            <div class="px-4 py-5 sm:px-6">
              <h1 class="font-medium">Upload Graphic to GitLab</h1>
            </div>
            <!-- Main content -->
            <div class="px-4 py-5 sm:p-6">
              <div class="mt-2 sm:mt-0">
                <!-- File upload area -->
                <div
                  class="flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                >
                  <!-- Uploaded files list -->
                  <div>
                    <div v-for="file in files" :key="file.name">
                      {{ file.name }}
                    </div>
                    <div v-show="files[0]" class="pt-2">
                      <button
                        @click="removeFiles"
                        class="group flex items-center space-x-2.5 focus:outline-none"
                        target="_blank"
                      >
                        <svg
                          class="h-5 w-5 text-gray-500 group-hover:text-gray-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                        <span
                          class="text-sm text-gray-500 group-hover:text-gray-900 font-medium"
                          >remove files</span
                        >
                      </button>
                    </div>
                  </div>
                  <!-- File upload button -->
                  <div
                    class="space-y-1 text-center"
                    :class="files[0] ? 'hidden' : ''"
                  >
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div class="flex text-sm text-gray-600 justify-center">
                      <label
                        for="file-upload"
                        class="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                      >
                        <span>Upload a file</span>
                        <input
                          multiple
                          id="file-upload"
                          ref="fileupload"
                          name="file-upload"
                          type="file"
                          class="sr-only"
                          accept="image/svg+xml"
                        />
                      </label>
                    </div>
                    <p class="text-xs text-gray-500">
                      SVG (max. file size 10GB)
                    </p>
                  </div>
                </div>
                <!-- Commit message -->
                <div v-show="files[0] != undefined" class="mt-4">
                  <label
                    for="commit-message"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Commit message
                  </label>
                  <div class="mt-1">
                    <textarea
                      v-model="commitMessage"
                      id="commit-message"
                      name="commit-message"
                      rows="3"
                      class="shadow-sm focus:ring-pink-500 focus:border-pink-500 mt-1 block w-full max-h-52 sm:text-sm border-gray-300 rounded-md"
                      :placeholder="defaultCommitMessage"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <!-- Footer -->
            <div
              class="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <button
                @click="uploadFiles"
                type="button"
                :disabled="files[0] == undefined"
                :class="
                  files[0] == undefined
                    ? 'cursor-not-allowed'
                    : 'hover:to-pink-600'
                "
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                Upload Graphic
              </button>
              <button
                @click="hide"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      startAnimation: false,
      showModal: false,
      files: [],
      defaultCommitMessage: "Upload new file(s)",
      commitMessage: "",
    };
  },
  created() {
    this.$nuxt.$on("modal-upload-screen-open", () => {
      this.show();
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("modal-upload-screen-open");
  },
  mounted() {
    this.$refs.fileupload.onchange = (fileInput) => {
      let selectedFiles = [...fileInput.srcElement.files];
      this.files = selectedFiles;
      selectedFiles = [];
    };
  },
  methods: {
    show() {
      this.showModal = true;
      this.startAnimation = true;
    },
    async hide() {
      this.startAnimation = false;
      await this.waitFor(200);
      this.showModal = false;
      this.removeFiles();
      this.commitMessage = "";
    },
    removeFiles() {
      this.files = "";
      var input = this.$refs.fileupload;
      input.value = "";
    },
    async uploadFiles() {
      // set default commit message
      if (this.commitMessage == "") {
        this.commitMessage = this.defaultCommitMessage;
      }
      for (var i = 0; i < this.files.length; i++) {
        const response = await this.$gitApi.pushFileToRepo(
          this.files[i],
          this.commitMessage,
          "graphics/"
        );

        if (!response.ok) {
          if (response.json.message == "A file with this name already exists") {
            // check if error occours because file does exist already
            await this.updateFile(this.files[i]);
          } else {
            $nuxt.error({
              statusCode: response.status,
              message: response.statusText,
            });
          }
        }
      }

      this.hide();
    },
    async updateFile(file) {
      // set default commit message
      if (this.commitMessage == "") {
        this.commitMessage = this.defaultCommitMessage;
      }
      const response = await this.$gitApi.updateFileInRepo(
        file,
        this.commitMessage,
        "graphics/"
      );

      if (!response.ok)
        $nuxt.error({
          statusCode: response.status,
          message: response.statusText,
        });
    },
    async waitFor(ms) {
      return new Promise(function (resolve) {
        setTimeout(resolve, ms || 0);
      });
    },
  },
};
</script>

<style>
</style>