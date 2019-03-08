const randomItem = require('random-item');
const query = require('./../../bindings/gridsome/strapi/departure.graphql');

/**
  * @return {Promise}
  */
module.exports = function(service, templater)
{
  return service.request(query).then(data => {
    let departureSalutation = randomItem(data.salutations.edges).node.name;
    return templater.tpl('salute', {departureSalutation}).compile();
  }).then(content => content.body)
    .catch(err => console.error(err));
};
