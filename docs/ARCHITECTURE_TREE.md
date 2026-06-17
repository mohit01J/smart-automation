# Architecture and Repository Structure

## 1) Full Hierarchical Structure

Root:

- .git/
- .gitignore
- browserstack.yml
- docs/
- ensure-browserstack-playwright-compat.js
- log/
- node_modules/
- package-lock.json
- package.json
- pages/
- playwright-report/
- playwright.config.ts
- README.md
- run-browserstack.js
- skills/
- test-data/
- test-results/
- tests/
- tsconfig.json
- utils.js

Docs:

- docs/FRAMEWORK_DISCOVERY.md
- docs/AGENT_COMMAND_MATRIX.md
- docs/AGENT_COMMAND_MATRIX.json
- docs/AGENT_COMMAND_MATRIX.schema.json
- docs/ARCHITECTURE_TREE.md

Tests:

- tests/fixtures.ts
- tests/login.spec.ts
- tests/ui-components.spec.ts
- tests/dynamic.spec.ts

Page objects:

- pages/BasePage.ts
- pages/LoginPage.ts
- pages/CheckboxPage.ts
- pages/DropdownPage.ts

Log:

- log/events.json
- log/sdk-cli.log
- log/sdk-debug-utility.log
- log/usage.log
- log/performance-report/
- log/performance-report/modified-key-metrics.json

Generated report/artifacts:

- playwright-report/index.html
- test-results/results.json
- test-results/.last-run.json

All generated test-results directories:

- test-results/dynamic-Alerts-regression-JS-confirm-can-be-accepted-chromium/
- test-results/dynamic-Alerts-regression-JS-confirm-can-be-accepted-firefox/
- test-results/dynamic-Alerts-regression-JS-confirm-can-be-dismissed-chromium/
- test-results/dynamic-Alerts-regression-JS-confirm-can-be-dismissed-firefox/
- test-results/dynamic-Alerts-smoke-JS-alert-can-be-accepted-chromium/
- test-results/dynamic-Alerts-smoke-JS-alert-can-be-accepted-firefox/
- test-results/dynamic-Dynamic-Loading-re-45ab6-ered-after-start-is-visible-chromium/
- test-results/dynamic-Dynamic-Loading-re-45ab6-ered-after-start-is-visible-firefox/
- test-results/dynamic-Dynamic-Loading-sm-b5c1c-itially-reveals-after-start-chromium/
- test-results/dynamic-Dynamic-Loading-sm-b5c1c-itially-reveals-after-start-firefox/
- test-results/dynamic-Inputs-smoke-number-input-accepts-numeric-value-chromium/
- test-results/dynamic-Inputs-smoke-number-input-accepts-numeric-value-firefox/
- test-results/login-Login-regression-invalid-username-shows-error-chromium/
- test-results/login-Login-regression-invalid-username-shows-error-firefox/
- test-results/login-Login-regression-log-29b3b-ogout-returns-to-login-page-chromium/
- test-results/login-Login-regression-log-29b3b-ogout-returns-to-login-page-firefox/
- test-results/login-Login-smoke-invalid-password-shows-error-chromium/
- test-results/login-Login-smoke-invalid-password-shows-error-firefox/
- test-results/login-Login-smoke-valid-login-succeeds-chromium/
- test-results/login-Login-smoke-valid-login-succeeds-firefox/
- test-results/ui-components-Checkboxes-r-bd59b-checkbox-2-can-be-unchecked-chromium/
- test-results/ui-components-Checkboxes-r-bd59b-checkbox-2-can-be-unchecked-firefox/
- test-results/ui-components-Checkboxes-smoke-checkbox-1-can-be-checked-chromium/
- test-results/ui-components-Checkboxes-smoke-checkbox-1-can-be-checked-firefox/
- test-results/ui-components-Checkboxes-smoke-checkbox-2-starts-checked-chromium/
- test-results/ui-components-Checkboxes-smoke-checkbox-2-starts-checked-firefox/
- test-results/ui-components-Dropdown-reg-1e165-erent-options-updates-value-chromium/
- test-results/ui-components-Dropdown-reg-1e165-erent-options-updates-value-firefox/
- test-results/ui-components-Dropdown-smoke-can-select-option-1-chromium/
- test-results/ui-components-Dropdown-smoke-can-select-option-1-firefox/
- test-results/ui-components-Dropdown-smoke-can-select-option-2-chromium/
- test-results/ui-components-Dropdown-smoke-can-select-option-2-firefox/

## 2) Layered Architecture View

Execution Layer:

- package.json scripts define local, tag-based, and BrowserStack runs.
- run-browserstack.js switches run mode to BrowserStack and invokes SDK runner.
- ensure-browserstack-playwright-compat.js applies compatibility shims before BrowserStack execution.

Framework and Configuration Layer:

- playwright.config.ts controls projects, retries, workers, reporters, base URL, and timeouts.
- browserstack.yml defines BrowserStack credential placeholders and cloud capability matrix.
- tsconfig.json controls TypeScript compile settings for tests, pages, and config.

Test Orchestration Layer:

- tests/fixtures.ts centralizes shared test wrapper and screenshot attachment behavior.
- Test specs use fixtures and page objects to execute scenarios and assertions.

Test Specification Layer:

- tests/login.spec.ts
- tests/ui-components.spec.ts
- tests/dynamic.spec.ts

Page Object Model Layer:

- pages/BasePage.ts as shared POM base.
- pages/LoginPage.ts for login page actions.
- pages/CheckboxPage.ts for checkbox interactions.
- pages/DropdownPage.ts for dropdown interactions.

Data Layer:

- test-data/ exists but is currently empty.
- Active test data is currently embedded in test files.

Evidence and Reporting Layer:

- test-results/ stores raw execution outputs and JSON report.
- playwright-report/index.html is the human-readable HTML report.
- log/ stores BrowserStack SDK telemetry and diagnostics.
