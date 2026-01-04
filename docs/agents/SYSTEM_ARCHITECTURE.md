# SUB-AGENT SYSTEM ARCHITECTURE

**Visual guide to how all the documentation files work together**

---

## File Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                     PRIMARY AGENT (You)                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ Start Work   │→ │ Check Context│→ │ Decide on   │              │
│  │              │  │ Requirements │  │ Approach    │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│         ↓                  ↓                  ↓                      │
│    Reference:        Read: AGENTS.md    Use Decision Matrix        │
│    Current work      (core patterns)    (SUB_AGENT_QUICK_REFERENCE)│
└─────────────────────────────────────────────────────────────────────┘
                              ↓
                    Is task high-context?
                              ↓
                    ┌─────────┴─────────┐
                    ↓                   ↓
               YES (delegate)      NO (handle it)
                    ↓                   ↓
         ┌──────────────────┐    Continue work
         │ Select Sub-Agent │    in current agent
         │ (see matrix)     │
         └──────────────────┘
                    ↓
    ┌───────────────┬───────────────────┬────────────────┐
    ↓               ↓                   ↓                ↓
CLAUDE SUB-AGENTS | GEMINI SUB-AGENTS | Questions?     Choose Model:
    ↓              ↓                   ↓                ↓
┌──────────────┐┌──────────────────┐ Check:         Opus: complex
│ SECURITY    ││ FULLSTACK         │ AGENTS.md      Sonnet: standard
│ COMMERCE    ││ FRONTEND          │ section        Flash: UI/simple
│ FULLSTACK   ││ DOCUMENTATION     │ "When to"
│ PERFORMANCE ││ TESTING           │
│ EMAIL       │└──────────────────┘
└──────────────┘
    ↓                    ↓
Read: CLAUDE_SUB.md  Read: GEMINI_SUB.md
[Specializations]   [Specializations]
[Deliverables]      [Deliverables]
    ↓                    ↓
Prepare handoff   Prepare handoff
(copy template)   (copy template)
    ↓                    ↓
    └────────────────────┘
           ↓
    ┌─────────────────────┐
    │  Spawn Sub-Agent    │
    │  (send handoff MD)  │
    └─────────────────────┘
           ↓
    ┌─────────────────────┐
    │ Sub-Agent Works...  │
    │ (in their domain)   │
    └─────────────────────┘
           ↓
    ┌─────────────────────┐
    │ Returns PR with:    │
    │ • Feature code      │
    │ • Tests             │
    │ • Documentation     │
    │ • Ready to merge    │
    └─────────────────────┘
           ↓
    Review per checklist
    (in AGENTS.md)
           ↓
    Merge → Deploy
```

---

## Which File Do You Use When?

### Starting a Work Session

1. **Read:** Your CLAUDE.md or GEMINI.md (output preferences)
2. **Reference:** AGENTS.md (quick reference section)
3. **Build:** Your feature

### Deciding to Delegate

1. **Use:** SUB_AGENT_QUICK_REFERENCE.md (decision matrix, 1 min)
2. **Choose:** Sub-agent type from table
3. **Read:** CLAUDE_SUB.md or GEMINI_SUB.md (specialization details)

### Spawning Sub-Agent

1. **Copy:** Handoff template from CLAUDE_SUB.md or GEMINI_SUB.md
2. **Fill:** With your task details
3. **Send:** To sub-agent (with link to relevant doc)

### Sub-Agent is Working

- Sub-agent reads: AGENTS.md (core patterns) + their specialization doc
- Sub-agent references: CLAUDE.md/GEMINI.md (output preferences)
- You: wait for delivery

### Sub-Agent Returns Work

1. **Review:** Using checklist in SUB_AGENT_SYSTEM.md section "Reviewing Sub-Agent Work"
2. **Test:** Full test suite
3. **Merge:** When satisfied
4. **Update:** AGENTS.md if patterns changed

---

## File Purposes (One-Liner Each)

| File | Purpose | Audience |
|------|---------|----------|
| **CLAUDE.md** | Your output preferences as Claude | You (Claude) |
| **GEMINI.md** | Your output preferences as Gemini | You (Gemini) |
| **AGENTS.md** | Core project patterns, delegation protocol, all sub-agent specs | Everyone |
| **SUB_AGENT_SYSTEM.md** | Delegation workflow + review checklist | Everyone |
| **CLAUDE_SUB.md** | What each Claude sub-agent does, how they work, deliverables | Claude sub-agents |
| **GEMINI_SUB.md** | What each Gemini sub-agent does, how they work, deliverables | Gemini sub-agents |
| **SUB_AGENT_QUICK_REFERENCE.md** | 5-minute decision matrix, templates, examples | You (decision-making) |

---

## Task Flow by Example

### Example 1: Simple Feature (No Delegation)

```
You: "I need to fix the newsletter form styling"
      ↓
      Check SUB_AGENT_QUICK_REFERENCE.md
      ↓
      Decision: Simple fix, < 1 hour → Don't delegate
      ↓
      Read: CLAUDE.md (output preferences)
      Read: AGENTS.md (component patterns)
      ↓
      Make changes, test, commit
      ↓
      Done
