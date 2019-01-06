const randomItem = require('random-item');

/**
  * @return {Promise}
  */
module.exports = function(service, templater)
{
  let query = `{
    salutations: allJsonApisalutation(filter: {tags: {in: "DepartureSalutation"}}) {
      edges {
        node {
          name
        }
      }
    }
  }`;
  return service.request(query).then(data => {
    let departureSalutation = randomItem(data.salutations.edges).node.name;
    return templater.tpl('salute', {departureSalutation}).compile();
  }).then(content => content.body)
    .catch(err => console.error(err));
};
