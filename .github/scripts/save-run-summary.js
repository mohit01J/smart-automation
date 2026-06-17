const { Octokit } = require('@octokit/rest');

async function saveRunSummary() {
  const octokit = new Octokit({ auth: process.env.GH_PAT });

  const date = new Date().toISOString().split('T')[0];
  const runNumber = process.env.GITHUB_RUN_NUMBER;
  const status = process.env.JOB_STATUS || 'unknown';
  const runId = process.env.GITHUB_RUN_ID;
  const actor = process.env.GITHUB_ACTOR;
  const trigger = process.env.GITHUB_EVENT_NAME;
  const repo = process.env.GITHUB_REPOSITORY;

  const content = [
    'run_id: ' + date + '-smoke-gh-' + runNumber,
    'suite: smoke',
    'trigger: ' + trigger,
    'triggered_by: ' + actor,
    'github_run_id: ' + runId,
    'github_run_url: https://github.com/' + repo + '/actions/runs/' + runId,
    'status: ' + status.toUpperCase(),
    'date: ' + date,
    'human_approval: pending'
  ].join('\n');

  const encoded = Buffer.from(content).toString('base64');
  const filePath = 'evidence/run-summaries/' + date + '-smoke-gh-' + runNumber + '.yaml';

  await octokit.repos.createOrUpdateFileContents({
    owner: 'mohit01J',
    repo: 'prada-marketplace-quality-assurance',
    path: filePath,
    message: 'chore: run summary ' + date + ' smoke gh-' + runNumber,
    content: encoded,
    branch: 'main'
  });

  console.log('Run summary saved: ' + filePath);
}

saveRunSummary().catch(console.error);
