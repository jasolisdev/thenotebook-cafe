# SUB-AGENT QUICK REFERENCE

**Fast guide to spawning sub-agents for high-context tasks**

> For full details, see [AGENTS.md](../../AGENTS.md), [SUB_AGENT_SYSTEM.md](./SUB_AGENT_SYSTEM.md), [CLAUDE_SUB.md](./CLAUDE_SUB.md), and [GEMINI_SUB.md](./GEMINI_SUB.md)

---

## TL;DR: When to Delegate

**Delegate when:**
- Task is complex (> 50k tokens estimated)
- Needs specialized expertise (security, commerce, fullstack)
- Takes > 2 hours to implement
- Better handled by specialized agent

**Don't delegate:**
- Simple bug fixes
- Small feature additions
- Quick refactors
- Documentation updates (< 30 min)

---

## Decision Matrix (1 Minute)

```
What are you building?

Security/Auth/Payment?
└─ CLAUDE_SUB_SECURITY (review first)
   └─ Then CLAUDE_SUB_COMMERCE (if payment)

E-commerce features?
├─ Cart/checkout/payment → CLAUDE_SUB_COMMERCE
└─ Clear requirements, full feature → GEMINI_SUB_FULLSTACK (parallel)

Full feature (frontend + backend)?
├─ Complex/ambiguous → CLAUDE_SUB_FULLSTACK
└─ Clear requirements → GEMINI_SUB_FULLSTACK

UI/Component work?
├─ Design system/a11y → GEMINI_SUB_FRONTEND
├─ Complex interactions → GEMINI_SUB_FRONTEND
└─ Components + docs → GEMINI_SUB_FRONTEND

Performance issues?
└─ CLAUDE_SUB_PERFORMANCE

Email/templates?
└─ CLAUDE_SUB_EMAIL

Need tests written?
├─ Clear requirements → GEMINI_SUB_TESTING
└─ Complex edge cases → CLAUDE_SUB_FULLSTACK

Need docs written?
└─ GEMINI_SUB_DOCUMENTATION

Not sure?
└─ CLAUDE_SUB_FULLSTACK (catches most cases)
```

---

## Quick Spawn (5 Minutes)

### Step 1: Prepare Context

Gather:
- [ ] Task description (2-3 sentences, clear goals)
- [ ] File locations / relevant docs
- [ ] Acceptance criteria (clear checklist)
- [ ] Timeline (deadline if applicable)
- [ ] Any constraints (security, performance, testing)

### Step 2: Choose Sub-Agent

From decision matrix above.

### Step 3: Copy Handoff Template

**For Claude:**
```markdown
# Sub-Agent Handoff: [Task Name]

**Sub-Agent Type:** CLAUDE_SUB_[TYPE]
**Model:** [opus-4 for complex | sonnet-4.5 for standard]
**Priority:** P0/P1/P2
**Deadline:** [if urgent]

## Task Summary
[What needs to be done in 2-3 sentences]

## Requirements
- [ ] Requirement 1
- [ ] Requirement 2

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Tests passing

## Deliverables
- [ ] Code at [location]
- [ ] Tests
- [ ] Documentation

## Context
- Recent changes: [list if relevant]
- Key files: [list]
```

**For Gemini:**
```markdown
# Sub-Agent Handoff: [Task Name]

**Sub-Agent Type:** GEMINI_SUB_[TYPE]
**Model:** [pro for complex | flash for UI/simple]
**Priority:** P0/P1/P2
**Deadline:** [if urgent]

## Requirements (Be Specific)
- [ ] Feature 1
- [ ] Feature 2
- [ ] Acceptance criteria

## Success Definition
What does "done" look like?
- User can do X
- Code coverage: Y%
- Documentation: complete

## Deliverables
- [ ] Implementation
- [ ] Tests
- [ ] Documentation

## Context
- Current code location: [if modifying existing]
- Design/requirements doc: [link if exists]
```

### Step 4: Send Handoff

Share the handoff message with sub-agent.

### Step 5: Wait for Delivery

Sub-agent returns with:
- Code PR (feature branch)
- Tests (passing)
- Documentation
- Ready to merge

---

## Sub-Agent Specializations at a Glance

### CLAUDE SUB-AGENTS

