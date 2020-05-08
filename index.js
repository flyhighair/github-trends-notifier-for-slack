/**
 ** Background Cloud Function.
 **
 ** @param {object} data The event payload.
 ** @param {object} context The event metadata.
 **/
exports.githubTrendsNotifyForSlack = (data, context) => {
  return `Hello ${data.name || 'World'}!`;
};

