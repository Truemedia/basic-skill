const randomItem = require('random-item');

/**
  * @return {Promise}
  */
module.exports = function(service, templater)
{
  return service.get('salutation', {
    filter: {tags: 'DepartureSalutation'}
  }).then(res => {
    let departureSalutation = randomItem(res.data).name;
    return templater.tpl('salute', {departureSalutation}).compile();
  }).then(content => content.body)
    .catch(err => console.error(err));
};
