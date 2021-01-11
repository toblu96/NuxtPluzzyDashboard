<template>
  <div class="mx-auto py-10">
    <ul
      class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      <ExploreDataConnectionCard
        v-for="file in files"
        :key="file.path"
        :fileData="file"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "application-second-nav",

  computed: {
    ...mapGetters({
      files: "gitFiles/getConfigFiles",
    }),
  },
  async mounted() {
    await this.$store.commit("gitFiles/updateConfigFiles");
  },
};
</script>

<style>
</style>