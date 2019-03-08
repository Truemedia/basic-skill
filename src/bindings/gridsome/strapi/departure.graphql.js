module.exports = `query DepartureSalutations {
  salutations: allStrapiSalutation(
    filter: {
      tags: { regex: "DepartureSalutation" }
    }
  ) {
    edges {
      node {
        name,
        tags
      }
    }
  }
}`;
