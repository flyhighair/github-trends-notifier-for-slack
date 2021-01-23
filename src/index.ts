import trending from 'trending-github';
import { IncomingWebhook } from '@slack/webhook';
import { MessageAttachment, SectionBlock } from '@slack/types'

interface EventPayload {
  data: string;
}

interface Repository {
  author: string,
  name: string,
  href: string,
  description: string | null,
  language: string,
  stars: number,
  forks: number,
  starsInPeriod: number | null,
};

interface RequestParams {
  term: string,
  language: string
}

/**
 ** Background Cloud Function.
 **
 ** @param {object} event The event payload.
 ** @param {object} context The event metadata.
 **/
exports.githubTrendsNotify = (event: EventPayload, _: Object) => {
  const { term, language }: RequestParams = JSON.parse(
    Buffer.from(event.data, "base64").toString()
  );
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) {
    throw new Error('Not set env SLACK_WEBHOOK_URL');
  }

  const webhook = new IncomingWebhook(url);

  return trending(term, language)
    .then(async (res) => {
      const repos = res as Repository[];
      const attachments = repos.map((repo) => buildRepoAttachment(repo));
      const blocks = buildMainBlockMessage(term, language);
      await webhook.send({ blocks, attachments });
    })
    .catch((err: Error) => console.error(err));
};

function buildMainBlockMessage(term: string, language: string): SectionBlock[] {
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

function buildRepoAttachment(repo: any): MessageAttachment {
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

function buildBaseAttachmentBlock(repo: any): SectionBlock[] {
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
