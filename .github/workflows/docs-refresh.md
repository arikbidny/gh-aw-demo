---
on:
  schedule:
    # Every 2 days at 06:00 UTC — automatic recurring run.
    - cron: "0 6 */2 * *"
  workflow_dispatch:                # Also allow manual runs from the Actions UI / `gh workflow run`.

permissions:
  contents: read                    # Read repo files (READMEs, package.json, source) — no write needed; safe-outputs job mints its own permissions to open the PR.
  issues: read                      # Read issues (used by gh-aw infra for context / failure-issue dedupe).
  pull-requests: read               # Read existing PRs (gh-aw uses this to detect prior runs and avoid duplicates).

engine: claude                      # Use Anthropic Claude as the agent runtime (requires ANTHROPIC_API_KEY secret).

network:
  allowed:                          # Egress allow-list enforced by the firewall sandbox around the agent.
    - "api.github.com"              # GitHub REST API (used by github MCP read tools below).
    - "raw.githubusercontent.com"   # Raw file fetches (e.g. badges, references in READMEs).

timeout-minutes: 15                 # Hard wall-clock cap for the agent step. Run is killed past this.

tools:
  github:                           # GitHub MCP server — read-only tool surface exposed to the agent.
    allowed:
      - get_repository              # Fetch repo metadata (default branch, description, topics).
      - list_commits                # List recent commits to find areas of recent change.
      - get_file_contents           # Read individual files from the repo via API (alternative to bash `cat`).
  bash:                             # Bash command allow-list — only these exact commands may be executed.
    - "find . -name 'README.md' -not -path './node_modules/*'"                          # Discover every README in the repo.
    - "git log --since='2 days ago' --name-only --pretty=format: -- '**/*.{js,ts,py,go,md,json}'"  # See which code/doc files changed in the last 2 days.
    - "cat *.md"                    # Read top-level Markdown files (README, CONTRIBUTING, etc.).
    - "ls -la"                      # Inspect repo layout.
    - "node --version"              # Detect Node version on the runner — used to validate "requires Node X" claims.
    - "cat package.json"            # Inspect npm scripts / dependencies referenced in READMEs.

safe-outputs:                       # Validated GitHub side-effects. The agent CANNOT call these directly; it emits intent and a separate permissioned job executes them.
  create-pull-request:              # The single side-effect this workflow can produce: one PR.
    title-prefix: "[docs] "         # All PR titles forced to start with "[docs] " (sanitized server-side).
    labels: [documentation, automated, agentic]   # Labels auto-applied to the PR.
    draft: true                     # Always opened as a draft — humans must mark ready-for-review.
    max: 1                          # Hard cap: at most 1 PR per workflow run.
    allowed-files: ["README.md", "**/README.md"]  # Exclusive allow-list: the patch may ONLY touch README files. Any other path is rejected.
    protected-files:                # Supply-chain guard: blocks edits to package manifests, CODEOWNERS, etc.
      policy: blocked               # Default policy — refuse the patch if it touches a protected file.
      exclude:
        - README.md                 # Remove README.md from the default protected set (otherwise this docs workflow could never edit it).
---

# Docs Refresh Agent

You are a **technical documentation maintainer**. Your job is to keep every `README.md`
in this repository accurate, complete, and aligned with the current code.

## Scope

1. Find every `README.md` file in the repo (root + each subdirectory). Skip `node_modules/`,
   `dist/`, `build/`, `.git/`, and any vendored folders.
2. For each README, compare it against the actual code in its directory:
   - Are listed scripts in `package.json` still present?
   - Do documented endpoints / CLI commands match `src/`?
   - Are install/run/test instructions still valid for the current Node/Python/Go version?
   - Are version numbers, badges, and links current?
3. Look at commits from the **last 2 days** to spot recently changed areas that may need
   doc updates (new endpoints, new env vars, new scripts, removed features, renamed files).

## What to update

For each README that needs changes, edit it in place and:

- Fix outdated commands, paths, env vars, or examples.
- Add a **"Last updated"** footer line: `_Last reviewed by docs-refresh agent on <YYYY-MM-DD>._`
- Keep the existing tone, structure, and headings — do not rewrite for style.
- Do **not** invent features. If you are not sure something exists, leave it alone and
  note it in the PR description under "Needs human review".

## Output

Open **one** pull request titled `Refresh docs (<date>)` with:

- A short summary of what changed and why (per file)
- A **"Needs human review"** section listing any ambiguities you couldn't resolve safely
- A **"Skipped"** section listing READMEs you intentionally left untouched

If nothing needs updating, do **not** open a PR — just print
`No documentation drift detected.` and exit cleanly.

## Guardrails

- Never modify code under `src/`, `lib/`, `tests/`, or workflow files. Docs only.
- Never delete a README. If it's truly stale, flag it for human review instead.
- Keep the PR small: prefer surgical edits over full rewrites.
