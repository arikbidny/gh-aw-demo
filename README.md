# gh-aw-workshop-demo

A tiny Express API used to demo **GitHub Agentic Workflows** (`gh-aw`).

## What's here

- `src/server.js` — minimal Express app with a couple of intentional issues to demo issue-triage and PR-review agents
- `tests/server.test.js` — basic Jest tests
- `.github/workflows/issue-triage.md` — agentic workflow that triages new issues
- `.github/workflows/pr-reviewer.md` — agentic workflow that reviews new PRs (built **live** during the workshop)
- `.github/workflows/security-scan.md` — agentic workflow that reviews PRs for security issues
- `.github/workflows/docs-refresh.md` — agentic workflow that keeps READMEs in sync with the code
- `.github/workflows/daily-repo-status.md` — agentic workflow that posts daily repo-activity reports as issues
- `.github/workflows/weekly-research.md` — agentic workflow that posts weekly industry-research summaries as discussions

## Local

```bash
npm install
npm test
npm start          # http://localhost:3000
```

## Workshop flow

See [`/runbook/RUNBOOK.md`](../runbook/RUNBOOK.md) in the workshop kit.

## Credits

Built on top of [GitHub Agentic Workflows](https://github.github.com/gh-aw/) by GitHub Next + Microsoft Research.

_Last reviewed by docs-refresh agent on 2026-06-01._
