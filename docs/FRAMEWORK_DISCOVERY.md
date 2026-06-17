# FRAMEWORK DISCOVERY

## 1) FRAMEWORK OVERVIEW

### 1.1 Testing framework and versions

- Framework: Playwright Test (`@playwright/test`)
- Declared dependency version range in `package.json`: `^1.44.0`
- Installed version in this workspace: `1.60.0`
- BrowserStack SDK package: `browserstack-node-sdk` (installed `1.56.1`)

### 1.2 Language and runtime

- Language: TypeScript for tests and page objects
- JavaScript: used for BrowserStack runtime helpers (`run-browserstack.js`, `ensure-browserstack-playwright-compat.js`)
- TypeScript package installed: `5.9.3`
- Node.js version in this workspace: `v20.20.0`
- npm version in this workspace: `11.6.2`

### 1.3 Repository structure (complete functional map)

Top-level files:

- `.gitignore`: ignores runtime artifacts (`node_modules`, `playwright-report`, `test-results`, `log`, `.env*`)
- `browserstack.yml`: BrowserStack SDK capabilities and execution settings
- `ensure-browserstack-playwright-compat.js`: compatibility shim creator for BrowserStack SDK + current Playwright internals
- `package-lock.json`: locked dependency graph
- `package.json`: scripts, metadata, dev dependencies
- `playwright.config.ts`: core Playwright test-runner configuration
- `README.md`: quickstart and high-level run instructions
- `run-browserstack.js`: BrowserStack execution entrypoint wrapper
- `tsconfig.json`: TypeScript compiler options for tests/pages/config
- `utils.js`: standalone utility functions (not imported by current tests)

Top-level directories:

- `.git/`: VCS metadata
- `docs/`: documentation (this discovery file)
- `log/`: BrowserStack SDK logs and performance telemetry
  - `events.json`
  - `sdk-cli.log`
  - `sdk-debug-utility.log` (currently empty)
  - `usage.log`
  - `performance-report/modified-key-metrics.json`
- `node_modules/`: installed dependencies
- `pages/`: Playwright Page Object Model classes
  - `BasePage.ts`
  - `CheckboxPage.ts`
  - `DropdownPage.ts`
  - `LoginPage.ts`
- `playwright-report/`: generated HTML report bundle
  - `index.html`
  - `data/*.png` (attachment and screenshot assets used by report)
- `skills/`: internal standards/reference artifacts for authoring patterns
  - `playwright-ts-standards/SKILL.md`
- `test-data/`: currently empty (no externalized test data files present)
- `test-results/`: Playwright output and JSON report artifact
  - `.last-run.json`
  - `results.json`
  - Per-test-per-browser output directories (for artifacts such as traces/videos/screenshots when retained)
- `tests/`: test specs and shared fixture utilities
  - `dynamic.spec.ts`
  - `fixtures.ts`
  - `login.spec.ts`
  - `ui-components.spec.ts`

### 1.4 Key config/entry files and what they control

- `playwright.config.ts`
  - `testDir`: test discovery root (`./tests`)
  - `timeout`: per-test timeout (`30000 ms`)
  - `retries`: conditional (`1` on BrowserStack mode, otherwise `0`)
  - `workers`: conditional (`2` on BrowserStack mode, otherwise `1`)
  - `fullyParallel`: enabled
  - reporters:
    - list (console)
    - html (`playwright-report`, does not auto-open)
    - json (`test-results/results.json`)
  - `use` defaults:
    - `baseURL`: `https://the-internet.herokuapp.com`
    - screenshot: `only-on-failure`
    - video: `retain-on-failure`
    - trace: `on-first-retry`
    - actionTimeout: `10000 ms`
  - projects:
    - local mode (`BROWSERSTACK !== 'true'`): `chromium`, `firefox`
    - BrowserStack mode (`BROWSERSTACK === 'true'`): single `browserstack` project, browser/OS matrix delegated to BrowserStack SDK via `browserstack.yml`
- `browserstack.yml`
  - credential placeholders from env vars
  - build/project metadata
  - browser capability matrix
  - parallels, timeout, network/video/visual logging options
- `run-browserstack.js`
  - sets `BROWSERSTACK=true`
  - calls BrowserStack SDK runner (`browserstack-node-sdk/src/bin/runner.js`)
  - forwards all test CLI args
