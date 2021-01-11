<template>
  <h1>{{ this.id }}</h1>
</template>

<script>
export default {
  layout: "application-second-nav",
  async asyncData({ params }) {
    const id = params.id; // When calling /abc the slug will be "abc"
    return { id };
  },
};
</script>

<style>
</style>