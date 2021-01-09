<template>
  <div class="min-h-screen bg-gray-50">
    <application-navbar />
    <header class="bg-gray-50 shadow-sm mb-0.5">
      <div class="max-w-7xl mx-auto space-x-4 py-4 px-4 sm:px-6 lg:px-8">
        <NuxtLink
          to="/"
          class="rounded-md py-2 px-3 inline-flex items-center text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 hover:text-gray-900"
        >
          Dashboard
        </NuxtLink>

        <NuxtLink
          to="/project/files/config"
          class="rounded-md py-2 px-3 inline-flex items-center text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 hover:text-gray-900"
        >
          PLC Connections
        </NuxtLink>

        <NuxtLink
          to="/project/files/screen"
          class="rounded-md py-2 px-3 inline-flex items-center text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 hover:text-gray-900"
        >
          Screen Files
        </NuxtLink>

        <NuxtLink
          to="#"
          class="rounded-md py-2 px-3 inline-flex items-center text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 hover:text-gray-900"
        >
          Explore Data Connections
        </NuxtLink>

        <NuxtLink
          to="#"
          class="rounded-md py-2 px-3 inline-flex items-center text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 hover:text-gray-900"
        >
          Inspect System
        </NuxtLink>
      </div>
    </header>
    <Nuxt />
  </div>
</template>