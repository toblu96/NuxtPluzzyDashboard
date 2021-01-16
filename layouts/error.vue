<template>
  <div>
    <!-- This file lives in public/404.html -->
    <div
      class="h-screen w-screen flex flex-wrap justify-center content-center items-center absolute z-0"
    >
      <p class="text-9xl sm:text-huge font-mono font-bold">
        <span
          class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-pink-500"
        >
          {{ error.statusCode }}
        </span>
      </p>
    </div>
    <div
      class="h-screen w-screen flex flex-wrap bg-gray-50 bg-opacity-60 justify-center content-end md:content-center items-end md:items-center relative z-10"
    >
      <!-- GitLab token expired -->
      <div
        v-if="error.statusCode == 401 && error.message == 'Unauthorized'"
        class="p-6 text-center"
      >
        <h2 class="uppercase text-xl lg:text-5xl font-black">
          It seems that your GitLab token was revoked.
          <p class="mt-3 uppercase text-sm lg:text-base text-gray-700">
            Please refresh your token by pressing the button below to
            re-authorize your GitLab user.
          </p>
        </h2>
        <p class="m-8 uppercase text-lg lg:text-3xl text-gray-700">
          Error Message: {{ error.message }}
        </p>

        <button
          @click="$nuxt._router.go()"
          type="button"
          class="inline-flex justify-center rounded-md shadow-sm mt-8 px-8 sm:px-20 py-4 text-2xl font-light text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:text-sm"
        >
          <p class="text-2xl">Re-authorize at GitLab</p>
        </button>
      </div>

      <!-- Normal error -->
      <div v-else class="p-6 text-center">
        <h2 class="uppercase text-xl lg:text-5xl font-black">
          We're sorry, but something went wrong.
          <p class="mt-3 uppercase text-sm lg:text-base text-gray-700">
            If you are the application owner check the logs for more
            information.
          </p>
        </h2>
        <p class="m-8 uppercase text-lg lg:text-3xl text-gray-700">
          Error Message: {{ error.message }}
        </p>

        <NuxtLink
          to="/"
          type="button"
          class="inline-flex justify-center rounded-md shadow-sm mt-8 px-8 sm:px-20 py-4 text-2xl font-light text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:text-sm"
        >
          <p class="text-2xl">Back to Homepage</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>

<style>
</style>