```

### Example 2: Complex Feature (Delegate Once)

```
You: "Build complete checkout flow"
      ↓
      Check SUB_AGENT_QUICK_REFERENCE.md
      ↓
      Decision: Complex, high-context → Delegate
      ↓
      Use decision matrix:
      "E-commerce" → "checkout" → CLAUDE_SUB_COMMERCE
      ↓
      Read: CLAUDE_SUB.md (COMMERCE specialization)
      ↓
      Copy: Handoff template (from CLAUDE_SUB.md)
      Fill: Task details
      ↓
      Spawn: CLAUDE_SUB_COMMERCE
      ↓
      Sub-agent reads:
      • AGENTS.md (core patterns)
      • CLAUDE_SUB.md (their specialization)
      • CLAUDE.md (output preferences)
      ↓
      Returns: PR with code, tests, docs
      ↓
      You review (checklist from AGENTS.md)
      ↓
      Merge + Deploy
```

### Example 3: Major Feature (Delegate Multiple, Parallel)

```
You: "Build admin dashboard"
      ↓
      Check SUB_AGENT_QUICK_REFERENCE.md
      ↓
      Decision: Complex, high-context, API + UI → Parallel delegation
      ↓
      Spawn (in parallel):
      
      Task 1: API + data              Task 2: UI + components
      ├─ CLAUDE_SUB_FULLSTACK        ├─ GEMINI_SUB_FULLSTACK
      │ (API security + performance)  │ (clean UI + a11y)
      │                               │
      └─ Read CLAUDE_SUB.md          └─ Read GEMINI_SUB.md
                                     
      ↓
      Both work simultaneously
      ↓
      Both return PRs (1-2 hours apart)
      ↓
      You review both
      ↓
      Merge API PR first
      ↓
      Merge UI PR (coordinates with API)
      ↓
      Integration test
      ↓
      Deploy
```

### Example 4: Security Review (Sequential Delegation)

```
You: "Implement payment system"
      ↓
      Check SUB_AGENT_QUICK_REFERENCE.md
      ↓
      Decision: Payment = security risk → Sequential
      ↓
      Step 1: Security review first
      ├─ Spawn: CLAUDE_SUB_SECURITY
      ├─ Read: CLAUDE_SUB.md (SECURITY specialization)
      │
      └─ Returns: Security audit + fixes needed
            ↓
      You review findings
      ↓
      
      Step 2: Implementation (after security approval)
      ├─ Spawn: CLAUDE_SUB_COMMERCE
      ├─ Read: CLAUDE_SUB.md (COMMERCE specialization)
      │
      └─ Returns: Payment implementation + tests
            ↓
      You review + merge
      ↓
      Deploy (with security sign-off)
