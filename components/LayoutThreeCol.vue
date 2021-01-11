<template>
  <div>
    <!-- Background color split screen for large screens -->
    <div class="fixed left-0 w-1/2 h-full bg-white" aria-hidden="true"></div>
    <div class="fixed right-0 w-1/2 h-full bg-gray-50" aria-hidden="true"></div>
    <div class="relative min-h-screen flex flex-col">
      <!-- 3 column wrapper -->
      <div class="flex-grow w-full max-w-7xl mx-auto lg:flex">
        <!-- Left sidebar & main wrapper -->
        <div class="flex-1 min-w-0 bg-white xl:flex">
          <div
            class="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white"
          >
            <div class="h-full pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
              <!-- Start left column area -->
              <div class="h-full">
                <slot name="sidebar"></slot>
              </div>
              <!-- End left column area -->
            </div>
          </div>

          <div class="bg-white lg:min-w-0 lg:flex-1">
            <!-- Start main area-->
            <div class="h-full">
              <slot name="main"></slot>
            </div>
            <!-- End main area -->
          </div>
        </div>

        <div
          class="bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0"
        >
          <div class="h-full pl-6 py-6 lg:w-80">
            <!-- Start right column area -->
            <div class="h-full">
              <slot name="right"></slot>
            </div>
            <!-- End right column area -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>