- `ensure-browserstack-playwright-compat.js`
  - writes shim files under `node_modules/playwright/lib/...` if missing
  - prevents SDK-runtime breakage due expected internal modules
- `package.json`
  - exposes standard local/browserstack/report scripts

---

## 2) TEST EXECUTION COMMANDS

All commands below run from repository root.

### 2.1 Install and setup commands

```bash
npm install
npx playwright install chromium firefox
```

### 2.2 npm scripts available in this repository

```bash
npm test
npm run test:smoke
npm run test:regression
npm run test:bs
npm run test:bs:smoke
npm run report
```

### 2.3 Equivalent direct Playwright commands

```bash
npx playwright test
npx playwright test --grep @smoke
npx playwright test --grep @regression
npx playwright show-report
```

### 2.4 Run a specific test file

```bash
npx playwright test tests/login.spec.ts
npx playwright test tests/ui-components.spec.ts
npx playwright test tests/dynamic.spec.ts
```

### 2.5 Run a specific test by title (name)

```bash
npx playwright test --grep "@smoke valid login succeeds"
npx playwright test --grep "JS confirm can be dismissed"
```

### 2.6 Run by tag/group

```bash
npx playwright test --grep @smoke
npx playwright test --grep @regression
npx playwright test --grep "@smoke|@regression"
```

### 2.7 Headed vs headless

- Headless is default in Playwright.

```bash
# Default (headless)
npx playwright test

# Force headed
npx playwright test --headed
```

### 2.8 Debug mode

```bash
# Playwright Inspector + step-through debugging
npx playwright test --debug

# Slow down actions for visual debugging
npx playwright test --headed --slow-mo 200
```

### 2.9 Browser selection (current projects)

```bash
# Chromium project only
npx playwright test --project=chromium

# Firefox project only
npx playwright test --project=firefox
```

---

## 3) BROWSERSTACK INTEGRATION

### 3.1 How BrowserStack is configured

BrowserStack execution is wired through three files:

1. `run-browserstack.js`
   - Sets `BROWSERSTACK=true`
   - Invokes BrowserStack SDK runner with forwarded Playwright args
2. `browserstack.yml`
   - Defines BrowserStack credentials placeholders, capability matrix, build metadata, and cloud settings
3. `playwright.config.ts`
   - Switches to BrowserStack project profile when `BROWSERSTACK=true`

### 3.2 Required environment variables

- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`

Set in PowerShell:

```powershell
$env:BROWSERSTACK_USERNAME="<your_username>"
$env:BROWSERSTACK_ACCESS_KEY="<your_access_key>"
```

Optional local environment file support exists by convention (ignored by `.gitignore`):

- `.env`
- `.env.*`

### 3.3 Switching local vs BrowserStack execution

- Local run path:
  - `npm test` (does not set `BROWSERSTACK`)
  - Playwright uses `chromium` + `firefox` projects from config
- BrowserStack run path:
  - `npm run test:bs` (wrapper sets `BROWSERSTACK=true`)
  - Browser matrix comes from `browserstack.yml`

### 3.4 Exact BrowserStack run commands

```bash
# All tests on BrowserStack
npm run test:bs

# Smoke tests on BrowserStack
npm run test:bs:smoke

