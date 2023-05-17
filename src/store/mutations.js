export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setDataArts(state, payload) {
    state.artworks = payload;
  },
};
