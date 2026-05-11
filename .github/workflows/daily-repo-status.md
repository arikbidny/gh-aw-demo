---
description: |
  This workflow creates daily repo status reports. It gathers recent repository
  activity (issues, PRs, discussions, releases, code changes) and generates
  engaging GitHub issues with productivity insights, community highlights,
  and project recommendations.

on:
  schedule: daily                   # gh-aw shorthand: runs once per day at a fuzzy time (jittered to spread load).
  workflow_dispatch:                # Also allow manual runs from the Actions UI / `gh workflow run`.

permissions:
  contents: read                    # Read repo files for context (no writes — issue creation runs in a separate permissioned job).
  issues: read                      # Read existing issues so the agent can summarize activity.
  pull-requests: read               # Read PRs to include them in the daily summary.

network: defaults                   # Use gh-aw's default network allow-list (GitHub API + common infra). No custom egress needed.

engine: claude                      # Use Anthropic Claude as the agent runtime (requires ANTHROPIC_API_KEY secret).

tools:
  github:                           # GitHub MCP server — read-only by default at this permission level.
    # If in a public repo, setting `lockdown: false` allows
    # reading issues, pull requests and comments from 3rd-parties
    # If in a private repo this has no particular effect.
    lockdown: false                 # Disable strict author-integrity filtering — needed to read community contributions.
    min-integrity: none             # Don't filter content by author trust level — this workflow summarizes everyone's activity.

safe-outputs:                       # Validated GitHub side-effects. Agent emits intent; a separate job executes them.
  mentions: false                   # Strip @mentions from agent output — prevents accidental notification spam.
  allowed-github-references: []     # No #123 / org/repo#123 references allowed in output (avoids cross-linking noise).
  create-issue:                     # The single side-effect: one daily status issue.
    title-prefix: "[repo-status] "  # Forces all issue titles to begin with this prefix (also used as a marker for dedupe).
    labels: [report, daily-status]  # Labels auto-applied to the created issue.
    close-older-issues: true        # Auto-close yesterday's status issue when today's is created (keeps only the latest open).
source: githubnext/agentics/workflows/repo-status.md@main   # Provenance: this workflow was imported/derived from the upstream agentics gallery.
---

# Repo Status

Create an upbeat daily status report for the repo as a GitHub issue.

## What to include

- Recent repository activity (issues, PRs, discussions, releases, code changes)
- Progress tracking, goal reminders and highlights
- Project status and recommendations
- Actionable next steps for maintainers

## Style

- Be positive, encouraging, and helpful 🌟
- Use emojis moderately for engagement
- Keep it concise - adjust length based on actual activity

## Process

1. Gather recent activity from the repository
2. Study the repository, its issues and its pull requests
3. Create a new GitHub issue with your findings and insights
