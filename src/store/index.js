import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isLogged: false,
      artworks: [],
      artworksPagination: [],
      request: [],
    };
  },
  mutations: {
    setAuth(state, payload) {
      state.isLogged = payload.isAuthenticated;
    },
    setDataArts(state, payload) {
      state.artworks = payload;
    },
    setDataArtsPagination(state, payload) {
      state.artworksPagination = payload;
    },
  },
  actions: {
    login(context) {
      context.commit("setAuth", { isAuthenticated: true });
    },
    logout(context) {
      context.commit("setAuth", { isAuthenticated: false });
    },
    async loadDataArtworks(context) {
      const response = await fetch("https://api.artic.edu/api/v1/artworks");
      const responseData = await response.json();
      if (!response.ok) {
        // ...
      }

      const artworks = [];
      for (const key in responseData.data) {
        console.log(responseData.data);
        const artwork = {
          artId: responseData.data[key].id,
          artistTitle: responseData.data[key].artist_title,
          titleWork: responseData.data[key].title,
          imgUrl: responseData.data[key].image_id
            ? responseData.data[key].image_id
            : "https://cdn.vuetifyjs.com/images/cards/kitchen.png",
          updatedAt: responseData.data[key].updated_at,
        };
        artworks.push(artwork);
      }
      context.commit("setDataArts", artworks);
    },
    async loadDataArtworksPagination(context) {
      const response = await fetch(
        "https://api.artic.edu/api/v1/artworks?page=${current_page}"
      );
      const responseData = await response.json();
      if (!response.ok) {
        // ...
      }

      const artworksPagination = [];
      for (const key in responseData.pagination) {
        console.log(responseData.pagination);
        const artworkPagination = {
          id: key,
          current_page: responseData.pagination.current_page,
          total_pages: responseData.pagination.total_pages,
          next_url: responseData.pagination.next_url,
          prev_url: responseData.pagination.prev_url,
        };
        artworksPagination.push(artworkPagination);
      }
      context.commit("setDataArtsPagination", artworksPagination);
    },
  },
  getters: {
    userIsAuthenticated(state) {
      return state.isLogged;
    },
    artsworkData(state) {
      return state.artworks;
    },
    artsworkDataPagination(state) {
      return state.artworksPagination;
    },
  },
});

export default store;
