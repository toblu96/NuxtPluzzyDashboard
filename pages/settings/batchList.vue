<template>
  <div class="space-y-6">
    <!-- Current Batch -->
    <section aria-labelledby="applicant-information-title">
      <div class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h2
            id="payment_details_heading"
            class="text-lg leading-6 font-medium text-gray-900"
          >
            Current Batch
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            This shows your current running batch. If no batch is running you
            can start a new one here.
          </p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div v-if="isLoaded">
            <!-- create new batch -->
            <div
              class="flex w-full justify-center"
              v-if="runningBatch.BatchName == undefined"
            >
              <div
                class="inline-block align-bottom bg-gray-50 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div>
                  <div class="mt-3 text-center sm:mt-5">
                    <h3
                      class="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Currently no Batch running
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Enter a batch name and create the new batch.
                      </p>
                    </div>
                    <div class="mt-8">
                      <label
                        for="batchname"
                        class="block text-sm text-left font-medium text-gray-700"
                        >Batch Name</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="newBatchName"
                          type="text"
                          id="batchname"
                          class="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Batch 01"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6">
                  <button
                    @click="startNewBatch(newBatchName)"
                    type="button"
                    class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:text-sm"
                  >
                    Create Batch
                  </button>
                </div>
              </div>
            </div>
            <!-- current batch information -->
            <div
              v-else
              class="space-y-4 bg-gray-100 rounded-md px-4 py-5 sm:px-6"
            >
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ runningBatch.BatchName }}
              </h3>
              <!-- <p class="mt-1 text-sm text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit quam
                  corrupti consectetur.
                </p> -->
              <div
                class="flex flex-col sm:flex-row space-y-8 sm:space-y-0 justify-between flex-wrap sm:flex-nowrap"
              >
                <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Created by
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ runningBatch.loggedUser }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Created at
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ new Date(runningBatch._time).toLocaleString("en-US") }}
                    </dd>
                  </div>
                </dl>
                <div class="flex-shrink-0 self-end">
                  <button
                    @click="stopCurrentBatch"
                    type="button"
                    class="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Stop Batch
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Skeleton Loader -->
          <div
            v-else
            class="animate-pulse flex space-x-3 py-2 hover:bg-gray-50 sm:py-4"
          >
            <!-- <div class="rounded-full bg-orange-200 h-12 w-12"></div> -->
            <div class="flex-1 space-y-2 py-1">
              <div class="h-8 bg-orange-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Batch List -->
    <section aria-labelledby="billing_history_heading">
      <div class="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 sm:px-6">
          <h2
            id="billing_history_heading"
            class="text-lg leading-6 font-medium text-gray-900"
          >
            Finished Batches
          </h2>
        </div>
        <div class="mt-6 flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
            >
              <div class="overflow-hidden border-t border-gray-200">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Start Date
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Stop Date
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created by
                      </th>
                      <!--
                            `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                          -->
                      <th
                        scope="col"
                        class="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <span class="sr-only">View receipt</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    class="bg-white divide-y divide-gray-200"
                    v-if="isLoaded"
                  >
                    <tr v-for="batch in batches" :key="batch.BatchName">
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {{ batch.BatchName }}
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {{ new Date(batch.StartTime).toLocaleString("en-US") }}
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {{ new Date(batch.EndTime).toLocaleString("en-US") }}
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {{ batch.loggedUser_StartTime }}
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                      >
                        <a
                          href="#"
                          class="text-orange-600 hover:text-orange-900"
                          >View details
                          <span
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                          >
                            coming soon
                          </span></a
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- Skeleton loader -->
                <div
                  v-if="!isLoaded"
                  class="animate-pulse flex space-x-3 pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
                >
                  <!-- <div class="rounded-full bg-orange-200 h-12 w-12"></div> -->
                  <div class="flex-1 space-y-2 py-1">
                    <div class="h-8 bg-orange-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      batches: [],
      runningBatch: {},
      newBatchName: "",
      isLoaded: false,
    };
  },
  async mounted() {
    await this.reloadFinishedBatches();
    await this.getRunningBatch();
    this.isLoaded = true;
  },
  methods: {
    async startNewBatch(newBatchName) {
      let response = await this.$timedb.writeEvent(newBatchName, "BatchStart");
      if (!response.ok) {
        $nuxt.error({
          statusCode: response.status,
          message: response.statusText,
        });
      }
      await this.getRunningBatch();
    },
    async stopCurrentBatch() {
      let response = await this.$timedb.writeEvent(
        this.runningBatch.BatchName,
        "BatchEnd"
      );
      if (!response.ok) {
        $nuxt.error({
          statusCode: response.status,
          message: response.statusText,
        });
      }
      await this.getRunningBatch();
      await this.reloadFinishedBatches();
    },
    async reloadFinishedBatches() {
      try {
        const batchArray = await this.$timedb.getFinishedBatches();
        this.batches = this.sortByDate(batchArray);
      } catch (error) {
        console.error(error.message);
      }
    },
    async getRunningBatch() {
      try {
        const runningBatch = await this.$timedb.getRunningBatch();
        this.runningBatch = runningBatch;
      } catch (error) {
        console.error(error.message);
      }
    },
    sortByDate(arr) {
      arr.sort(function (a, b) {
        return Number(new Date(b.StartTime)) - Number(new Date(a.StartTime));
      });

      return arr;
    },
  },
};
</script>

<style>
</style>