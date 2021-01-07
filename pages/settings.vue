<template>
  <div>
    <layout-sidebar>
      <template slot="sidebar">
        <settings-sidebar />
      </template>
      <template slot="content">
        <NuxtChild />
      </template>
    </layout-sidebar>
  </div>
</template>

<script>
export default {
  layout: "application",
};
</script>

<style>
</style>