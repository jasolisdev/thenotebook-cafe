# GEMINI_SUB.md

**Gemini Sub-Agent Specializations for The Notebook Café**

> **Parent Document:** See [AGENTS.md](../../AGENTS.md) and [SUB_AGENT_SYSTEM.md](./SUB_AGENT_SYSTEM.md) for delegation protocol and core project documentation.

This file defines Gemini's specialized sub-agent configurations for handling high-context tasks in parallel with Claude sub-agents, enabling efficient multi-AI workflows.

---

## Quick Reference

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 + Custom CSS
- **Testing:** Vitest + Playwright
- **Approach:** Clear structured responses, detailed examples, strong documentation emphasis
- **Note:** If a task does not involve a database, skip DB-related deliverables and checklist items.

---

## Sub-Agent Specializations

### GEMINI_SUB_FULLSTACK

**Model:** `gemini-2.0-pro` (for complex end-to-end features)

**Activation Triggers:**
- Major new feature (admin dashboard, user profiles, complex workflows)
- Data storage schema changes (if applicable)
- Real-time feature implementation
- Multi-page user flows
- Authentication/authorization system updates

**When to Use vs. CLAUDE_SUB_FULLSTACK:**
- **Gemini preferred:** Feature has clear separation between layers, detailed requirements, less ambiguity
- **Claude preferred:** Feature is complex/ambiguous, requires architectural decisions, higher security risk
- **Parallel:** Use both simultaneously for independent features

**Core Capabilities:**

1. **Clear Specification Understanding**
   - Asks clarifying questions before starting
   - Creates detailed requirements document
   - Defines API contract (request/response shapes)
   - Plans data model (if applicable)

2. **Frontend Development**
   - React component architecture
   - State management decisions
   - Form handling + validation
   - Error handling + loading states

3. **Backend Development**
   - Data schema design (if applicable)
   - API endpoint implementation
   - Business logic organization
   - Error handling + validation

4. **Testing Strategy**
   - Unit test coverage planning
   - Integration test scenarios
   - E2E test user flows
   - Edge case identification

5. **Documentation Excellence**
   - Architecture diagrams (ASCII/Mermaid)
   - API documentation with examples
   - Data storage documentation (if applicable)
   - Setup/deployment instructions

**Deliverables Template:**

```
## Feature Implementation Package

### Documentation First
docs/[FEATURE]/
├── ARCHITECTURE.md
│   ├── System diagram (ASCII)
│   ├── Data flow explanation
│   ├── Component hierarchy
│   └── Decision rationale
├── API_SPECIFICATION.md
│   ├── Endpoint list + methods
│   ├── Request/response examples
│   ├── Error codes + messages
│   └── Rate limiting details
├── DATA_STORAGE.md
│   ├── Table definitions (if applicable)
│   ├── Relationships diagram (if applicable)
│   ├── Indexing strategy (if applicable)
│   └── Migration script (if applicable)
├── IMPLEMENTATION_GUIDE.md
│   ├── Step-by-step setup
│   ├── Environment variables
│   ├── Data storage initialization (if applicable)
│   └── Testing instructions
└── DEPLOYMENT.md
    ├── Pre-deployment checklist
    ├── Migration steps (if applicable)
    ├── Rollback plan
    └── Monitoring setup

### Implementation Code
app/
├── components/[feature]/
│   ├── [Component1].tsx      (with JSDoc comments)
│   ├── [Component2].tsx
│   └── README.md             (component usage guide)
├── api/[feature]/
│   ├── route.ts              (with endpoint docs)
│   ├── [id]/route.ts
│   └── README.md             (API guide)
└── lib/server/
    └── [feature].ts          (with clear comments)

### Tests
tests/
├── unit/[feature].test.ts
│   └── Clear test descriptions + comments
├── integration/[feature].test.ts
│   └── User flow testing
└── e2e/[feature].spec.ts
    └── Complete workflows

### PR + Summary
PR: [linked-fullstack-pr]
└── Summary of:
    - What was built
    - How it works (high-level)
    - Testing coverage
    - Known limitations
    - Deployment instructions
```

**Fullstack Checklist:**

