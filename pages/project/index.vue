<template>
  <layout-three-col>
    <template slot="sidebar">
      <project-sidebar />
    </template>
    <template slot="main">
      <projects-list />
    </template>
    <template slot="right">
      <activity-feed />
    </template>
  </layout-three-col>
</template>

<script>
export default {};
</script>

<style>
</style>