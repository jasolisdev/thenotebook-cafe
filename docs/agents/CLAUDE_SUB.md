# CLAUDE_SUB.md

**Claude Sub-Agent Specializations for The Notebook Café**

> **Parent Document:** See [AGENTS.md](../../AGENTS.md) and [SUB_AGENT_SYSTEM.md](./SUB_AGENT_SYSTEM.md) for delegation protocol and core project documentation.

This file defines Claude's specialized sub-agent configurations for handling high-context tasks that exceed optimal token usage or require specific expertise domains.

---

## Quick Reference

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 + Custom CSS
- **Testing:** Vitest + Playwright
- **Approach:** Deep expertise in task domain, aggressive optimization, detailed testing
- **Note:** If a task does not involve a database, skip DB-related deliverables and checklist items.

---

## Sub-Agent Specializations

### CLAUDE_SUB_SECURITY

**Model:** `claude-opus-4-20250114` (for complex threat analysis)

**Activation Triggers:**
- API endpoint security review
- Authentication/authorization system changes
- Third-party integrations (payment, analytics, OAuth)
- Security vulnerability assessment
- Compliance audit (GDPR, PCI-DSS, OWASP)

**Core Capabilities:**

1. **Vulnerability Assessment**
   - OWASP Top 10 analysis
   - Dependency vulnerability scanning
   - API endpoint security review
   - Input/output validation audit

2. **Threat Modeling**
   - Identify attack vectors
   - Risk severity assessment
   - Mitigation strategies
   - Detection/monitoring recommendations

3. **Implementation Patterns**
   - CSRF protection (existing: `app/lib/server/csrf.ts`)
   - Rate limiting (existing: `app/lib/server/rateLimit.ts`)
   - Input sanitization (existing: `app/lib/server/sanitize.ts`)
   - Secure headers (CSP, X-Frame-Options, etc.)
   - JWT/session management

4. **Compliance & Standards**
   - GDPR data handling requirements
   - PCI-DSS for payment systems
   - OWASP compliance checklist
   - Security headers best practices

**Deliverables Template:**

```
docs/SECURITY_AUDIT_[FEATURE]_[TIMESTAMP].md
├── Executive Summary
│   └── Overall risk level, 3-5 key findings
├── Detailed Findings
│   ├── Critical Issues (must fix before release)
│   ├── High Issues (should fix before release)
│   ├── Medium Issues (fix in next sprint)
│   └── Low Issues / Best practice suggestions
├── Remediation Code
│   ├── Code samples showing fixes
│   ├── Configuration changes needed
│   └── Environment variable updates
├── Test Coverage
│   ├── Security unit tests (password validation, sanitization)
│   ├── Integration tests (CSRF flows, rate limiting)
│   └── Penetration test scenarios
├── Verification Checklist
│   └── Sign-off items before production
└── Monitoring & Detection
    ├── Log alerts for suspicious activity
    ├── Metrics to track
    └── Escalation procedures

PR: [linked-security-pr]
Status: [ready-for-review | requires-follow-up]
```

**Security Checklist (Auto-Generated):**

- [ ] All POST/PUT/DELETE endpoints have CSRF protection
- [ ] Rate limiting configured per endpoint
- [ ] Input validation + sanitization applied
- [ ] XSS prevention (HTML escaping, CSP headers)
- [ ] Authentication required for sensitive operations
- [ ] Secrets not exposed in code/logs
- [ ] Error messages don't leak system details
- [ ] Dependencies scanned for vulnerabilities
- [ ] Security headers configured (CORS, CSP, etc.)
- [ ] Parameterized queries when using a database
- [ ] File uploads validated (size, type, content)
- [ ] API rate limiting prevents brute force
- [ ] Logging captures security events
- [ ] Third-party OAuth flows use PKCE/state
- [ ] Sensitive data encrypted in transit (HTTPS)

**Example Invocation:**

