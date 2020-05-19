const trending = require("trending-github");
const { IncomingWebhook } = require("@slack/webhook");

/**
 ** Background Cloud Function.
 **
 ** @param {object} event The event payload.
 ** @param {object} context The event metadata.
 **/
exports.githubTrendsNotify = (event, context) => {
  const term = event.term;
  const language = event.language;
  const url = process.env.SLACK_WEBHOOK_URL;
  const webhook = new IncomingWebhook(url);

  return trending(term, language)
    .then(async (repos) => {
      const attachments = repos.map((repo) => buildRepoAttachment(repo));
      const blocks = buildMainBlockMessage(term, language);
      await webhook.send({ blocks, attachments });
    })
    .catch((err) => console.error(err));
};

function buildMainBlockMessage(term, language) {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${term} ${language} Trends`,
      },
    },
  ];
}

function buildRepoAttachment(repo) {
  const blocks = buildBaseAttachmentBlock(repo);
  if (repo.description) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: repo.description,
      },
    });
  }
  return { blocks };
}

function buildBaseAttachmentBlock(repo) {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `<${repo.href}|${repo.name}>`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:star: Stars: ${repo.stars}`,
      },
    },
  ];
}
