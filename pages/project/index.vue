<template>
  <div>
    <header>
      <div class="max-w-7xl mx-auto py-4 px-2 sm:px-4 lg:px-8">
        <h1 class="text-lg leading-6 font-semibold text-gray-900">
          Getting Started
        </h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto pb-10 px-2 sm:px-4 lg:px-8">
      <!-- Starting steps list -->
      <div class="bg-gray-100 p-4 rounded-md">
        <ul
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <!-- Load your connection configs -->
          <li
            class="col-span-1 flex flex-col space-y-8 text-center bg-gradient-to-tr from-indigo-700 to-pink-500 rounded-md shadow p-4"
          >
            <!-- Heading -->
            <div class="flex flex-row items-center space-x-4">
              <span
                class="inline-flex justify-center items-center h-6 w-6 rounded-full text-sm font-medium bg-pink-100 text-pink-800"
              >
                <p>1</p>
              </span>
              <h3 class="text-pink-100 text-sm font-medium">
                Configure a PLC Connection
              </h3>
            </div>
            <!-- Illustration -->
            <!-- https://icons8.com/illustrations/style--pixeltrue -->
            <div class="flex-1 flex flex-col">
              <img
                class="w-full flex-shrink-0 my-auto"
                src="~/assets/images/configure-system.svg"
              />
            </div>
            <!-- Footer -->
            <div>
              <NuxtLink
                to="/project/files/config"
                type="button"
                class="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-base font-medium text-pink-800 bg-pink-200 hover:bg-pink-300 focus:outline-none sm:text-sm"
              >
                Load MSR List
              </NuxtLink>
            </div>
          </li>

          <!-- Load svg screen -->
          <li
            class="col-span-1 flex flex-col space-y-8 text-center bg-gray-50 rounded-md shadow p-4"
          >
            <!-- Heading -->
            <div class="flex flex-row items-center space-x-4">
              <span
                class="inline-flex justify-center items-center h-6 w-6 rounded-full text-sm font-medium bg-pink-100 text-pink-800"
              >
                <p>2</p>
              </span>
              <h3 class="text-gray-900 text-sm font-medium">
                Create a new Screen
              </h3>
            </div>
            <!-- Illustration -->
            <!-- https://icons8.com/illustrations/style--pixeltrue -->
            <div class="flex-1 flex flex-col">
              <img
                class="w-full flex-shrink-0 my-auto"
                src="~/assets/images/design-dashboard.svg"
              />
            </div>
            <!-- Footer -->
            <div>
              <NuxtLink
                to="/project/files/screen"
                type="button"
                class="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-base font-medium text-pink-800 bg-pink-200 hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 sm:text-sm"
              >
                Import Screen
              </NuxtLink>
            </div>
          </li>

          <!-- Explore Data -->
          <li
            class="col-span-1 flex flex-col space-y-8 text-center bg-gray-50 rounded-md shadow p-4"
          >
            <!-- Heading -->
            <div class="flex flex-row items-center space-x-4">
              <span
                class="inline-flex justify-center items-center h-6 w-6 rounded-full text-sm font-medium bg-pink-100 text-pink-800"
              >
                <p>3</p>
              </span>
              <h3 class="text-gray-900 text-sm font-medium">
                Explore Data Connections
              </h3>
            </div>
            <!-- Illustration -->
            <!-- https://icons8.com/illustrations/style--pixeltrue -->
            <div class="flex-1 flex flex-col">
              <img
                class="w-full flex-shrink-0 my-auto"
                src="~/assets/images/explore-data.svg"
              />
            </div>
            <!-- Footer -->
            <div>
              <NuxtLink
                to="#"
                type="button"
                class="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-base font-medium text-pink-800 bg-pink-200 hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 sm:text-sm"
              >
                Explore Data
              </NuxtLink>
            </div>
          </li>

          <!-- Inspect system -->
          <li
            class="col-span-1 flex flex-col space-y-8 text-center bg-gray-50 rounded-md shadow p-4"
          >
            <!-- Heading -->
            <div class="flex flex-row items-center space-x-4">
              <span
                class="inline-flex justify-center items-center h-6 w-6 rounded-full text-sm font-medium bg-pink-100 text-pink-800"
              >
                <p>4</p>
              </span>
              <h3 class="text-gray-900 text-sm font-medium">
                Inspect your System
              </h3>
            </div>
            <!-- Illustration -->
            <!-- https://icons8.com/illustrations/style--pixeltrue -->
            <div class="flex-1 flex flex-col">
              <img
                class="w-full flex-shrink-0 my-auto"
                src="~/assets/images/data-analyse.svg"
              />
            </div>
            <!-- Footer -->
            <div>
              <NuxtLink
                to="#"
                type="button"
                class="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-base font-medium text-pink-800 bg-pink-200 hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 sm:text-sm"
              >
                System Status
              </NuxtLink>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  layout: "application",
};
</script>

<style>
</style>