import { expect, test as base } from "@playwright/test";

export { expect };

export const test = base;

function sanitizeAttachmentName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function stepWithScreenshot<T>(
  page: {
    isClosed(): boolean;
    screenshot(options?: { fullPage?: boolean }): Promise<Buffer>;
  },
  name: string,
  action: () => Promise<T>,
): Promise<T> {
  return test.step(name, async () => {
    const result = await action();

    if (!page.isClosed()) {
      await test.info().attach(`${sanitizeAttachmentName(name)}-screenshot`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
      });
    }

    return result;
  });
}

test.afterEach(async ({ page }, testInfo) => {
  if (page.isClosed()) {
    return;
  }

  await testInfo.attach("final-screenshot", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });
});
