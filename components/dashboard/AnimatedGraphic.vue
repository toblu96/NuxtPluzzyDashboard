<template>
  <div class="relative w-full min-h-56">
    <!-- Image content -->
    <div v-show="isLoaded" id="svgImage" class="w-full" v-html="imageContent" />
    {{ errorMessage }}

    <!-- Skeleton loader -->
    <div v-show="!isCompiled" class="absolute top-0 w-full bg-gray-50">
      <div class="top-0 w-48 mx-auto inset-x-0">
        <img
          class="h-56 animate-pulse"
          src="~/assets/images/image-skeleton.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { root } from "postcss";

export default {
  props: {
    imagePath: "",
  },
  data: function () {
    return {
      imageContent: "",
      svgTemplate: "",
      templateKeys: [],
      isLoaded: false,
      isCompiled: false,
      errorMessage: "",
    };
  },
  watch: {
    imagePath: async function (newVal, oldVal) {
      await this.reloadImage(this.imagePath);
      await this.reloadValues();
      this.resetImageSize();
    },
  },
  async mounted() {
    await this.reloadImage(this.imagePath);
    await this.reloadValues();
    this.resetImageSize();
  },
  methods: {
    async reloadImage(path) {
      // reset states
      this.isLoaded = false;
      this.isCompiled = false;
      this.imageContent = "";

      var rawImage = await this.getGitImage(path);
      this.isLoaded = true;
      rawImage = await this.formatImage(rawImage);
      this.templateKeys = await this.$imageTemplate.getTemplateKeys(rawImage);
      this.svgTemplate = this.$imageTemplate.compileTemplate(rawImage);
    },
    async reloadValues() {
      this.errorMessage = "";
      try {
        // load timedb data
        const timedbData = await this.reloadDBData(this.templateKeys);
        // fill timedb data
        await this.$imageTemplate.initHelpers();
        this.imageContent = this.$imageTemplate.fillData(
          this.svgTemplate,
          timedbData
        );
      } catch (error) {
        this.errorMessage = error;
      }
      this.isCompiled = true;
    },
    async getGitImage(filePath) {
      // get Project Files
      const responses = await Promise.all([
        this.$gitApi.getProjectFile(filePath),
      ]);
      const badResponse = responses.find((response) => !response.ok);
      if (badResponse) {
        $nuxt.error({
          statusCode: badResponse.status,
          message: badResponse.statusText,
        });
      }
      // decode base64 content..
      return atob(responses[0].json.content);
    },
    async formatImage(imageData) {
      // make image small until fully rendered, so skeleton can cover it in any case..
      const shadowDiv = d3.create("div");
      const shadowElement = shadowDiv._groups[0][0];
      shadowElement.innerHTML = imageData;
      d3.select(shadowElement)
        .select("svg")
        .attr("width", "100%")
        .attr("height", "100px");

      // select root element
      let rootElement = document.getElementById("svgImage");
      rootElement.innerHTML = shadowElement.innerHTML;

      // basic styles..
      d3.select(rootElement).selectAll("text").attr("font-family", "inherit");

      await this.waitFor(10);

      // align right
      let textNodes = d3
        .select(rootElement)
        .select("svg")
        .selectAll("text")
        .nodes();
      for (let idx = 0; idx < textNodes.length; idx++) {
        if (textNodes[idx].id.match("right")) {
          d3.select(textNodes[idx])
            .select("tspan")
            .attr("x", function (d, j) {
              var width = this.getBBox().width;
              return this.getBBox().x + width;
            })
            .attr("text-anchor", "end");
        }
      }

      return rootElement.innerHTML;
    },

    resetImageSize() {
      let rootElement = document.getElementById("svgImage");
      // let image grow to original scale
      d3.select(rootElement)
        .select("svg")
        .attr("width", "100%")
        .attr("height", null);
    },

    async reloadDBData(dataKeys) {
      let localData = {};
      for (let dbVal = 0; dbVal < dataKeys.length; dbVal++) {
        try {
          let result = await this.$timedb.getLastEntry(dataKeys[dbVal]);
          localData[dataKeys[dbVal]] = result;
        } catch (error) {
          console.error(error);
        }
      }
      return localData;
    },

    async waitFor(ms) {
      return new Promise(function (resolve) {
        setTimeout(resolve, ms || 0);
      });
    },
  },
};
</script>

<style>
</style>