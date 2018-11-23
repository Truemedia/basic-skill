/**
  * @return {Promise}
  */
module.exports = function(templater)
{
  let sleep = '1 hour'; // TODO: Use duration

  return templater.tpl('status', {sleep})
    .compile()
    .then(content => content.body)
    .catch(err => console.error(err));
};
