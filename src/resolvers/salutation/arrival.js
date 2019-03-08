const randomItem = require('random-item');
const query = require('./../../bindings/gridsome/strapi/arrival.graphql');

/**
  * @return {Promise}
  */
module.exports = function(service, templater)
{
  return service.request(query).then(data => {
    let arrivalSalutation = randomItem(data.salutations.edges).node.name;
    return templater.tpl('salute', {arrivalSalutation}).compile();
  }).then(content => content.body)
    .catch(err => console.error(err));
};