# BrowserStack with custom grep (example)
node ./run-browserstack.js test --grep "@regression"
```

### 3.5 Where capabilities are defined

- Browser/OS capabilities are defined in `browserstack.yml` under `browsers:`
  - Chrome latest on Windows 11
  - Firefox latest on macOS Ventura
- Additional BrowserStack runtime settings in `browserstack.yml`:
  - `parallelsPerPlatform`
  - `testTimeout`
  - `networkLogs`
  - `consoleLogs`
  - `visual`
  - `video`

---

## 4) TEST INVENTORY (EXHAUSTIVE)

## 4.1 Test files with full paths

- `tests/login.spec.ts`
- `tests/ui-components.spec.ts`
- `tests/dynamic.spec.ts`

## 4.2 Test cases per file, tags, and business purpose

### `tests/login.spec.ts`

1. `@smoke valid login succeeds`

- Purpose: validates successful authentication using known valid credentials and secure-area redirect.
- Expected behavior: URL contains `/secure`, success flash shown.

2. `@smoke invalid password shows error`

- Purpose: validates negative login path for wrong password.
- Expected behavior: flash contains "Your password is invalid!".

3. `@regression invalid username shows error`

- Purpose: validates negative login path for unknown username.
- Expected behavior: flash contains "Your username is invalid!".

4. `@regression login then logout returns to login page`

- Purpose: validates end-to-end auth session lifecycle (login + logout).
- Expected behavior: returns to `/login`, logout confirmation flash shown.

### `tests/ui-components.spec.ts`

5. `@smoke checkbox 1 can be checked`

- Purpose: validates checkbox state mutation from unchecked to checked.

6. `@smoke checkbox 2 starts checked`

- Purpose: validates default state contract of second checkbox.

7. `@regression checkbox 2 can be unchecked`

- Purpose: validates checkbox toggling in opposite direction.

8. `@smoke can select option 1`

- Purpose: validates dropdown selection action for option 1.

9. `@smoke can select option 2`

- Purpose: validates dropdown selection action for option 2.

10. `@regression selecting different options updates value`

- Purpose: validates repeated dropdown selection and state update consistency.

### `tests/dynamic.spec.ts`

11. `@smoke JS alert can be accepted`

- Purpose: validates JavaScript alert handling (accept path).

12. `@regression JS confirm can be accepted`

- Purpose: validates JavaScript confirm handling when accepted.

13. `@regression JS confirm can be dismissed`

- Purpose: validates JavaScript confirm handling when dismissed.

14. `@smoke element hidden initially reveals after start`

- Purpose: validates dynamic loading example 1 timing/visibility behavior.

15. `@regression element rendered after start is visible`

- Purpose: validates dynamic loading example 2 rendering behavior.

16. `@smoke number input accepts numeric value`

- Purpose: validates numeric input acceptance and value persistence.

### 4.3 Prada.com checkout-flow coverage status

- There are currently **no** tests targeting Prada.com.
- There are currently **no** checkout/cart/payment test files or test titles.
- This suite targets `https://the-internet.herokuapp.com` demo pages only.

### 4.4 Tags/groups currently used

- `@smoke`
- `@regression`

No other active tags (`@checkout`, `@italy`, `@critical`, etc.) are present in test specs.

---

## 5) PAGE OBJECT MODEL

### 5.1 Page Object classes

1. `pages/BasePage.ts`

- Represents: shared base helper abstraction used by all page objects.
- Key methods:
  - `navigate(path)`
  - `waitAndClick(locator)`
  - `fillField(locator, value)`
  - `assertVisible(locator)`
  - `assertText(locator, text)`
  - `assertURL(path)`
- URL baseline baked in: `https://the-internet.herokuapp.com`

2. `pages/LoginPage.ts`

- Represents: `/login` page on the-internet site.
- Key locators:
  - username, password, submit button, flash message, logout button
- Key methods:
  - `goto()`
  - `login(username, password)`
  - `logout()`

3. `pages/CheckboxPage.ts`

- Represents: `/checkboxes` page.
- Key methods:
  - `goto()`
  - `getCheckbox(index)`
  - `isChecked(index)`

4. `pages/DropdownPage.ts`

- Represents: `/dropdown` page.
- Key methods:
  - `goto()`
  - `selectOption(value)`
  - `getSelectedValue()`

### 5.2 Mapping to real Prada.com pages

- Direct mapping does not exist in current codebase.
- Conceptual analog mapping only:
  - `LoginPage` -> would map to a future Prada account sign-in page
  - `DropdownPage` / `CheckboxPage` -> generic component interactions usable for filter/facet controls
  - `dynamic.spec.ts` interactions -> generic async UI behavior validation patterns

---

## 6) TEST DATA

### 6.1 Where data is defined

- No external data files are used currently.
- `test-data/` exists but is empty.
- Data is hardcoded directly inside test specs.

### 6.2 Existing test data values

Users:

- Valid: `tomsmith / SuperSecretPassword!`
- Invalid password case: `tomsmith / wrongpassword`
- Invalid username case: `unknownuser / SuperSecretPassword!`

UI values:

- Dropdown options: `1`, `2`
- Numeric input: `42`

Dynamic content expected text:

- `Hello World!`
- Alert result texts for accept/dismiss paths

### 6.3 Countries, products, payment methods

- No country dataset exists.
- No product catalog data exists.
- No payment method data exists.
- No checkout/cart domain model exists.

### 6.4 How to pass different data to test runs

Current state:

- There is no built-in parameterization layer (no environment-driven data fixture in use).
- To vary data, edit the test literals in spec files.

