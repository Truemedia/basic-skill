module.exports = `query salutations {
  salutations: allStrapiSalutation(filter: {tags: {in: "ArrivalSalutation"}}) {
    edges {
      node {
        name,
        tags
      }
    }
  }
}`;
