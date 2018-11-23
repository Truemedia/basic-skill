/**
  * @return {Promise}
  */
module.exports = function(templater)
{
  let health = '100%';

  return templater.tpl('status', {health})
    .compile()
    .then(content => content.body)
    .catch(err => console.error(err));
};
