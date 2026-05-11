# gh-aw-workshop-demo

A tiny Express API used to demo **GitHub Agentic Workflows** (`gh-aw`).

## What's here

- `src/server.js` — minimal Express app with a couple of intentional issues to demo issue-triage and PR-review agents
- `tests/server.test.js` — basic Jest tests
- `.github/workflows/issue-triage.md` — agentic workflow that triages new issues
- `.github/workflows/pr-reviewer.md` — agentic workflow that reviews new PRs (built **live** during the workshop; not pre-included)
- `.github/workflows/daily-repo-status.md` — agentic workflow that posts a daily repo health summary
- `.github/workflows/docs-refresh.md` — agentic workflow that keeps README files in sync with the code
- `.github/workflows/security-scan.md` — agentic workflow that scans for security issues on each push
- `.github/workflows/weekly-research.md` — agentic workflow that scans industry feeds and summarises findings

## Local

```bash
npm install
npm test
npm start          # http://localhost:3000
PORT=4000 npm start  # optional: override default port
```

## Workshop flow

See [`/runbook/RUNBOOK.md`](../runbook/RUNBOOK.md) in the workshop kit.

## Credits

Built on top of [GitHub Agentic Workflows](https://github.github.com/gh-aw/) by GitHub Next + Microsoft Research.

_Last reviewed by docs-refresh agent on 2026-05-11._
