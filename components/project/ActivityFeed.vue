<template>
  <div>
    <div class="pt-6 pb-2">
      <h2 class="text-sm font-semibold">Activity</h2>
    </div>
    <div v-if="commitMessages[0] != undefined">
      <ul class="divide-y divide-gray-200">
        <li v-for="commit in commitMessages" :key="commit.id" class="py-4">
          <div class="flex space-x-3">
            <img class="h-6 w-6 rounded-full" :src="commit.avatar_url" alt="" />
            <div class="flex-1 space-y-1">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium">
                  {{
                    $auth.user.email == commit.author_email
                      ? "You"
                      : commit.author_email
                  }}
                </h3>
                <p class="text-sm text-gray-500">
                  {{ $moment(commit.committed_date).fromNow(true) }}
                </p>
              </div>
              <p class="text-sm text-gray-500">
                {{ commit.message }} ({{ commit.short_id }} in master)
              </p>
            </div>
          </div>
        </li>

        <!-- More items... -->
      </ul>
      <div class="py-4 text-sm border-t border-gray-200">
        <a
          :href="$gitApi.getDefaultPath() + 'commits/master'"
          target="_blank"
          class="text-orange-600 font-semibold hover:text-orange-900"
          >View all activity <span aria-hidden="true">&rarr;</span></a
        >
      </div>
    </div>
    <!-- Activity Skeleton Loader -->
    <div v-else class="animate-pulse flex space-x-3">
      <div class="rounded-full bg-orange-200 h-6 w-6"></div>
      <div class="flex-1 space-y-2 py-1">
        <div class="h-4 bg-orange-200 rounded w-full"></div>
        <div class="h-4 bg-orange-200 rounded w-3/4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      commitMessages: "gitFiles/getCommitMessages",
    }),
  },
  async mounted() {
    this.$store.commit("gitFiles/updateCommitMessages");
  },
};
</script>

<style>
</style>