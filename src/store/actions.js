export default {
  async loadDataArtworks(context) {
    const response = await fetch("https://api.artic.edu/api/v1/artworks/");
    const responseData = await response.json();
    console.log(response);
    console.log(responseData);
    if (!response.ok) {
      // ...
    }

    const artworks = [];
    for (const key in responseData) {
      const artwork = {
        id: key,
        artId: responseData[key].data.data.id,
        artistTitle: responseData[key].data.data.artist_title,
        titleWork: responseData[key].data.data.title,
        imgUrl: responseData[key].data.data.image_id,
        updatedAt: responseData[key].data.data.updated_at,
      };
      artworks.push(artwork);
      console.log(responseData);
    }
    console.log(responseData);
    context.commit("setDataArts", artworks);
  },
};
