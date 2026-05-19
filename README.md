# gh-aw-workshop-demo

A tiny Express API used to demo **GitHub Agentic Workflows** (`gh-aw`).

## What's here

- `src/server.js` — minimal Express app with a couple of intentional issues to demo issue-triage and PR-review agents
- `tests/server.test.js` — basic Jest tests
- `.github/workflows/issue-triage.md` — agentic workflow that triages new issues
- `.github/workflows/docs-refresh.md` — agentic workflow that refreshes documentation
- `.github/workflows/daily-repo-status.md` — agentic workflow that reports daily repository status
- `.github/workflows/security-scan.md` — agentic workflow that runs security scans
- `.github/workflows/weekly-research.md` — agentic workflow that performs weekly industry research

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

---

_Last reviewed by docs-refresh agent on 2026-05-19._
