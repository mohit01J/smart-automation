---
name: Playwright TypeScript Standards
description: Gucci Digital test framework conventions for Playwright + TypeScript
---

# Playwright TypeScript Standards

## Purpose
This skill defines exactly how test files must be written for Smart Automation team.
Follow these rules for every file you generate or modify.

## File Location Rules
- Test files: apps/tests/[feature]/[feature].spec.ts
- Page objects: apps/tests/pages/[Feature]Page.ts
- Import from '../../fixtures/fixtures' — never from '@playwright/test' directly

## Required Test Structure
```typescript
import { test, expect } from '../../fixtures/fixtures';

test.describe('Feature — SubFeature', () => {
  test('@smoke @high — what this test verifies', async ({ page }) => {
    // ── Arrange ──
    // ── Act ──
    // ── Assert ──
  });
});
```

## Locator Hierarchy (use in this order)
1. data-testid (preferred)
2. aria-label or role
3. text content
Never use: XPath, CSS with position, brittle class names

## Naming Conventions
- Spec files: kebab-case (e.g. checkout-payment.spec.ts)
- Page objects: PascalCase (e.g. CheckoutPage.ts)
- Test tags: @smoke @regression @critical @high @medium @low

## BrowserStack Execution Rules
- Always use BrowserStack capabilities for cross-browser runs
- Never hardcode device or browser names in test code
- Use environment variables for BrowserStack credentials
- Attach screenshots on failure automatically via fixtures