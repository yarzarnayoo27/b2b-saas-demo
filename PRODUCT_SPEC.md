# Multi-Tenant SaaS Billing Platform

**Product Specification (v1.0)**

## 1. Product Overview

- **Product Name:** NOBill
- **Category:** B2B SaaS Infrastructure
- **Target Users:** Startups, SMEs, internal product teams building subscription-based SaaS

**Problem Statement**
Most early-stage SaaS teams struggle to design **correct, scalable billing systems**:

- Multi-tenant access control
- Subscription lifecycle management
- Usage-based billing
- Stripe webhook reliability
- Auditability for enterprise customers

This product demonstrates a **production-grade SaaS billing platform** with enterprise architecture patterns.

---

## 2. Core Actors & Ownership Model

### 2.1 Who pays?

**Organization (Tenant)**

- Each organization represents a paying customer
- Billing, subscriptions, and usage are always owned by the organization
- One Stripe **Customer** per organization

### 2.2 Who uses?

**Users under an organization**

- Users belong to one or more organizations
- Access is controlled via roles and permissions
- Users themselves never pay — organizations do

---

## 3. Multi-Tenant Model

### 3.1 Tenant Structure

```
Organization
 ├── Users
 │    └── Membership (role-based)
 ├── Subscription
 ├── Usage Records
 └── Audit Logs
```

### 3.2 Isolation Strategy

- **Row-level multi-tenancy**
- Every business table includes `orgId`
- All reads/writes are scoped by `orgId`
- No shared mutable data across tenants

**Rationale:**
This is the most common and scalable SaaS pattern used by startups and mid-sized companies.

---

## 4. Billing Model

### 4.1 Plans

#### Starter

- Flat monthly price
- Limited features
- Single admin user
- No usage-based charges

#### Pro

- Base monthly price
- Seat-based pricing (price per active user)
- Advanced features
- Usage tracking enabled

#### Enterprise (Usage-based)

- Custom base price
- Metered usage billing (e.g. API calls, events processed)
- Priority support
- Advanced audit & compliance features

---

### 4.2 Usage-Based Billing

Tracked usage examples:

- API requests
- Background jobs executed
- Reports generated

Usage is:

- Tracked internally
- Aggregated asynchronously
- Reported to Stripe using **metered billing**

---

## 5. Subscription Lifecycle

### 5.1 Trial

- 14-day free trial
- No payment method required at signup
- Trial linked to organization creation
- Trial expiration handled via background job

### 5.2 Subscription States

- `trialing`
- `active`
- `past_due`
- `canceled`

State is driven by **Stripe webhooks**, not frontend actions.

---

## 6. Payments & Stripe Integration

### 6.1 Stripe Model

- Single Stripe account (platform model)
- One Stripe Customer per organization
- Products & Prices predefined in Stripe Dashboard

### 6.2 Checkout Flow

1. Admin selects plan
2. Checkout Session created
3. User redirected to Stripe
4. Stripe webhook confirms payment
5. Subscription activated internally

### 6.3 Webhooks (Source of Truth)

Handled events:

- `checkout.session.completed`
- `customer.subscription.updated`
- `invoice.paid`
- `invoice.payment_failed`
- `customer.subscription.deleted`

**Key Design Principle:**

> Stripe is the source of truth for billing state.

---

## 7. Roles & Access Control (RBAC)

### 7.1 Roles

- **Owner** – Full access, billing & org management
- **Admin** – User & feature management
- **Member** – Product usage only
- **Billing Manager** – Billing & invoices only

### 7.2 Permission System

- Role → permissions mapping
- Permissions enforced at API layer
- Audited permission changes

---

## 8. Audit & Compliance

### 8.1 Audit Logging

Logged actions include:

- Subscription changes
- Plan upgrades/downgrades
- Role & permission changes
- Billing-related actions

Audit logs are:

- Immutable
- Tenant-scoped
- Time-ordered

**Purpose:**
Demonstrates enterprise readiness (SOC-2 thinking).

---

## 9. Non-Functional Requirements

### Reliability

- Idempotent webhook handling
- Retry-safe background jobs
- Graceful Stripe outage handling

### Scalability

- Stateless API servers
- Redis-backed queues
- Horizontal scaling ready

### Security

- JWT authentication
- Role-based authorization
- Webhook signature verification

---

## 10. Out of Scope (v1)

- Multi-region Stripe accounts
- Revenue recognition (RevRec)
- Tax automation (Stripe Tax)
- In-app payment methods beyond Stripe Checkout

---

## 11. Success Criteria

This project is successful if:

- Multiple organizations can subscribe independently
- Usage-based billing is accurately charged
- Webhooks are idempotent and reliable
- Permissions are enforced correctly
- System behaves correctly under subscription state changes

---
