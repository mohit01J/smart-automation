# AGENT COMMAND MATRIX

## Purpose

Compact intent-to-command lookup for orchestration agents.

## Preconditions

- Run commands from repository root.
- For BrowserStack commands, set:
  - `BROWSERSTACK_USERNAME`
  - `BROWSERSTACK_ACCESS_KEY`

## Intent Map

```yaml
version: 1
project: smart-qa-playwright-suite
runner:
  local: npx playwright test
  browserstack: node ./run-browserstack.js test

intents:
  run_all_tests:
    command: npm test

  run_smoke_tests:
    command: npm run test:smoke

  run_regression_tests:
    command: npm run test:regression

  run_on_browserstack:
    command: npm run test:bs

  run_smoke_on_browserstack:
    command: npm run test:bs:smoke

  run_chrome_only:
    command: npx playwright test --project=chromium

  run_firefox_only:
    command: npx playwright test --project=firefox

  run_headed:
    command: npx playwright test --headed

  run_debug_mode:
    command: npx playwright test --debug

  run_slowmo_debug:
    command: npx playwright test --headed --slow-mo 200

  run_specific_file_login:
    command: npx playwright test tests/login.spec.ts

  run_specific_file_ui_components:
    command: npx playwright test tests/ui-components.spec.ts

  run_specific_file_dynamic:
    command: npx playwright test tests/dynamic.spec.ts

  run_specific_test_title:
    template: npx playwright test --grep "<exact test title>"
    example: npx playwright test --grep "@smoke valid login succeeds"

  run_by_smoke_tag:
    command: npx playwright test --grep @smoke

  run_by_regression_tag:
    command: npx playwright test --grep @regression

  list_all_tests:
    command: npx playwright test --list

  list_matching_tests:
    template: npx playwright test --grep "<pattern>" --list

  open_html_report:
    command: npm run report

  open_html_report_direct:
    command: npx playwright show-report

  run_checkout_tests:
    command: npx playwright test --grep "checkout|cart|payment"
    expected_current_state: zero_matches

  run_italy_locale_tests:
    command: npx playwright test --grep "@italy|italy|locale"
    expected_current_state: zero_matches

  run_prada_tests:
    command: npx playwright test --grep "prada|checkout|cart|payment|locale"
    expected_current_state: zero_matches

scripts_from_package_json:
  test: npx playwright test
  test:smoke: npx playwright test --grep @smoke
  test:regression: npx playwright test --grep @regression
  test:bs: node ./run-browserstack.js test
  test:bs:smoke: node ./run-browserstack.js test --grep @smoke
  report: npx playwright show-report
```

## Known Current-State Constraints

- No Prada.com tests currently implemented.
- No checkout/cart/payment suite currently implemented.
- No Italy-locale tags or datasets currently implemented.
- Current target site is `https://the-internet.herokuapp.com`.

## Validate Matrix JSON

Validate `docs/AGENT_COMMAND_MATRIX.json` against `docs/AGENT_COMMAND_MATRIX.schema.json` before execution.

### Option 1: one-off validation with `npx ajv-cli`

```bash
npx ajv-cli validate -s docs/AGENT_COMMAND_MATRIX.schema.json -d docs/AGENT_COMMAND_MATRIX.json --spec=draft2020
```

### Option 2: explicit `ajv-cli` install then validate

```bash
npm install --save-dev ajv-cli
npx ajv validate -s docs/AGENT_COMMAND_MATRIX.schema.json -d docs/AGENT_COMMAND_MATRIX.json --spec=draft2020
```

Expected result:

- Exit code `0`
- Output similar to `docs/AGENT_COMMAND_MATRIX.json valid`
