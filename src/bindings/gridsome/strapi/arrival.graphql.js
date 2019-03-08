module.exports = `query ArrivalSalutations {
  salutations: allStrapiSalutation(
    filter: {
      tags: { regex: "ArrivalSalutation" }
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
