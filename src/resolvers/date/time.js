const spacetime = require('spacetime');

/**
  * @return {Promise}
  */
module.exports = function(pod, templater)
{
  let time = spacetime.now(pod.tz).time(); // Grab time from POD timezone

  return templater.tpl('date', {time})
    .compile()
    .then(content => content.body)
    .catch(err => console.error(err));
};