| Agent | Best For | Time | Model | Complexity |
|-------|----------|------|-------|-----------|
| **SECURITY** | Security audits, auth, payments | 1-2h | Opus | ⭐⭐⭐⭐⭐ |
| **COMMERCE** | Cart, checkout, orders | 2-4h | Sonnet | ⭐⭐⭐⭐ |
| **FULLSTACK** | Complete features (frontend+backend) | 3-6h | Opus | ⭐⭐⭐⭐⭐ |
| **PERFORMANCE** | Optimization, Lighthouse, CWV | 1-3h | Sonnet | ⭐⭐⭐ |
| **EMAIL** | Email templates, delivery | 1-2h | Sonnet | ⭐⭐⭐ |

### GEMINI SUB-AGENTS

| Agent | Best For | Time | Model | Complexity |
|-------|----------|------|-------|-----------|
| **FULLSTACK** | Clear features (frontend+backend) | 2-4h | Pro | ⭐⭐⭐⭐ |
| **FRONTEND** | Components, a11y, design system | 1-3h | Flash | ⭐⭐⭐ |
| **DOCUMENTATION** | Guides, architecture, setup docs | 1-2h | Flash | ⭐⭐ |
| **TESTING** | Test plans, test suites, coverage | 1-3h | Flash | ⭐⭐⭐ |

---

## Common Patterns

### Pattern 1: Payment System (Security-First)

```
Primary Agent identifies payment integration needed

↓

Spawn CLAUDE_SUB_SECURITY
├─ Audit payment flow
├─ Check PCI-DSS requirements
├─ Review API key handling
└─ Return: security checklist

↓ (after approval)

Spawn CLAUDE_SUB_COMMERCE
├─ Implement payment handling
├─ Handle webhooks
├─ Test edge cases
└─ Return: complete payment system

↓

Primary integrates + deploys
```

### Pattern 2: Admin Dashboard (Parallel)

```
Primary identifies admin dashboard needed

↓ (Parallel)

Spawn CLAUDE_SUB_FULLSTACK          Spawn GEMINI_SUB_FRONTEND
├─ API endpoints                    ├─ Dashboard components
├─ Database schema                  ├─ Forms + filters
├─ Queries + aggregations           ├─ Responsive layout
└─ Security review                  └─ a11y audit

↓ (Both done)

Spawn GEMINI_SUB_TESTING
├─ Integration tests
├─ E2E workflows
└─ Test documentation

↓

Primary integrates all + deploys
```

### Pattern 3: Comprehensive Docs

```
Primary identifies feature needs docs

↓

Spawn GEMINI_SUB_DOCUMENTATION
├─ Architecture overview
├─ API reference
├─ Setup guide
├─ Troubleshooting
└─ Diagrams

↓

Primary reviews + publishes
```

---

## Success Checklist

When sub-agent returns PR:

- [ ] Code follows project conventions
- [ ] All tests passing (`npm run test:all`)
- [ ] No new linting errors (`npm run lint`)
- [ ] Test coverage adequate (>80%)
- [ ] PR description clear + links to task
- [ ] No merge conflicts
- [ ] Documentation complete
- [ ] Performance acceptable
- [ ] Security implications reviewed
- [ ] Ready to merge

If any fail:
- Comment with specific feedback
- Sub-agent updates
- Re-review
- Merge when satisfied

---

## Preventing Common Issues

### Issue: Lost Context

**Prevention:**
- Document recent decisions in handoff
- Link to relevant PRs/issues
- Provide file locations explicitly
- Include "why" for constraints

### Issue: Scope Creep

**Prevention:**
- List must-haves + nice-to-haves separately
- Define "done" clearly
- Set time expectations
- Sub-agent asks before expanding scope

### Issue: Integration Failures

**Prevention:**
- If two sub-agents working in parallel:
  - Define API contracts first
  - Have them test integration before final PR
  - Primary coordinates any mismatches

### Issue: Quality Concerns

**Prevention:**
- Set test coverage expectations upfront
- Specify documentation requirements
- Request security review if applicable
- Code review checklist provided

---

## Quick Commands

### Check if sub-agent should be used

```bash
# If task requires significant context from docs:
wc -l docs/*.md | tail -1    # How much doc context?

# If task is complex:
npm run test:all             # Current baseline
git log --oneline -10        # Recent changes

# Decision: > 50k token context likely = needs sub-agent
```