```
I need a security review of the new payment integration endpoint.
Already have: 
- /api/payments/initiate (POST)
- /api/payments/confirm (POST)  
- /api/payments/webhook (POST)

Using: Stripe API, webhook signing, session tokens

Can you audit for:
1. Payment data handling security
2. Webhook authenticity verification
3. PCI-DSS requirements
4. Rate limiting appropriateness
5. Error handling (don't leak payment details)
```

---

### CLAUDE_SUB_COMMERCE

**Model:** `claude-sonnet-4.5` (balanced for full-feature development)

**Activation Triggers:**
- Cart system overhaul or new features
- Checkout flow implementation
- Payment gateway integration
- Order management system
- Inventory tracking
- Shipping/tax calculation features

**Core Capabilities:**

1. **Cart State Management**
   - Context API implementation
   - localStorage persistence
   - Sync with server (optional cart restoration)
   - Cart actions (add, remove, update quantity)

2. **Checkout Flow Design**
   - Multi-step checkout (shipping, billing, payment)
   - Form validation + error handling
   - Address lookup / validation
   - Payment method selection

3. **Payment Integration**
   - Stripe / payment gateway setup
   - Secure token handling
   - Webhook processing
   - Idempotent payment processing
   - Error recovery

4. **Order Management**
   - Order creation + persistence
   - Order status tracking
   - Order history retrieval
   - Invoice generation

5. **Data Persistence**
   - Data schema design (if applicable)
   - Migration scripts (if applicable)
   - Query optimization (if applicable)
   - Audit logging

**Deliverables Template:**

```
app/
├── components/
│   ├── cart/
│   │   ├── CartProvider.tsx          # Context setup
│   │   ├── CartDrawer.tsx            # UI component
│   │   ├── CartSummary.tsx           # Summary/checkout link
│   │   └── CartItem.tsx              # Individual item
│   └── checkout/
│       ├── CheckoutForm.tsx          # Multi-step form
│       ├── ShippingStep.tsx          # Address entry
│       ├── PaymentStep.tsx           # Payment method
│       └── ReviewStep.tsx            # Order review
├── api/
│   └── commerce/
│       ├── cart.ts                   # Cart operations
│       ├── checkout.ts               # Checkout flow
│       ├── orders.ts                 # Order CRUD
│       └── payments.ts               # Payment processing
└── lib/
    └── server/
        ├── commerce.ts               # Business logic
        ├── inventory.ts              # Stock management
        └── shipping.ts               # Shipping calculation
tests/
├── unit/
│   ├── commerce.test.ts
│   └── inventory.test.ts
└── e2e/
    ├── cart-flow.spec.ts
    ├── checkout-flow.spec.ts
    └── payment-flow.spec.ts
docs/
├── COMMERCE_ARCHITECTURE.md          # System design
├── CHECKOUT_FLOW.md                  # Detailed flow
├── PAYMENT_INTEGRATION.md            # Payment setup
└── DATA_STORAGE.md                   # Data storage (if applicable)

PR: [linked-commerce-pr]
Status: [ready-for-review | requires-follow-up]
```

**Commerce Checklist:**

- [ ] Cart persists across browser sessions
- [ ] Cart updates reflect in all open tabs
- [ ] Add/remove/update quantity works correctly
- [ ] Out-of-stock items handled gracefully
- [ ] Checkout form validates all required fields
- [ ] Shipping address lookup working
- [ ] Tax calculation correct for location
- [ ] Coupon/discount application tested
- [ ] Payment processing is idempotent
- [ ] Webhook processing handles duplicates
- [ ] Failed payments rollback gracefully
- [ ] Order confirmation email sent
- [ ] Order history accessible to user
- [ ] Admin can view all orders
- [ ] Inventory decrements on successful payment
- [ ] Test coverage > 80% (unit + integration)
- [ ] E2E test covers complete checkout
- [ ] Performance: checkout < 2s to submit

**Example Invocation:**

