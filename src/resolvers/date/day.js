const spacetime = require('spacetime');

/**
  * @return {Promise}
  */
module.exports = function(pod, templater)
{
  let day = spacetime.now(pod.tz).dayName(); // Grab day from POD timezone

  return templater.tpl('date', {day})
    .compile()
    .then(content => content.body)
    .catch(err => console.error(err));
};