### After sub-agent returns

```bash
# Review code
git diff claude/[feature]

# Run tests
npm run test:all

# Check coverage
npm run test:coverage

# Lint
npm run lint

# Build
npm run build

# If all pass → merge + deploy
```

---

## Examples

### Example 1: Spawn for Cart Refactor

```
## Sub-Agent Handoff: Cart System Refactor

**Sub-Agent Type:** CLAUDE_SUB_COMMERCE
**Model:** claude-sonnet-4.5
**Priority:** P1
**Deadline:** Friday EOD

## Task Summary

Refactor cart system to:
1. Move from localStorage-only to localStorage + server sync
2. Add quantity controls to cart drawer
3. Implement "save for later" wishlist feature

## Requirements

- [ ] Cart data syncs with server on changes
- [ ] Quantity controls in cart drawer
- [ ] Wishlist feature (add/remove/purchase)
- [ ] Persistence across browser restart

## Acceptance Criteria

- [ ] All existing cart tests pass
- [ ] New tests for sync, quantity, wishlist
- [ ] No breaking changes to CartProvider API
- [ ] > 85% test coverage
- [ ] Ready for production

## Deliverables

- [ ] CartProvider.tsx (updated with sync)
- [ ] CartDrawer.tsx (with quantity controls)
- [ ] WishlistProvider.tsx (new)
- [ ] API routes for sync
- [ ] Full test suite
- [ ] PR with clear summary

Context: Existing cart at app/components/cart/
See: docs/COMMERCE_ARCHITECTURE.md
```

### Example 2: Spawn for Security Review

```
## Sub-Agent Handoff: New API Endpoint Security Review

**Sub-Agent Type:** CLAUDE_SUB_SECURITY
**Model:** claude-opus-4-20250114
**Priority:** P0 (blocking)
**Deadline:** ASAP

## Task Summary

Security audit of new `/api/orders` endpoint:
- Order creation endpoint
- Order status retrieval
- Order history for user

## Requirements

- [ ] Audit OWASP Top 10 issues
- [ ] Check authentication/authorization
- [ ] Verify input validation
- [ ] Review rate limiting
- [ ] Check for information leakage

## Acceptance Criteria

- [ ] No critical findings
- [ ] All high findings have fixes
- [ ] Security checklist signed off
- [ ] Ready for production deployment

## Deliverables

- [ ] Security audit report
- [ ] Code fixes (if issues found)
- [ ] Security test suite
- [ ] Monitoring recommendations

Files to review:
- app/api/orders/route.ts
- app/api/orders/[id]/route.ts
- app/lib/server/orders.ts
```

### Example 3: Spawn for E2E Feature

```
## Sub-Agent Handoff: User Profile Management

**Sub-Agent Type:** GEMINI_SUB_FULLSTACK
**Model:** gemini-2.0-pro
**Priority:** P1
**Deadline:** End of week

## Requirements Specification

### Functional
- [ ] Users edit profile (name, email, avatar, bio)
- [ ] Users change password
- [ ] Admins view all profiles (read-only)
- [ ] Profile changes are audited

### Non-Functional
- [ ] Performance: profile load < 500ms
- [ ] a11y: WCAG 2.1 AA compliant
- [ ] Test coverage: > 85%

## Success Definition

- Profile editing works end-to-end
- Password change secure + validated
- Admin view readonly + fast
- Audit log tracks changes
- Full test coverage
- Documentation complete

## Deliverables

1. Components (profile form, admin view)
2. API routes (profile CRUD, password change)
3. Database schema + migrations
4. Tests (unit + integration + E2E)
5. Documentation (setup + API guide)
6. Deployment guide

Context:
- Database: PostgreSQL
- Auth: [your auth system]
- See: docs/USER_MANAGEMENT.md (if exists)
```

---

## Questions?

Refer to full docs:
- **[AGENTS.md](../../AGENTS.md)** - Project conventions and core patterns
- **[SUB_AGENT_SYSTEM.md](./SUB_AGENT_SYSTEM.md)** - Delegation workflow and review checklist
- **[CLAUDE_SUB.md](./CLAUDE_SUB.md)** - Claude specializations
- **[GEMINI_SUB.md](./GEMINI_SUB.md)** - Gemini specializations

---

© The Notebook Café LLC — All rights reserved