```
Build a complete checkout system with:
- Existing cart from CartProvider
- Stripe payment integration
- US shipping address validation
- Simple tax calculation (CA-only for now)
- Order creation + storage
- Confirmation email via Resend

Need:
1. React components for checkout UI
2. API routes for order/payment processing
3. Stripe webhook handling
4. Full test coverage (unit + E2E)
5. Data storage schema for orders (if applicable)

Constraints:
- Use existing design tokens (Tailwind)
- CSRF + rate limiting on all POST
- Follow project security patterns
- No external checkout embeds (custom form)
```

---

### CLAUDE_SUB_FULLSTACK

**Model:** `claude-opus-4-20250114` (complex multi-layer features)

**Activation Triggers:**
- Major feature spanning frontend + backend + data storage
- Real-time features (WebSocket, Server-Sent Events)
- Admin dashboard/CMS-like functionality
- Complex data relationships
- Migration from old system to new

**Core Capabilities:**

1. **Data Architecture**
   - Schema design + normalization (if applicable)
   - Relationship modeling (if applicable)
   - Indexing strategy (if applicable)
   - Migration scripting (if applicable)

2. **API Design**
   - RESTful endpoint design
   - Data serialization/validation
   - Error handling
   - Documentation

3. **React Components**
   - Server components for data fetching
   - Client components for interactivity
   - State management (Context, Suspense)
   - Error boundaries

4. **Real-Time Features**
   - WebSocket setup + handlers
   - Server-Sent Events
   - Client-side subscriptions
   - Reconnection logic

5. **Authentication & Authorization**
   - Session management
   - Role-based access control
   - Permission checks
   - Audit logging

6. **Performance & Scaling**
   - Caching strategy (Redis, HTTP cache)
   - Data/query optimization (if applicable)
   - Code splitting
   - Bundle optimization

**Deliverables Template:**

```
[Complete Feature Implementation]
├── app/
│   ├── components/[feature]/
│   │   ├── [FeatureName].tsx
│   │   ├── [SubFeature].tsx
│   │   └── ... (all components)
│   ├── api/[feature]/
│   │   ├── route.ts
│   │   ├── [id]/route.ts
│   │   └── ... (all endpoints)
│   ├── lib/server/
│   │   └── [feature].ts            # Business logic
│   ├── types/
│   │   └── [feature].ts            # TypeScript types
│   └── (pages if new routes)
├── tests/
│   ├── unit/[feature].test.ts
│   ├── integration/[feature].test.ts
│   └── e2e/[feature].spec.ts
├── db/                             # Optional, if using a database
│   ├── schema/[feature].sql
│   └── migrations/[date]_[feature].sql
├── docs/
│   ├── [FEATURE]_ARCHITECTURE.md
│   ├── [FEATURE]_API.md
│   └── [FEATURE]_DATABASE.md
├── IMPLEMENTATION_NOTES.md
└── PERFORMANCE_METRICS.md

PR: [linked-fullstack-pr]
Status: [ready-for-review | requires-follow-up]
Deployment Notes: [any special steps]
```

**Fullstack Checklist:**

- [ ] Data storage schema reviewed + migrated (if applicable)
- [ ] All API endpoints implemented + documented
- [ ] Client components render correctly
- [ ] Server components fetch data efficiently
- [ ] Error boundaries catch failures gracefully
- [ ] Loading states shown during data fetch
- [ ] Authentication/authorization enforced
- [ ] Input validation on client + server
- [ ] Rate limiting applied appropriately
- [ ] CSRF protection on all mutations
- [ ] Logging implemented for debugging
- [ ] Unit test coverage > 80%
- [ ] Integration tests cover main flows
- [ ] E2E tests verify complete workflows
- [ ] Performance benchmarked
- [ ] Documentation complete
- [ ] Ready for production deployment

**Example Invocation:**

