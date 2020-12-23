<template>
  <div>
    <layout-three-col>
      <template slot="sidebar">
        <project-sidebar @showGraphicsModal="$refs.showGraphicsModal.show()" />
      </template>
      <template slot="main">
        <projects-list />
      </template>
      <template slot="right">
        <activity-feed />
      </template>
    </layout-three-col>
    <modal-upload-graphics ref="showGraphicsModal" />
  </div>
</template>

<script>
export default {
  layout: "application",
};
</script>

<style>
</style>