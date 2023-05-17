<template>
  <v-responsive
    class="d-flex align-center text-center fill-height bg-lime-lighten-5 rounded-lg py-4"
  >
    <h1 class="text-h2 font-weight-bold">
      <span class="text-deep-purple-accent-1">A</span>rt<span
        class="text-blue-lighten-1"
        >w</span
      >ork<span class="text-teal-accent-3">s</span>
    </h1>
    <v-btn
      class="mx-2 bg-deep-purple-accent-1 mt-10"
      @click.prevent="loadDataArtworks"
      >Refresh</v-btn
    >
    <v-pagination v-model="page" class="my-4" :length="15"></v-pagination>
    <div class="py-14" />

    <v-row class="d-flex d-flex-wrap align-center justify-space-around">
      <div class="box auto" v-for="artwork in artsworkData" :key="artwork">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            class="mx-auto"
            color="grey-lighten-4"
            max-width="600"
            v-bind="props"
          >
            <v-img
              :aspect-ratio="16 / 9"
              cover
              src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
            >
              <!-- <v-img
                  :aspect-ratio="16 / 9"
                  cover
                  :src="`https://www.artic.edu/iiif/2/${artworks.imgUrl}/full/843,/0/default.jpg` ? '`https://www.artic.edu/iiif/2/${artworks.imgUrl}/full/843,/0/default.jpg`' : 'https://cdn.vuetifyjs.com/images/cards/kitchen.png'"
                > -->
              <v-expand-transition>
                <div
                  v-if="isHovering"
                  class="d-flex transition-fast-in-fast-out bg-orange-darken-2 v-card--reveal text-h6 align-center justify-center"
                  style="height: 100%"
                >
                  {{
                    new Date(artwork.updatedAt).toLocaleDateString("pl-PL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  }}
                </div>
              </v-expand-transition>
            </v-img>

            <v-card-text class="pt-6">
              <h3 class="read-more text-h5 font-weight-light text-orange mb-2">
                {{ artwork.titleWork }}
              </h3>
              <p>{{ artwork.artistTitle }}</p>
            </v-card-text>
          </v-card>
        </v-hover>
      </div>
    </v-row>
  </v-responsive>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {
    this.loadDataArtworks();
    this.loadDataArtworksPagination();
  },
  computed: {
    ...mapGetters(["artsworkData", "artsworkDataPagination"]),
  },
  watch: {
    options: {
      handler() {
        this.getPagesFromApi();
      },
    },
    deep: true,
  },
  methods: {
    loadDataArtworks() {
      this.$store.dispatch("loadDataArtworks");
    },
    loadDataArtworksPagination() {
      this.$store.dispatch("loadDataArtworksPagination");
    },
  },
};
</script>

<style scoped>
.home-page :deep(v-card:hover) {
  background-color: black;
}

.read-more {
  overflow: hidden;
  width: 400px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.box {
  min-width: 400px;
  min-height: 500px;
}
</style>
