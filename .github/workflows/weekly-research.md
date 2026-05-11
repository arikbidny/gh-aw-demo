---
description: |
  This workflow performs research to  provides industry insights and competitive analysis.
  Reviews recent code, issues, PRs, industry news, and trends to create comprehensive
  research reports. Covers related products, research papers, market opportunities,
  business analysis, and new ideas. Creates GitHub discussions with findings to inform
  strategic decision-making.

on:
  schedule: weekly on monday        # gh-aw shorthand: runs once per week on Monday at a fuzzy time (jittered).
  workflow_dispatch:                # Also allow manual runs from the Actions UI / `gh workflow run`.

permissions: read-all               # Read-only across all scopes — writes happen in the separate safe-output job (discussions:write minted there).

network: defaults                   # Use gh-aw's default egress allow-list (GitHub API + common infra) plus web-fetch's domains.

engine: copilot                     # Use GitHub Copilot CLI as the agent runtime (requires COPILOT_GITHUB_TOKEN secret in GitHub Actions secrets).

safe-outputs:                       # Validated GitHub side-effects. Agent emits intent; a separate permissioned job executes them.
  create-discussion:                # The single side-effect: open one Discussion with the research report.
    title-prefix: "[weekly-research] "   # Forces all discussion titles to begin with this prefix (also acts as a marker).
    category: "ideas"               # Post into the "ideas" discussion category (must exist in the repo's Discussions settings).

tools:
  github:                           # GitHub MCP server — broad read access for repo context.
    toolsets: [all]                 # Enable every read-only toolset (repos, issues, PRs, code-search, security, etc.).
    min-integrity: none             # Don't filter content by author trust level — research summarizes everyone's activity.
  web-fetch:                        # Allow fetching arbitrary web pages for industry news / research papers / competitor docs.

timeout-minutes: 15                 # Hard wall-clock cap — kill the research run past 15 minutes.

source: githubnext/agentics/workflows/weekly-research.md@c7d030cd6d4607b90d9ac3ffc8b24aff4f251632   # Provenance: pinned upstream version this workflow was imported from.
---

# Weekly Research

## Job Description

Do a deep research investigation in ${{ github.repository }} repository, and the related industry in general.

- Read selections of the latest code, issues and PRs for this repo.
- Read latest trends and news from the software industry news source on the Web.

Create a new GitHub discussion with title starting with "[weekly-research]" containing a markdown report with

- Interesting news about the area related to this software project.
- Related products and competitive analysis
- Related research papers
- New ideas
- Market opportunities
- Business analysis
- Enjoyable anecdotes

Only a new discussion should be created, no existing discussions should be adjusted.

At the end of the report list write a collapsed section with the following:
- All search queries (web, issues, pulls, content) you used
- All bash commands you executed
- All MCP tools you used