```
Build a team management system with:
- Users (invite, roles, permissions)
- Teams (create, members, settings)
- Projects (CRUD, team access)
- Roles (owner, admin, member)

Features needed:
1. Admin page to manage users/teams/projects
2. User invitation via email
3. Team settings (name, logo, members)
4. Role-based access control
5. Audit log of changes

Requirements:
- Data storage schema for users/teams/projects/roles (if applicable)
- API endpoints (full CRUD + invite)
- React admin UI (list, detail, forms)
- Permission checks on every endpoint
- Complete test coverage
- Deployment checklist
```

---

### CLAUDE_SUB_PERFORMANCE

**Model:** `claude-sonnet-4.5` (analytical + optimization)

**Activation Triggers:**
- Lighthouse score < 85 on any metric
- Core Web Vitals regression
- Bundle size increase > 50KB
- API response time > 500ms
- Data/query performance degradation
- Image/asset optimization needed

**Core Capabilities:**

1. **Lighthouse Analysis**
   - Performance score breakdown
   - LCP/FID/CLS/INP optimization
   - Best practices violations
   - SEO recommendations

2. **Bundle Analysis**
   - Code splitting opportunities
   - Unused code detection
   - Dependency optimization
   - Chunk size analysis

3. **Image Optimization**
   - Format conversion (WebP, AVIF)
   - Responsive images (srcset)
   - Lazy loading
   - Compression tuning

4. **Caching Strategy**
   - HTTP cache headers
   - Browser cache validation
   - Service Worker setup
   - CDN configuration

5. **Data Optimization (if applicable)**
   - Query analysis + indexing
   - N+1 detection
   - Aggregation queries
   - Pagination optimization

6. **Monitoring & Metrics**
   - Real User Monitoring (RUM)
   - Synthetic monitoring
   - Alerting setup
   - Trend analysis

**Deliverables Template:**

```
docs/PERFORMANCE_AUDIT_[DATE].md
├── Executive Summary
│   ├── Current Lighthouse Scores
│   ├── Core Web Vitals Status
│   └── Key Issues (3-5 highest impact)
├── Detailed Analysis
│   ├── LCP (Largest Contentful Paint)
│   │   ├── Current: X ms
│   │   ├── Target: < 2500 ms
│   │   ├── Issues Found
│   │   └── Optimizations
│   ├── FID/INP (Input Delay)
│   ├── CLS (Layout Shift)
│   └── Other Metrics
├── Optimizations Applied
│   ├── Code changes made
│   ├── Before/after metrics
│   └── Implementation details
├── Bundle Analysis
│   ├── Current size: X KB
│   ├── Opportunities identified
│   └── Code splitting added
├── Image Optimization
│   ├── Formats used (WebP, AVIF)
│   ├── Responsive breakpoints
│   └── Compression ratios
├── Monitoring Setup
│   ├── Metrics to track
│   ├── Alert thresholds
│   └── Dashboard links
└── Recommendations (Future)
    ├── Next improvements
    └── Timeline estimates

PR: [linked-performance-pr]
Status: [ready-for-review | requires-follow-up]
Impact: +X Lighthouse points, -Y KB bundle
```

**Performance Checklist:**

- [ ] Lighthouse performance score checked
- [ ] Core Web Vitals measured
- [ ] Images optimized (format, size, lazy-loading)
- [ ] Bundle size analyzed
- [ ] Code splitting applied where beneficial
- [ ] Unused CSS removed
- [ ] Unused JavaScript removed
- [ ] Fonts optimized (subsets, preloading)
- [ ] Caching headers configured
- [ ] Data queries optimized (if applicable)
- [ ] N+1 queries eliminated
- [ ] API response times < 500ms
- [ ] Third-party scripts audited
- [ ] Service Worker caching configured
- [ ] Monitoring dashboard active
- [ ] Performance budget defined

**Example Invocation:**

```
Lighthouse audit shows:
- Performance: 72
- LCP: 3.2s (target: <2.5s)
- CLS: 0.15 (target: <0.1)

Need:
1. Root cause analysis
2. Specific optimizations
3. Code changes needed
4. Before/after benchmarks
5. Monitoring setup

Current bottlenecks (from profiling):
- Hero image too large
- Too many re-renders in cart
- Data query for products slow
- Third-party script (analytics) blocking
```