Recommended command pattern for future data-driven extension:

```bash
# Example only (requires code support first)
TEST_USER=myuser TEST_PASS=mypass npx playwright test tests/login.spec.ts
```

### 6.5 Environment-specific data

- None currently implemented.
- Only environment-sensitive behavior today is BrowserStack toggle via `BROWSERSTACK=true`.

---

## 7) CONFIGURATION

### 7.1 `playwright.config.ts` explained setting-by-setting

- `testDir: './tests'`
  - source folder for test discovery
- `timeout: 30_000`
  - maximum per-test duration (30s)
- `retries: IS_BS ? 1 : 0`
  - 1 retry in BrowserStack mode, 0 retries locally
- `workers: IS_BS ? 2 : 1`
  - 2 workers on BrowserStack, 1 worker locally
- `fullyParallel: true`
  - allows parallel execution across tests where possible
- `reporter`
  - list reporter (terminal)
  - HTML report to `playwright-report`
  - JSON report to `test-results/results.json`
- `use.baseURL`
  - default base URL for navigations implemented via page objects
- `use.screenshot: 'only-on-failure'`
  - auto screenshot for failed tests
- `use.video: 'retain-on-failure'`
  - stores video only when test fails
- `use.trace: 'on-first-retry'`
  - captures trace on retry attempt
- `use.actionTimeout: 10_000`
  - max timeout per action (click/fill/etc.)
- `projects`
  - BrowserStack mode: `browserstack` placeholder project only
  - Local mode: `chromium`, `firefox` desktop device presets

### 7.2 How to change browser (Chrome, Firefox, Safari/WebKit)

Run existing configured projects:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

To add Safari-equivalent (WebKit), update `playwright.config.ts` local projects:

```ts
{
  name: 'webkit',
  use: { ...devices['Desktop Safari'] },
}
```

Then run:

```bash
npx playwright test --project=webkit
```

### 7.3 How to change viewport/device

Current local projects inherit Playwright device presets.

Two ways:

1. Edit project `use` blocks in `playwright.config.ts`.
2. Override in specific tests using `test.use({ viewport: { width, height } })`.

Example config override:

```ts
use: {
  ...devices['Desktop Chrome'],
  viewport: { width: 1440, height: 900 },
}
```

### 7.4 How to change base URL per environment

Current value:

- `use.baseURL = 'https://the-internet.herokuapp.com'`

To make environment-based:

```ts
baseURL: process.env.BASE_URL || "https://the-internet.herokuapp.com";
```

Then run with custom environment:

```powershell
$env:BASE_URL="https://staging.example.com"
npx playwright test
```

### 7.5 Timeout settings summary

- Test timeout: `30000 ms`
- Action timeout: `10000 ms`
- BrowserStack SDK `testTimeout` in `browserstack.yml`: `30000 ms`

---

## 8) EVIDENCE AND REPORTING

### 8.1 Where screenshots are saved

Sources:

1. Fixture attachments (`tests/fixtures.ts`)
   - Per-step screenshot attachments via `stepWithScreenshot(...)`
   - Final screenshot attachment in `afterEach`
   - Persisted into HTML report assets under `playwright-report/data/*.png`
2. Playwright auto failure screenshots
   - Enabled via `use.screenshot = only-on-failure`
   - Stored under corresponding `test-results/<test-output-dir>/...` on failure

### 8.2 Where videos are saved

- Enabled as `retain-on-failure`
- Stored under test output directories in `test-results/...` only for failed tests
- If all tests pass, videos are typically not retained

### 8.3 Where HTML reports are generated

- `playwright-report/index.html`
- Related image assets in `playwright-report/data/`

### 8.4 Where machine-readable report is generated

- `test-results/results.json`
- Contains suite/spec structure, status, timings, tags, attachments metadata

### 8.5 How to open report after a run

```bash
npm run report
# equivalent:
npx playwright show-report
```

### 8.6 What the report contains

- Test pass/fail summary
- Per-project results (`chromium`, `firefox`, or BrowserStack project mode)
- Test durations and retry information
- Step-level events from `test.step`
- Attachment references (screenshots, trace/video links when present)

---

## 9) ENVIRONMENT SETUP

### 9.1 Prerequisites

- Node.js (recommended LTS; this workspace validated with `v20.20.0`)
- npm (workspace validated with `11.6.2`)
- Network access to:
  - `https://the-internet.herokuapp.com`
  - BrowserStack endpoints (if running cloud tests)