- [ ] Requirements fully understood + documented
- [ ] API contract defined before coding
- [ ] Data storage schema designed + migrated (if applicable)
- [ ] All API endpoints implemented + tested
- [ ] React components follow project patterns
- [ ] Server components fetch data efficiently
- [ ] Client components handle loading/error states
- [ ] Form validation on client + server
- [ ] Input sanitization + CSRF protection
- [ ] Authentication/authorization enforced
- [ ] Error messages user-friendly (don't expose system details)
- [ ] Logging implemented for debugging
- [ ] Unit test coverage > 80%
- [ ] Integration tests cover main flows
- [ ] E2E tests verify complete workflows
- [ ] Documentation comprehensive
- [ ] Performance acceptable (no N+1 queries, etc.)
- [ ] Ready for production

**Gemini's Strength:** Excellent at writing clear requirements-first documentation, detailed API specs, and comprehensive test scenarios.

**Example Invocation:**

```
Build a user profile management system.

Requirements:
- Users can view/edit their profile (name, email, avatar, bio)
- Users can change password
- Users can manage notification preferences
- Admins can view all user profiles (read-only)
- Profile changes are audited

Stack:
- Database: PostgreSQL (if applicable; we'll provide schema hints)
- API: Next.js API routes (RESTful)
- Frontend: React with forms
- Testing: Full coverage expected

Deliverables needed:
1. Complete architecture document
2. API specification with examples
3. Data storage schema + migrations (if applicable)
4. Implementation (components + API routes)
5. Full test suite (unit + integration + E2E)
6. Setup guide for other developers
```

---

### GEMINI_SUB_FRONTEND

**Model:** `gemini-2.0-flash` (fast, efficient for UI-focused work)

**Activation Triggers:**
- New component library or design system work
- Accessibility audit + implementation
- Complex UI state management
- Responsive design challenges
- Animation/microinteraction implementation
- Design system documentation

**Core Capabilities:**

1. **Component Architecture**
   - Clear component hierarchy
   - Props interface design
   - Composition patterns
   - Reusability strategy

2. **Accessibility (a11y)**
   - WCAG 2.1 compliance audit
   - Screen reader testing
   - Keyboard navigation
   - Color contrast verification
   - ARIA attributes

3. **Responsive Design**
   - Mobile-first approach
   - Breakpoint strategy
   - Touch targets verification
   - Orientation handling

4. **State Management**
   - Context API patterns
   - Component state vs. global state
   - Prop drilling solutions
   - Performance optimization

5. **Design System Documentation**
   - Component library guide
   - Usage examples
   - Do's and don'ts
   - Theming/customization

**Deliverables Template:**

```
## Frontend Implementation Package

### Design System Documentation
docs/DESIGN_SYSTEM.md
├── Philosophy & principles
├── Component inventory
│   ├── Atoms (Button, Input, etc.)
│   ├── Molecules (Form, Card, etc.)
│   └── Organisms (Header, Footer, etc.)
├── Color palette with usage
├── Typography guidelines
├── Spacing/rhythm system
├── Animation guidelines
└── Accessibility standards (WCAG 2.1)

### Component Code
app/components/[category]/
├── [Component].tsx
│   └── Clear JSDoc + props documentation
├── [Component].module.css (scoped styles)
└── README.md (usage guide with examples)

### Accessibility Audit
docs/ACCESSIBILITY_AUDIT.md
├── Current WCAG compliance level
├── Issues found (by severity)
├── Fixes implemented
├── Testing results
│   ├── Keyboard navigation
│   ├── Screen reader (NVDA/JAWS)
│   └── Color contrast
└── Ongoing monitoring

### Tests
tests/
├── unit/components.test.tsx
│   └── Rendering, props, state
├── accessibility.test.tsx
│   └── a11y-specific assertions
└── responsive.test.tsx
    └── Breakpoint behavior

### Storybook/Documentation
.storybook/
└── Component stories + examples
```

**Frontend Checklist:**

- [ ] Components well-organized by category
- [ ] Props interfaces clearly defined
- [ ] JSDoc comments on all components
- [ ] All interactive elements keyboard-accessible
- [ ] Color contrast passes WCAG AA standard
- [ ] ARIA labels/roles used correctly
- [ ] Focus indicators visible + styled
- [ ] Touch targets >= 44x44px
- [ ] Images have alt text
- [ ] Forms labeled correctly
- [ ] Error messages accessible
- [ ] Loading states announced to screen readers
- [ ] Responsive at all breakpoints
- [ ] Mobile layout testable
- [ ] Touch gestures work on mobile
- [ ] No layout shift on interactive elements
- [ ] Performance: component render < 1s
- [ ] Test coverage > 80%
- [ ] Documentation complete

**Gemini's Strength:** Detailed component documentation, clear accessibility guidelines, excellent at explaining design decisions with visual examples.

**Example Invocation:**

```
Build an accessible form component library:

Components needed:
- TextInput (with validation, error states)
- Select (dropdown)
- Checkbox
- RadioButton
- FormGroup (wrapper for form organization)
- FormError (error message display)

Accessibility requirements:
- Full keyboard navigation
- Screen reader support (NVDA + JAWS)
- WCAG 2.1 AA compliant
- High contrast option support
- Large text support (up to 200%)

Styling:
- Use existing Tailwind tokens from globals.css
- Support light + dark mode
- Responsive (mobile-first)
- Match cafe aesthetic

Deliverables:
1. All components with props docs
2. Accessibility audit + test results
3. Storybook stories with examples
4. Usage guide for developers
5. Design system documentation
```

---

### GEMINI_SUB_DOCUMENTATION

**Model:** `gemini-2.0-flash` (excellent at clear, structured writing)

**Activation Triggers:**
- Complex feature requires comprehensive documentation
- Architecture redesign documentation
- API documentation generation
- Setup/onboarding guide creation
- Technical specification writing

**Core Capabilities:**

1. **Technical Writing**
   - Clear, structured prose
   - Appropriate technical depth
   - Example code (where helpful)
   - Troubleshooting sections

2. **Architecture Documentation**
   - System diagrams (ASCII art / Mermaid)
   - Data flow explanations
   - Decision rationale
   - Trade-offs discussion

3. **API Documentation**
   - Endpoint specifications
   - Request/response examples
   - Error code explanations
   - Rate limiting details
   - Authentication flow

4. **Setup Guides**
   - Step-by-step instructions
   - Environment setup
   - Troubleshooting common issues
   - Quick-start examples

5. **Diagram Generation**
   - Mermaid diagrams (entity relationships, flows)
   - ASCII art for text-based docs
   - Call sequence diagrams
   - Architecture diagrams

**Deliverables Template:**

```
docs/[FEATURE]/
├── OVERVIEW.md
│   ├── What this feature does
│   ├── Use cases
│   └── Key concepts
├── ARCHITECTURE.md
│   ├── System diagram (Mermaid)
│   ├── Component/layer description
│   ├── Data flow explanation
│   └── Design decisions + rationale
├── DETAILED_GUIDE.md
│   ├── How to use feature (step-by-step)
│   ├── Code examples
│   ├── Common patterns
│   └── Best practices
├── API_REFERENCE.md
│   ├── All endpoints listed
│   ├── Detailed method docs
│   ├── Request/response examples
│   ├── Error codes + meanings
│   └── Rate limits
├── TROUBLESHOOTING.md
│   ├── Common issues
│   ├── Debugging steps
│   ├── FAQ
│   └── When to ask for help
├── DEPLOYMENT.md
│   ├── Pre-deployment checklist
│   ├── Deployment steps
│   ├── Verification steps
│   └── Rollback procedure
└── README.md (index of all docs above)
```

**Documentation Checklist:**

- [ ] Overview explains what feature does + why
- [ ] Architecture clear (diagram + text)
- [ ] All technical terms defined
- [ ] Code examples provided (where helpful)
- [ ] Common use cases covered
- [ ] Setup/installation documented
- [ ] Troubleshooting section included
- [ ] FAQ answers common questions
- [ ] API fully documented (if applicable)
- [ ] Diagrams are clear + accurate
- [ ] No outdated information
- [ ] Links to related docs included
- [ ] Markdown formatting correct
- [ ] Grammar + spelling checked

**Gemini's Strength:** Excellent at writing clear, well-structured documentation with great examples and easy-to-follow guides.

**Example Invocation:**

```
Write comprehensive docs for the email system.

Current system:
- Uses Resend API
- Templates: order confirmation, newsletter, password reset
- Webhooks for bounce/complaint handling
- Unsubscribe management

Docs needed:
1. Architecture overview (how email flows)
2. Template management guide
3. API reference (email sending endpoints)
4. Webhook handling documentation
5. Deliverability setup guide (SPF/DKIM)
6. Troubleshooting guide
7. Monitoring/metrics documentation

Include:
- Diagrams (data flow, architecture)
- Code examples
- Common issues + solutions
- Setup steps
```

---

### GEMINI_SUB_TESTING

**Model:** `gemini-2.0-flash` (clear test scenarios)

**Activation Triggers:**
- Test coverage too low (< 60%)
- Need comprehensive test suite for new feature
- Test refactoring/cleanup needed
- E2E test strategy planning
- Test documentation insufficient

**Core Capabilities:**

1. **Test Planning**
   - Identify all test scenarios
   - Prioritize test cases
   - Coverage targets
   - Test environment setup

2. **Unit Testing**
   - Component testing
   - Function/utility testing
   - Mock strategy
   - Assertion best practices

3. **Integration Testing**
   - Component + hook interaction
   - API + data storage testing (if applicable)
   - Service integration testing
   - Data transaction testing (if applicable)

4. **E2E Testing**
   - Complete user workflows
   - Cross-browser testing
   - Mobile testing
   - Performance testing

5. **Test Documentation**
   - Test plan documentation
   - Test case descriptions
   - Coverage reports
   - Test environment guide

**Deliverables Template:**

```
docs/TEST_PLAN_[FEATURE].md
├── Test strategy overview
├── Test scenarios (by feature/component)
├── Coverage targets
└── Success criteria

tests/
├── unit/[feature].test.ts
│   └── Clear test descriptions + setup
├── integration/[feature].test.ts
│   └── Multi-component/service testing
└── e2e/[feature].spec.ts
    └── Complete user workflows

docs/TEST_COVERAGE.md
├── Current coverage by module
├── Gaps + plan to address
└── Monitoring approach

PR: [linked-testing-pr]
└── Summary of:
    - Coverage improvement (X% → Y%)
    - New test scenarios added
    - Refactoring done
    - Known test gaps
```

**Testing Checklist:**

- [ ] Test plan documented
- [ ] Unit test coverage > 80%
- [ ] Integration tests cover interactions
- [ ] E2E tests cover main user flows
- [ ] Edge cases identified + tested
- [ ] Error scenarios tested
- [ ] Performance baselines established
- [ ] Tests are maintainable (clear descriptions)
- [ ] No brittle/flaky tests
- [ ] Test utilities extracted (DRY)
- [ ] Mocks are appropriate
- [ ] Async operations handled correctly
- [ ] Cleanup after tests
- [ ] CI passes consistently
- [ ] Coverage report tracked

**Gemini's Strength:** Clear test descriptions, well-organized test suites, excellent at identifying edge cases and writing comprehensive test plans.

**Example Invocation:**

```
Write comprehensive tests for the cart system.

Existing code:
- CartProvider context
- CartDrawer component
- localStorage persistence
- API integration for checkout

Need:
1. Test plan documenting all scenarios
2. Unit tests for CartProvider logic
3. Component tests for CartDrawer
4. Integration tests (provider + components)
5. E2E tests for complete cart flow
6. localStorage edge cases

Coverage target: 85%+

Include:
- Edge case identification
- Mock setup guide
- Async testing patterns
- Error scenario testing
```

---

## Sub-Agent Activation Protocol

### When to Spawn Gemini Sub-Agents

**Gemini works well for:**
- Feature work with clear, well-defined requirements
- Documentation-heavy tasks
- Frontend-focused features (UI, a11y, responsive design)
- Parallel work to Claude sub-agents

**Decision Tree:**

```
Task: Build feature with clear requirements?
├─ YES + Frontend-heavy → GEMINI_SUB_FRONTEND
├─ YES + Full feature + needs clear docs → GEMINI_SUB_FULLSTACK
├─ YES + Documentation focus → GEMINI_SUB_DOCUMENTATION
├─ YES + Test coverage needed → GEMINI_SUB_TESTING
└─ NO (ambiguous/complex/security) → CLAUDE_SUB_[SPECIALIZATION]
```

### Handoff Template

**To Copy/Paste When Spawning Gemini Sub-Agent:**

```markdown
# Sub-Agent Handoff: [Task Name]

**Sub-Agent Type:** GEMINI_SUB_[SPECIALIZATION]
**Model:** [gemini-2.0-pro | gemini-2.0-flash]
**Priority:** [P0/P1/P2]
**Deadline:** [Date/Time if time-sensitive]

## Task Summary

[Clear 2-3 sentence description with requirements]

## Requirements Specification

### Functional Requirements
- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

### Non-Functional Requirements
- [ ] Performance targets
- [ ] Accessibility standards
- [ ] Testing coverage targets

## Context Package

### Project State
- Branch: [main/develop]
- Last commit: [hash] - [message]
- Any dependencies to know about: [list if relevant]

### Reference Materials
- [Design doc if exists]
- [API spec if exists]
- [Related PRs for context]

## Acceptance Criteria

Clear checklist of what "done" means:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] All tests passing
- [ ] Code reviewed + approved quality

## Deliverables Expected

### Primary
- [ ] Feature implementation
- [ ] Documentation (type: code comments / separate docs)
- [ ] Tests (unit + integration + E2E)

### Secondary
- [ ] Deployment guide (if applicable)
- [ ] Architecture diagram (if complex)
- [ ] Troubleshooting guide (if needed)

## Success Definition

Specific, measurable success criteria:
- Test coverage: X% → Y%
- Lighthouse score: X → Y
- Documentation completeness: [specific sections]
- User flow works end-to-end: [list flows]

## Return Protocol

1. Create branch: `gemini/[feature]-xxxxx`
2. Organize work logically
3. Push commits with clear messages
4. Open PR with:
   - Summary of implementation
   - Key decisions made
   - Test coverage details
   - Documentation links
5. Notify primary when ready

---

**Primary Agent:** [Name]
**Date Assigned:** [ISO date]
**Expected Return:** [ISO date + time]
```

---

## Parallel Execution with Claude

### When Both Run Simultaneously

**Example Scenario:** Building checkout system

```
Primary Agent (Claude):
├─ Task 1: Payment gateway integration (high-security)
│   └─ Spawn: CLAUDE_SUB_SECURITY (audit)
│   └─ Then: CLAUDE_SUB_COMMERCE (implementation)
│
└─ Task 2: UI + Testing (parallel)
    └─ Spawn: GEMINI_SUB_FRONTEND (components)
    └─ Spawn: GEMINI_SUB_TESTING (test suite)

Timeline:
- Claude security review: 1 hour
- Claude payment implementation: 2 hours
- Gemini UI: 1.5 hours (parallel with Claude)
- Gemini tests: 1.5 hours (parallel with Claude)
- Integration: 1 hour
Total: ~4 hours instead of ~6 hours sequentially
```

### Coordination Points

**Before Spawning:**

```
Primary Agent:
1. Define API contracts clearly
2. Document data models
3. List security requirements
4. Establish success criteria
5. Notify both sub-agents they're running in parallel
```

**During Execution:**

```
Sub-agents should:
1. Work on their domains independently
2. Reference API contracts for integration points
3. Assume the other sub-agent is building the complementary part
4. Plan for integration testing
```

**Integration:**

```
Primary Agent:
1. Review both deliverables
2. Check API compatibility (requests match expectations)
3. Run integration tests
4. Merge both PRs carefully
5. Full system test
6. Deploy together
```

---

## Gemini-Specific Best Practices

### Documentation First

Before coding, Gemini should outline:
1. Requirements understanding
2. Data model / API contract
3. Implementation plan
4. Test strategy

### Clear Code Organization

- Use meaningful variable/function names
- Add JSDoc comments on public APIs
- Group related code logically
- Extract utilities early

### Test Descriptions

Write descriptive test names:
```typescript
// Good
it('adds product to cart and updates total price', () => {})
it('prevents duplicate products and increments quantity instead', () => {})

// Avoid
it('adds to cart', () => {})
it('test 1', () => {})
```

### Documentation Quality

- Include code examples that actually work
- Add "common mistakes" section
- Provide troubleshooting for common issues
- Keep docs near the code they describe

---

## Integration with Claude Sub-Agents

**Gemini + Claude Work Together:**

| Task Type | Gemini Role | Claude Role |
|-----------|-----------|----------|
| E2E Feature | UI + documentation | Security + API |
| Testing | Test planning + organization | Edge cases + security tests |
| Documentation | Clear guides + examples | Architecture + decisions |
| Performance | Frontend optimization | Data storage + API tuning |

**Example Team Dynamics:**

```
Feature: Admin Analytics Dashboard

Claude's Work:
- Data storage schema for analytics data (if applicable)
- API endpoints (secure, paginated, cached)
- Aggregation queries + performance
- Security audit + rate limiting

Gemini's Work:
- React components for charts/tables
- Form for date range/filters
- Responsive dashboard layout
- Accessibility (a11y) audit
- Component documentation
- E2E tests for user flows

Integration:
- Gemini's filters send requests to Claude's API
- Claude's API returns data Gemini visualizes
- Both test full flow together
- Gemini documents how to use dashboard
- Claude documents API endpoints
```

---

## Troubleshooting Gemini Sub-Agent Work

**Problem:** Misunderstood requirements

**Solution:**
```
1. Gemini asks clarifying questions in PR comments
2. Primary agent responds with examples
3. Gemini updates approach if needed
4. Continue or restart if major change
```

**Problem:** Integration incompatibility with Claude work

**Solution:**
```
1. Compare expected API contracts
2. Identify mismatch (request format, response shape, etc.)
3. Decide: modify Gemini's work, Claude's work, or both
4. Coordinate fix
5. Merge after sync
```

**Problem:** Test failures

**Solution:**
```
1. Gemini identifies failing test + reason
2. Determines root cause:
   - Implementation bug → fix code
   - Test too strict → adjust expectations
   - Missing feature → coordinate with Claude
3. Fix + re-run
4. Report results to primary agent
```

---

*This document evolves as Gemini sub-agents take on different types of work. Update based on actual experience with task types.*

© The Notebook Café LLC — All rights reserved
