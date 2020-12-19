<template>
  <div
    class="flex h-screen justify-center items-center bg-gradient-to-r from-orange-400 to-pink-500 opacity-75"
  >
    <div class="flex-row space-y-4">
      <svg
        class="animate-spin -ml-1 mr-3 h-24 w-24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-50 text-white"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="text-pink-500"
          fill="currentColor"
          d="M6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C3.99778 13.2757 4.30189 14.523 4.87452 15.6417C5.37805 16.6255 5.32754 17.8843 4.49887 18.6155C3.67108 19.3459 2.39122 19.2736 1.80775 18.3364C0.66283 16.4975 0 14.3247 0 12C0 6.05149 4.32911 1.11335 10.0084 0.164543C11.0978 -0.0174695 12 0.895431 12 2C12 3.10457 11.0909 3.97538 10.0207 4.24869C8.64068 4.60112 7.36735 5.31894 6.34315 6.34315Z"
        ></path>
      </svg>
      <div class="text-lg opacity-50 text-white">Logging in..</div>
    </div>
  </div>
</template>



