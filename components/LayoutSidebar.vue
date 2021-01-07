<template>
  <div>
    <main class="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <!-- Sidebar -->
        <aside class="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
          <slot name="sidebar"></slot>
        </aside>

        <!-- Content -->
        <div class="sm:px-6 lg:px-0 lg:col-span-9">
          <!-- Content Sections -->
          <slot name="content"></slot>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {};
</script>