# Sub-Agent Delegation System

**Purpose:** Provide a delegation workflow for high-context tasks. For project conventions and stack details, see [AGENTS.md](../../AGENTS.md).

---

## When to Delegate

Delegate to a sub-agent when:
- The task is high-context (large docs, multi-surface changes, or multiple features).
- The task is specialized (security, commerce, performance, accessibility).
- The task can be parallelized across domains (API vs. UI, implementation vs. tests).
- The task is expected to take more than 2 hours.
- The conversation is already saturated with multiple workstreams.

Do not delegate for:
- Small bug fixes, quick refactors, or short documentation tweaks.

---

## Delegation Flow (Overview)

```
Primary Agent
  -> Identify task scope and risks
  -> Choose sub-agent type
  -> Provide handoff context
  -> Sub-agent executes
  -> Review, test, integrate
```

---

## Delegation Protocol

### Step 1: Identify and Scope

- Define the task in 2-3 sentences.
- List must-haves, should-haves, and nice-to-haves.
- Clarify constraints (security, performance, testing).
- Identify related files and docs.

### Step 2: Choose a Sub-Agent

Use the decision matrix in [SUB_AGENT_QUICK_REFERENCE.md](./SUB_AGENT_QUICK_REFERENCE.md).

### Step 3: Provide a Handoff

Use the handoff template in the relevant specialization doc:
- [CLAUDE_SUB.md](./CLAUDE_SUB.md)
- [GEMINI_SUB.md](./GEMINI_SUB.md)

Include:
- Task summary and acceptance criteria
- Key files and docs
- Deadline/priority (if any)
- Testing expectations
- Return protocol

### Step 4: Sub-Agent Execution

Sub-agents should:
- Read [AGENTS.md](../../AGENTS.md) and their specialization doc
- Follow existing code patterns
- Add/adjust tests where appropriate
- Document any non-obvious decisions

### Step 5: Review and Integrate

See "Reviewing Sub-Agent Work" below.

---

## Reviewing Sub-Agent Work

Quality checklist:
- Code follows existing project conventions
- Tests added/updated where appropriate
- Test suite passes for affected areas
- Documentation updated if behavior changes
- Security implications reviewed (if applicable)
- No unexpected side effects in related features

Integration steps:
1. Review the PR or patch carefully
2. Run relevant tests (or request results)
3. Merge only when checks pass
4. Update docs if new patterns were introduced

---

## Context Snapshot (Optional)

Use this for long-running or multi-agent tasks to avoid drift:

```markdown
# Context Snapshot [DATE]

## Recent Decisions
- [Decision 1]
- [Decision 2]

## Current Focus Areas
1. [Focus 1]
2. [Focus 2]

## Known Constraints
- [Constraint 1]
- [Constraint 2]
```

---

## Communication Protocols

### Status Update (Optional for Long Tasks)

```
## Progress Update [HH:mm]

Completed:
- Item 1
- Item 2

In Progress:
- Item 3

Blockers:
- Item 4

ETA: X hours
```

### Blocker Report

```
## Blocker Report

Issue: [What is blocking]
Impact: [Why it matters]
Options:
1. [Option 1]
2. [Option 2]

Recommendation: [Preferred option + reason]
Need From Primary: [Decision or missing info]
```

---

## Model Selection (Guidelines)

**Claude:**
- Opus for complex architecture or security
- Sonnet for general development
- Haiku for simple fixes and polish

**Gemini:**
- Pro for complex fullstack work
- Flash for UI, docs, or testing-focused tasks

---

## Related Docs

- [SUB_AGENT_QUICK_REFERENCE.md](./SUB_AGENT_QUICK_REFERENCE.md)
- [SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md)
- [CLAUDE_SUB.md](./CLAUDE_SUB.md)
- [GEMINI_SUB.md](./GEMINI_SUB.md)
