# SMART-QA Playwright Suite

Playwright TypeScript test suite targeting [the-internet.herokuapp.com](https://the-internet.herokuapp.com) — a purpose-built public testing site. Compatible with local execution and BrowserStack Automate cloud.

---

## Target Site

| Page            | URL                           |
| --------------- | ----------------------------- |
| Login           | `/login`                      |
| Checkboxes      | `/checkboxes`                 |
| Dropdown        | `/dropdown`                   |
| JS Alerts       | `/javascript_alerts`          |
| Dynamic Loading | `/dynamic_loading/1` and `/2` |
| Inputs          | `/inputs`                     |

---

## Project Structure

```
playwright-bs-suite/
├── pages/
│   ├── BasePage.ts          ← shared helpers (navigate, fill, click, assert)
│   ├── LoginPage.ts         ← /login page object
│   ├── CheckboxPage.ts      ← /checkboxes page object
│   └── DropdownPage.ts      ← /dropdown page object
├── tests/
│   ├── login.spec.ts        ← 4 login tests (@smoke + @regression)
│   ├── ui-components.spec.ts ← 6 checkbox + dropdown tests
│   └── dynamic.spec.ts      ← 6 alerts + dynamic loading + input tests
├── playwright.config.ts     ← local + BrowserStack config
├── browserstack.yml         ← BrowserStack SDK browser/OS matrix
├── package.json
└── tsconfig.json
```

**Total: 16 tests — 7 @smoke, 9 @regression**

---

## Setup

```bash
npm install
npx playwright install chromium firefox
```

---

## Run Locally

```bash
# All tests
npm test

# Smoke only
npm run test:smoke

# Regression only
npm run test:regression

# Open HTML report
npm run report
```

---

## Run on BrowserStack

### 1. Set credentials

```powershell
$env:BROWSERSTACK_USERNAME="your_username"
$env:BROWSERSTACK_ACCESS_KEY="your_access_key"
```

Or add to a `.env` file (never commit this):

```
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key
```

### 2. Run

```bash
# All tests on BrowserStack
npm run test:bs

# Smoke only on BrowserStack
npm run test:bs:smoke
```

The BrowserStack scripts use the BrowserStack SDK directly and attach a final screenshot for each test run.

BrowserStack will run tests on:

- Chrome latest / Windows 11
- Firefox latest / macOS Ventura

---

## CompanyHelm Agent Prompt

Once the repo is cloned into E2B, tell the BrowserStack Test Runner agent:

```
Clone the repo, install dependencies, then run:
BROWSERSTACK=true npx playwright test --grep @smoke

Report: total passed, total failed, and any error messages.
```
<!-- SMART-QA GitHub Actions enabled - automated smoke tests active -->
<!-- retry after YAML fix -->
