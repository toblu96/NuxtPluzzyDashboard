<template></template>

<script>
export default {
  middleware({ redirect, route }) {
    const basepath = route.path;
    return redirect(basepath.replace(/\/$/, "") + "/batchList");
  },
};
</script>

<style>
</style>