```

---

## Navigation Quick Links

### I'm Claude (Primary Agent)

| Want to... | File | Section |
|-----------|------|---------|
| Check output preferences | CLAUDE.md | Top |
| Understand project | AGENTS.md | All sections |
| Decide if I should delegate | SUB_AGENT_QUICK_REFERENCE.md | Decision Matrix |
| Delegation workflow | SUB_AGENT_SYSTEM.md | Overview |
| Spawn a Claude sub-agent | CLAUDE_SUB.md | [Specialization name] |
| Spawn a Gemini sub-agent | GEMINI_SUB.md | [Specialization name] |
| Review sub-agent work | SUB_AGENT_SYSTEM.md | "Reviewing Sub-Agent Work" |

### I'm a Claude Sub-Agent (CLAUDE_SUB_*)

| Want to... | File | Section |
|-----------|------|---------|
| Understand my specialization | CLAUDE_SUB.md | My name |
| Understand project core | AGENTS.md | All sections |
| Check output preferences | CLAUDE.md | All |
| See deliverables template | CLAUDE_SUB.md | My name → "Deliverables Template" |
| See quality checklist | CLAUDE_SUB.md | My name → "Checklist" |

### I'm Gemini (Primary Agent)

| Want to... | File | Section |
|-----------|------|---------|
| Check output preferences | GEMINI.md | Top |
| Understand project | AGENTS.md | All sections |
| Decide if I should delegate | SUB_AGENT_QUICK_REFERENCE.md | Decision Matrix |
| Delegation workflow | SUB_AGENT_SYSTEM.md | Overview |
| Spawn a Gemini sub-agent | GEMINI_SUB.md | [Specialization name] |
| Spawn a Claude sub-agent | CLAUDE_SUB.md | [Specialization name] |
| Review sub-agent work | SUB_AGENT_SYSTEM.md | "Reviewing Sub-Agent Work" |

### I'm a Gemini Sub-Agent (GEMINI_SUB_*)

| Want to... | File | Section |
|-----------|------|---------|
| Understand my specialization | GEMINI_SUB.md | My name |
| Understand project core | AGENTS.md | All sections |
| Check output preferences | GEMINI.md | All |
| See deliverables template | GEMINI_SUB.md | My name → "Deliverables Template" |
| See quality checklist | GEMINI_SUB.md | My name → "Checklist" |

---

## File Dependencies

```
CLAUDE.md / GEMINI.md
    ↓ (references)
    AGENTS.md
    ↑ (referenced by)
    │
    ├─ SUB_AGENT_SYSTEM.md (delegation workflow)
    │   ↓ (you reference)
    │   Review checklist + protocol
    │
    ├─ CLAUDE_SUB.md (detailed Claude specializations)
    │   ↓ (sub-agents read)
    │   [Sub-agents work]
    │
    ├─ GEMINI_SUB.md (detailed Gemini specializations)
    │   ↓ (sub-agents read)
    │   [Sub-agents work]
    │
    └─ SUB_AGENT_QUICK_REFERENCE.md (quick decision guide)
        ↓ (you reference)
        "Should I delegate?" → Yes → "Which sub-agent?" → Spawn
```

---

## Token/Context Budget

When reading docs to understand what to delegate:

| Document | Approximate Tokens | When to Read |
|----------|-------------------|-------------|
| AGENTS.md | 8,000 | Once per session (you know core patterns) |
| SUB_AGENT_SYSTEM.md | 3,000 | When delegating or reviewing sub-agent work |
| CLAUDE_SUB.md (full) | 6,000 | When spawning Claude sub-agents |
| GEMINI_SUB.md (full) | 6,000 | When spawning Gemini sub-agents |
| SUB_AGENT_QUICK_REFERENCE.md | 2,000 | Every time (to decide if/what to delegate) |
| Specific sub-agent section | 1,000 | Only the specialization you're using |

**Strategy:** Read AGENTS.md once, then only reference quick reference + specific sub-agent docs.

---

## Common Workflows

### Workflow 1: "I Have a Vague Feature Idea"

```
1. Document what you know
2. Read: AGENTS.md → Development Guidelines
3. Determine scope + complexity
4. If clear + large → delegate
   ├─ Read: SUB_AGENT_QUICK_REFERENCE.md
   ├─ Pick: Sub-agent
   ├─ Read: Specialization doc (CLAUDE_SUB or GEMINI_SUB)
   └─ Spawn: With clear requirements
