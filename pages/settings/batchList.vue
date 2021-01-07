<template>
  <div class="space-y-6">
    <!-- Payment details -->
    <section aria-labelledby="payment_details_heading">
      <div>
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="bg-white py-6 px-4 sm:p-6">
            <div>
              <h2
                id="payment_details_heading"
                class="text-lg leading-6 font-medium text-gray-900"
              >
                Current Batch
              </h2>
              <p class="mt-1 text-sm text-gray-500">
                This shows your current running batch. If no batch is running
                you can start a new one here.
              </p>
            </div>

            <div class="mt-6 grid grid-cols-4 gap-6">
              <div class="col-span-4 sm:col-span-2">
                <label
                  for="first_name"
                  class="block text-sm font-medium text-gray-700"
                  >First name</label
                >
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  autocomplete="cc-given-name"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div class="col-span-4 sm:col-span-2">
                <label
                  for="last_name"
                  class="block text-sm font-medium text-gray-700"
                  >Last name</label
                >
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  autocomplete="cc-family-name"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div class="col-span-4 sm:col-span-2">
                <label
                  for="email_address"
                  class="block text-sm font-medium text-gray-700"
                  >Email address</label
                >
                <input
                  type="text"
                  name="email_address"
                  id="email_address"
                  autocomplete="email"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div class="col-span-4 sm:col-span-1">
                <label
                  for="expiration_date"
                  class="block text-sm font-medium text-gray-700"
                  >Expration date</label
                >
                <input
                  type="text"
                  name="expiration_date"
                  id="expiration_date"
                  autocomplete="cc-exp"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  placeholder="MM / YY"
                />
              </div>

              <div class="col-span-4 sm:col-span-1">
                <label
                  for="security_code"
                  class="flex items-center text-sm font-medium text-gray-700"
                >
                  <span>Security code</span>
                  <!-- Heroicon name: question-mark-circle -->
                  <svg
                    class="ml-1 flex-shrink-0 h-5 w-5 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </label>
                <input
                  type="text"
                  name="security_code"
                  id="security_code"
                  autocomplete="cc-csc"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div class="col-span-4 sm:col-span-2">
                <label
                  for="country"
                  class="block text-sm font-medium text-gray-700"
                  >Country / Region</label
                >
                <select
                  id="country"
                  name="country"
                  autocomplete="country"
                  class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>

              <div class="col-span-4 sm:col-span-2">
                <label
                  for="postal_code"
                  class="block text-sm font-medium text-gray-700"
                  >ZIP / Postal</label
                >
                <input
                  type="text"
                  name="postal_code"
                  id="postal_code"
                  autocomplete="postal-code"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              @click="
                $timedb.writeEvent('Vertuo Charge xy, 200 pieces', 'BatchStart')
              "
              class="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Billing history -->
    <section aria-labelledby="billing_history_heading">
      <div class="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 sm:px-6">
          <h2
            id="billing_history_heading"
            class="text-lg leading-6 font-medium text-gray-900"
          >
            Billing history
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
                        Date
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
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
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        1/1/2020
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        Business Plan - Annual Billing
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        CA$109.00
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                      >
                        <a
                          href="#"
                          class="text-orange-600 hover:text-orange-900"
                          >View receipt</a
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>