### 9.2 Local setup steps

```bash
npm install
npx playwright install chromium firefox
```

### 9.3 Environment variables

Mandatory only for BrowserStack:

- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`

Optional/future (not currently wired by default):

- `BASE_URL` (if config is adapted)

### 9.4 Setup verification checklist

```bash
# verify Playwright CLI
npx playwright --version

# dry listing of discovered tests
npx playwright test --list

# execute smoke tests
npm run test:smoke

# open report
npm run report
```

Success criteria:

- Tests execute without dependency errors
- `test-results/results.json` updated
- `playwright-report/index.html` opens and displays latest run

---

## 10) AGENT EXECUTION GUIDE

## FOR AI AGENTS

### 10.1 Intent-to-command map (natural language -> exact command)

1. Intent: run smoke tests

```bash
npm run test:smoke
```

2. Intent: run checkout tests

```bash
npx playwright test --grep "checkout|cart|payment"
```

Note: current repository has no checkout/cart/payment tests; this command is expected to match zero tests.

3. Intent: run on BrowserStack

```bash
npm run test:bs
```

4. Intent: run on Chrome only

```bash
npx playwright test --project=chromium
```

5. Intent: run a specific test

```bash
npx playwright test --grep "<exact test title>"
```

Example:

```bash
npx playwright test --grep "@smoke valid login succeeds"
```

6. Intent: get the test report

```bash
npm run report
```

7. Intent: run Italy locale tests

```bash
npx playwright test --grep "@italy|italy|locale"
```

Note: no Italy/locale tags or datasets currently exist, so this will usually match zero tests.

### 10.2 Full execution scenario catalog (exact commands)

Baseline local runs:

```bash
npm test
npm run test:smoke
npm run test:regression
```

File-scoped runs:

```bash
npx playwright test tests/login.spec.ts
npx playwright test tests/ui-components.spec.ts
npx playwright test tests/dynamic.spec.ts
```

Single-test runs by title:

```bash
npx playwright test --grep "@smoke valid login succeeds"
npx playwright test --grep "@regression JS confirm can be dismissed"
```

Tag-scoped runs:

```bash
npx playwright test --grep @smoke
npx playwright test --grep @regression
```

Browser-scoped local runs:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

Visibility/debug modes:

```bash
npx playwright test --headed
npx playwright test --debug
npx playwright test --headed --slow-mo 200
```

BrowserStack runs:

```bash
npm run test:bs
npm run test:bs:smoke
node ./run-browserstack.js test --grep "@regression"
```

Discovery/listing runs:

```bash
npx playwright test --list
npx playwright test --grep "<pattern>" --list
```

Report access:

```bash
npm run report
npx playwright show-report
```

### 10.3 Agent interpretation rules

- If request contains “smoke”, use `--grep @smoke` or `npm run test:smoke`.
- If request contains “regression”, use `--grep @regression`.
- If request contains “browserstack/cloud”, run BrowserStack scripts and ensure credentials are set.
- If request names an exact test title, use `--grep "<exact text>"`.
- If request asks for checkout/Prada/locale scenarios, inform that no such tests currently exist and run `--list`/`--grep` discovery command to confirm zero matches.

---

## APPENDIX A: Actual npm scripts in this repository

```json
{
  "test": "npx playwright test",
  "test:smoke": "npx playwright test --grep @smoke",
  "test:regression": "npx playwright test --grep @regression",
  "test:bs": "node ./run-browserstack.js test",
  "test:bs:smoke": "node ./run-browserstack.js test --grep @smoke",
  "report": "npx playwright show-report"
}
```

## APPENDIX B: BrowserStack capability snapshot from `browserstack.yml`

```yaml
userName: ${BROWSERSTACK_USERNAME}
accessKey: ${BROWSERSTACK_ACCESS_KEY}

buildName: SMART-QA Smoke Run
projectName: SMART-QA POC
buildTag:
  - smoke
  - playwright
  - automated

browsers:
  - browser: chrome
    browser_version: latest
    os: Windows
    os_version: 11

  - browser: firefox
    browser_version: latest
    os: OS X
    os_version: Ventura

parallelsPerPlatform: 2
testTimeout: 30000
disableAutoCaptureLogs: true
networkLogs: true
consoleLogs: info
visual: true
video: true
```
