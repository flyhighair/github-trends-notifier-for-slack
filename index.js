const trending = require("trending-github");

/**
 ** Background Cloud Function.
 **
 ** @param {object} event The event payload.
 ** @param {object} context The event metadata.
 **/
exports.githubTrendsNotify = (event, context) => {
  const term = event.term;
  const language = event.language;
  return trending(term, language)
    .then((repos) => console.log(repos))
    .catch((err) => console.error(err));
};