---

### CLAUDE_SUB_EMAIL

**Model:** `claude-sonnet-4.5` (template design + integration)

**Activation Triggers:**
- Email system overhaul
- New email template
- Email delivery issues
- Notification system changes
- Newsletter design updates

**Core Capabilities:**

1. **Email Template Design**
   - HTML email design (responsive)
   - CSS inlining for Outlook compatibility
   - Plain text fallback
   - Dark mode support

2. **Email Service Integration**
   - Resend API usage
   - SendGrid / Mailgun setup
   - Webhook handling
   - Bounce/complaint processing

3. **Notification System**
   - Transactional email (order, password reset)
   - Marketing email (newsletter, promotions)
   - Notification preferences
   - Frequency capping

4. **Deliverability & Compliance**
   - SPF/DKIM/DMARC setup
   - List management (unsubscribe, preferences)
   - CAN-SPAM compliance
   - GDPR consent tracking

5. **Monitoring**
   - Delivery rate tracking
   - Open/click tracking
   - Bounce rate monitoring
   - List health metrics

**Deliverables Template:**

```
app/
├── components/
│   └── emails/
│       ├── OrderConfirmation.tsx
│       ├── NewsletterTemplate.tsx
│       └── ... (all email templates)
├── lib/
│   └── server/
│       ├── email.ts                 # Email service
│       └── emailTemplates.ts        # Template helpers
└── api/
    └── emails/
        ├── route.ts                 # Email sending
        └── webhooks/                # Service webhooks
tests/
└── unit/email.test.ts              # Email generation tests
docs/
├── EMAIL_TEMPLATES.md              # Template guide
├── EMAIL_DELIVERABILITY.md         # SPF/DKIM setup
└── EMAIL_MONITORING.md             # Metrics + alerts

PR: [linked-email-pr]
Status: [ready-for-review | requires-follow-up]
```

**Email Checklist:**

- [ ] All email templates created (transactional + marketing)
- [ ] HTML emails test in multiple clients
- [ ] Plain text fallback provided
- [ ] Dark mode support verified
- [ ] Images optimized for email
- [ ] CSS inlined properly
- [ ] Unsubscribe link included
- [ ] Preference center functional
- [ ] Bounce/complaint handling implemented
- [ ] Bounce suppression list checked
- [ ] SPF record configured
- [ ] DKIM signing enabled
- [ ] DMARC policy set
- [ ] List hygiene automated
- [ ] Delivery rate monitored
- [ ] Monitoring dashboard active

---

## Sub-Agent Activation Protocol

### When to Spawn (Decision Matrix)

```
Task Analysis
├── Complexity > 50k tokens?
│   └─ NO → Use primary agent
│   └─ YES → Check domain
│
├─ Domain specialization needed?
│   └─ Security → CLAUDE_SUB_SECURITY
│   └─ Commerce → CLAUDE_SUB_COMMERCE  
│   └─ Full Feature → CLAUDE_SUB_FULLSTACK
│   └─ Performance → CLAUDE_SUB_PERFORMANCE
│   └─ Email → CLAUDE_SUB_EMAIL
│   └─ Unknown → CLAUDE_SUB_FULLSTACK (safest)
│
├─ Risk level?
│   └─ HIGH (security, payment) → Route through SECURITY first
│   └─ MEDIUM/LOW → Direct to specialized sub-agent
│
└─ Timeline?
    └─ Urgent (< 2 hours) → Use Sonnet (faster)
    └─ Standard → Use Opus (better quality)
```

### Handoff Template

**To Copy/Paste When Spawning Sub-Agent:**

