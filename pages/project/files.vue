<template>
  <div>
    <layout-three-col>
      <template slot="sidebar">
        <project-sidebar
          @showGraphicsModal="$refs.showGraphicsModal.show()"
          @showConfigModal="$refs.showConfigModal.show()"
        />
      </template>
      <template slot="main">
        <NuxtChild />
      </template>
      <template slot="right">
        <activity-feed />
      </template>
    </layout-three-col>
    <modal-upload-graphics ref="showGraphicsModal" />
    <modal-upload-config-new ref="showConfigModal" />
  </div>
</template>

<script>
export default {
  layout: "application-second-nav",
};
</script>

<style>
</style>