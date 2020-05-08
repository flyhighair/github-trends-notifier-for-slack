/**
 ** Background Cloud Function.
 **
 ** @param {object} event The event payload.
 ** @param {object} context The event metadata.
 **/
exports.githubTrendsNotify = (event, context) => {
  const pubsubMessage = event.data;
  console.log(Buffer.from(pubsubMessage, 'base64').toString());
};

