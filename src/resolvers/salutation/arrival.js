const randomItem = require('random-item');

/**
  * @return {Promise}
  */
module.exports = function(service, templater)
{
  let query = `{
    salutations: allJsonApisalutation(filter: {tags: {in: "ArrivalSalutation"}}) {
      edges {
        node {
          name
        }
      }
    }
  }`;
  return service.request(query).then(data => {
    let arrivalSalutation = randomItem(data.salutations.edges).node.name;
    return templater.tpl('salute', {arrivalSalutation}).compile();
  }).then(content => content.body)
    .catch(err => console.error(err));
};