5. If unclear → discuss with sub-agent first
   └─ Sub-agent asks clarifying questions before starting
```

### Workflow 2: "I'm Deep in Implementation, Now Need X"

```
1. Evaluate: Is X high-context / specialized?
2. If YES:
   ├─ Write down current state (for sub-agent)
   ├─ Pause current work
   ├─ Spawn: Sub-agent for X
   └─ Resume work while sub-agent works (if possible)
3. If NO:
   └─ Continue current work
```

### Workflow 3: "Sub-Agent Just Returned Work"

```
1. Open PR from sub-agent
2. Check: Against relevant checklist
   ├─ SUB_AGENT_SYSTEM.md → "Reviewing Sub-Agent Work"
   ├─ CLAUDE_SUB or GEMINI_SUB → [Specialization] → Checklist
3. Run tests: `npm run test:all`
4. Review: Code quality, test coverage, docs
5. If good:
   ├─ Approve PR
   ├─ Merge
   └─ Deploy (if ready)
6. If issues:
   ├─ Comment with feedback
   ├─ Sub-agent updates
   └─ Back to step 1
```

---

## Pro Tips

### Tip 1: Batch Your Delegations

If you have 3 parallel tasks, spawn all 3 sub-agents at once to maximize parallelization.

```
Time:
- Sequential: Task1 (3h) → Task2 (2h) → Task3 (3h) = 8h total
- Parallel:   Task1 (3h) + Task2 (2h) + Task3 (3h) = 3h total (if sub-agents available)
```

### Tip 2: Prepare Context Carefully

The better your handoff context, the faster the sub-agent finishes:

```
Vague handoff: "Build checkout"
├─ Sub-agent spends 30 min clarifying requirements
├─ Implementation time: 2h
└─ Total: 2.5h

Clear handoff: "Build checkout with [full spec]"
├─ Sub-agent spends 0 min clarifying
├─ Implementation time: 1.5h
└─ Total: 1.5h

Savings: 1 hour per clear handoff!
```

### Tip 3: Reference Existing Code

Point sub-agent to similar existing code:

```
"See app/components/contact/ for form pattern
 See app/api/contact/route.ts for email integration
 Use same patterns for [new feature]"
```

This saves time vs. explaining patterns from scratch.

### Tip 4: Security Review First for High-Risk

Always route through CLAUDE_SUB_SECURITY first:

```
Payment flow:
1. CLAUDE_SUB_SECURITY (audit) → checklist
2. CLAUDE_SUB_COMMERCE (implement with checklist) → code
3. You review both → deploy
```

Prevents security issues from shipping.

### Tip 5: Use Parallel Gemini + Claude

If task has clear separation (UI vs. API), use both:

```
"CLAUDE_SUB_FULLSTACK: Build API + database
 GEMINI_SUB_FRONTEND: Build components + forms
 Both work simultaneously
 Integrate when both done"
```

---

## Troubleshooting Quick Links

| Problem | Solution |
|---------|----------|
| Sub-agent didn't understand requirements | Update handoff with more detail, re-spawn |
| Sub-agent code doesn't match project style | Check AGENTS.md conventions, comment feedback |
| Sub-agent tests failing | Sub-agent updates code, you re-review |
| Sub-agent took too long | Complex task, expected. Review quality anyway |
| Integration problems between two sub-agents | You coordinate fix, merge carefully |
| Don't know which sub-agent to use | Check SUB_AGENT_QUICK_REFERENCE.md matrix |
| Sub-agent asks clarifying questions | Answer in comments, continue work |

---

*This system is designed to grow with your project. As you use it more, refine the decision matrix and specialization docs based on what works best.*

© The Notebook Café LLC — All rights reserved
