<template>
  <div>
    <nav class="space-y-1">
      <NuxtLink
        to="batchlist"
        class="group rounded-md px-3 py-2 flex items-center text-sm font-medium"
        :class="
          $nuxt.$route.path.match(/[^/]*$/)[0].toLowerCase() == 'batchlist'
            ? 'bg-gray-50 text-orange-600 hover:bg-white'
            : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'
        "
      >
        <!-- Heroicon name: table -->
        <svg
          :class="
            $nuxt.$route.path.match(/[^/]*$/)[0].toLowerCase() == 'batchlist'
              ? 'text-orange-500 '
              : 'text-gray-400 group-hover:text-gray-500 '
          "
          class="flex-shrink-0 -ml-1 mr-3 w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          ></path>
        </svg>
        <span class="truncate"> Batch List </span>
      </NuxtLink>

      <NuxtLink
        to="integrations"
        class="group rounded-md px-3 py-2 flex items-center text-sm font-medium"
        :class="
          $nuxt.$route.path.match(/[^/]*$/)[0].toLowerCase() == 'integrations'
            ? 'bg-gray-50 text-orange-600 hover:bg-white'
            : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'
        "
      >
        <!-- Heroicon name: table -->
        <svg
          :class="
            $nuxt.$route.path.match(/[^/]*$/)[0].toLowerCase() == 'integrations'
              ? 'text-orange-500 '
              : 'text-gray-400 group-hover:text-gray-500 '
          "
          class="flex-shrink-0 -ml-1 mr-3 w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
          />
        </svg>
        <span class="truncate"> Integrations </span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>