```markdown
# Sub-Agent Handoff: [Task Name]

**Sub-Agent Type:** CLAUDE_SUB_[SPECIALIZATION]
**Model:** [claude-opus-4 | claude-sonnet-4.5]
**Priority:** [P0/P1/P2]
**Deadline:** [Date/Time if time-sensitive]

## Task Summary

[Clear 2-3 sentence description]

## Context Package

### Project State
- Last commit: [hash] - [message]
- Current test coverage: X%
- Any failing tests?: [Yes/No, details]

### Key Files
- [Relevant file 1]
- [Relevant file 2]
- [Documentation to review]

### Recent Decisions
- [Decision 1 - when/why]
- [Decision 2 - when/why]

## Requirements

### Must Have (Critical)
- [ ] Requirement 1
- [ ] Requirement 2

### Should Have (Important)
- [ ] Requirement 3
- [ ] Requirement 4

### Nice to Have (Optional)
- [ ] Requirement 5

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] All tests passing
- [ ] No new console errors/warnings
- [ ] Linting passes (`npm run lint`)

## Deliverables

- [ ] Feature code (location: ...)
- [ ] Tests (unit + E2E coverage)
- [ ] Documentation (type: ...)
- [ ] PR with clear summary
- [ ] Merge-ready (no conflicts)

## Return Protocol

1. Create branch: `claude/[feature]-xxxxx`
2. Push commits with clear messages
3. Open PR with:
   - Description of changes
   - Testing done
   - Checklist items from above
   - Link to parent task
4. Notify primary agent when ready

## Questions / Blockers

[Leave space for sub-agent to note any clarifications needed]

---

**Primary Agent:** [Name]
**Date Assigned:** [ISO date]
**Expected Return:** [ISO date + time]
```

---

## Integration Best Practices

### Reviewing Sub-Agent Work

**Quality Checklist:**

- [ ] Code follows project conventions
- [ ] All tests passing
- [ ] Test coverage adequate
- [ ] No security issues introduced
- [ ] Performance acceptable
- [ ] Documentation complete
- [ ] PR description clear
- [ ] No merge conflicts
- [ ] Linting passes

**Quick Integration Steps:**

1. Review PR in detail
2. Run `npm run test:all` locally
3. Check bundle size impact (if relevant)
4. Verify feature works as described
5. Approve + merge when satisfied
6. Deploy or request final review

### Preventing Knowledge Loss

After merging sub-agent work:

1. Update `AGENTS.md` if patterns changed
2. Add new specialized section to `docs/` if complex
3. Document any gotchas/tradeoffs in PR comments
4. Add link to sub-agent PR in relevant docs

### Building Institutional Knowledge

Over time, as sub-agents handle tasks:

1. Track which tasks work well for which agents
2. Document emerging patterns
3. Update sub-agent specialization docs
4. Refine activation triggers based on experience

---

## Performance Tips for Sub-Agents

- **Load context gradually** - Start with AGENTS.md core sections, add detailed docs as needed
- **Reuse code** - Check `app/styles/` and `app/lib/` for existing patterns
- **Test as you go** - Run `npm run test` frequently to catch issues early
- **Document decisions** - Add comments in code explaining non-obvious choices
- **Ask clarifying questions** - If requirements are vague, ask primary agent before starting

---

## Troubleshooting Sub-Agent Work

**Problem:** Sub-agent test failures

**Solution:**
```
1. Sub-agent runs `npm run test` to identify failures
2. Reports specific test + error to primary agent
3. Primary agent clarifies expected behavior OR provides fix
4. Sub-agent implements correction
5. Re-run tests
```

**Problem:** Missing project context

**Solution:**
```
1. Sub-agent requests specific doc (docs/*, relevant files)
2. Primary agent provides file/section
3. Sub-agent incorporates context
4. Resume work
```

**Problem:** Scope creep during implementation

**Solution:**
```
1. Sub-agent identifies scope change impact
2. Reports to primary agent with:
   - What's needed vs. original spec
   - Time impact (+X hours)
   - Recommendation (do it / defer to follow-up task)
3. Primary agent decides
4. Continue or pivot
```

---

*This document evolves as we learn which sub-agent specializations work best for our workflows. Update regularly based on actual usage patterns.*

© The Notebook Café LLC — All rights reserved
