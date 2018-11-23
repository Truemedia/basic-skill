const randomItem = require('random-item');

/**
  * @return {Promise}
  */
module.exports = function(service, templater)
{
  return service.get('salutation', {
    filter: {tags: 'ArrivalSalutation'}
  }).then(res => {
    let arrivalSalutation = randomItem(res.data).name;
    return templater.tpl('salute', {arrivalSalutation}).compile();
  }).then(content => content.body)
    .catch(err => console.error(err));
};
