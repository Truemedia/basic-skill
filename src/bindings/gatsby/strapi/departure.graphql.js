module.exports = `query salutations {
  salutations: allStrapiSalutation(filter: {tags: {in: "DepartureSalutation"}}) {
    edges {
      node {
        name,
        tags
      }
    }
  }
}`;
