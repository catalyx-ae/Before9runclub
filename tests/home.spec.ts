import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/story", "/founders", "/mind-and-motion", "/collective", "/city", "/archive", "/archive/001", "/connect"];

test("all pages render unique metadata, working content, and no runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  const titles = new Set<string>();
  for (const path of routes) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{30,}/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /\S/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
    titles.add(await page.title());
  }
  expect(titles.size).toBe(routes.length);
  expect(errors).toEqual([]);
});

test("all pages pass automated WCAG AA checks", async ({ page }) => {
  for (const path of routes) {
    await page.goto(path);
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(result.violations, path).toEqual([]);
  }
});

test("every route fits the viewport without clipping its headline", async ({ page }) => {
  for (const path of routes) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const result = await page.evaluate(() => ({
      width: window.innerWidth,
      page: document.documentElement.scrollWidth,
      lines: [...document.querySelectorAll("h1 .line-inner")].map(element => {
        const range = document.createRange(); range.selectNodeContents(element);
        return { text: range.getBoundingClientRect().width, available: element.clientWidth };
      }),
    }));
    expect(result.page, path).toBeLessThanOrEqual(result.width);
    for (const line of result.lines) expect(line.text, path).toBeLessThanOrEqual(line.available + 1);
  }
});

test("the full menu exposes eight pages, traps focus, and navigates", async ({ page }) => {
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Menu", exact: true });
  await menuButton.click();
  const dialog = page.getByRole("dialog", { name: "Explore Before 9" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("navigation", { name: "All pages" }).getByRole("link")).toHaveCount(8);
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
  }
  await dialog.getByRole("button", { name: "Close menu" }).focus();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("link", { name: /Find us on Instagram/ })).toBeFocused();
  const scan = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(scan.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(menuButton).toBeFocused();
  await menuButton.click();
  await dialog.getByRole("link", { name: /03 The founders/ }).click();
  await expect(page).toHaveURL(/\/founders$/);
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Selim");
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
});

test("the skippable intro runs once and leaves navigation usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const intro = page.getByRole("dialog", { name: "Welcome to Before 9" });
  await expect(intro).toBeVisible();
  await intro.getByRole("button", { name: /Skip intro/ }).click();
  await expect(intro).not.toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await page.reload();
  await expect(intro).not.toBeVisible();
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Explore Before 9" })).toBeVisible();
});

test("founder panels preserve Selim and Enes identities and respond to selection", async ({ page }) => {
  await page.goto("/founders");
  await page.getByRole("button", { name: "Meet Selim", exact: true }).click();
  await expect(page.locator("#founder-profile").getByRole("heading", { level: 2 })).toHaveText("Selim.");
  await expect(page.getByRole("button", { name: "Meet Selim", exact: true })).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("button", { name: "Meet Enes", exact: true }).click();
  await expect(page.locator("#founder-profile").getByRole("heading", { level: 2 })).toHaveText("Enes.");
  await page.getByRole("button", { name: /Back to the duo/ }).click();
  await expect(page.getByRole("button", { name: "Meet Enes", exact: true })).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#founder-profile")).toContainText("Different people.");
});

test("a normal-motion page wipe clears the next page and resets for reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/story");
  await page.getByRole("navigation", { name: "Footer navigation" }).getByRole("link", { name: "The founders", exact: true }).click();
  await expect(page).toHaveURL(/\/founders$/);
  await expect.poll(() => page.locator(".scene-wipe").evaluate(element => element.getBoundingClientRect().left)).toBeGreaterThanOrEqual(page.viewportSize()!.width);
  await page.getByRole("button", { name: "Meet Selim", exact: true }).click();
  await expect(page.getByRole("button", { name: "Meet Selim", exact: true })).toHaveAttribute("aria-expanded", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => page.locator(".scene-wipe").evaluate(element => element.getBoundingClientRect().right)).toBeLessThanOrEqual(0);
});

test("the word playground changes the theme and its editorial story", async ({ page }) => {
  await page.goto("/mind-and-motion");
  for (const word of ["Breathe.", "Laugh.", "Connect.", "Repeat.", "Move."]) {
    const button = page.getByRole("button", { name: new RegExp(word.replace(".", "\\.")) });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".playground-stage h2")).toHaveText(word);
    await expect(page.locator(".playground-copy h3")).toBeVisible();
  }
});

test("the media viewer supports next, previous, Escape, and restores focus", async ({ page }) => {
  await page.goto("/collective");
  const opener = page.getByRole("button", { name: "Open The first hello.", exact: true });
  await opener.click();
  const viewer = page.getByRole("dialog", { name: "Morning collective media viewer" });
  await expect(viewer).toBeVisible();
  await expect(viewer.getByRole("heading")).toHaveText("The first hello.");
  await page.keyboard.press("ArrowRight");
  await expect(viewer.getByRole("heading")).toHaveText("A little further, together.");
  await viewer.getByRole("button", { name: "Previous image" }).click();
  await expect(viewer.getByRole("heading")).toHaveText("The first hello.");
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(result.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(viewer).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test("Run 001 opens from the map and list, flies to the confirmed place, and links to its chapter", async ({ page }) => {
  await page.goto("/city");
  const atlas = page.getByRole("region", { name: "Before 9 Run Atlas", exact: true });
  const svg = atlas.locator(".atlas-svg");
  await expect(atlas.locator(".atlas-marker")).toHaveCount(1);
  await atlas.getByRole("button", { name: "001 — REEM CENTRAL PARK", exact: true }).click();
  await expect(atlas.getByRole("heading", { level: 3 })).toHaveText("The first chapter.");
  const view = (await svg.getAttribute("viewBox"))!.split(" ").map(Number);
  expect(view[2]).toBe(140);
  // Independent reference point from the exact owner-confirmed Google Maps longitude.
  expect(view[0] + view[2] / 2).toBeCloseTo(550.913625, 5);
  await expect(atlas.getByRole("link", { name: "Explore the full chapter" })).toHaveAttribute("href", "/archive/001");
  await atlas.getByRole("button", { name: "UAE overview" }).click();
  await expect(svg).toHaveAttribute("viewBox", "0 0 1000 720");
  await atlas.getByRole("button", { name: /Fly to Abu Dhabi/ }).click();
  expect(Number((await svg.getAttribute("viewBox"))!.split(" ")[2])).toBe(280);
  await atlas.getByRole("button", { name: "Zoom in", exact: true }).click();
  expect(Number((await svg.getAttribute("viewBox"))!.split(" ")[2])).toBeLessThan(280);
  const before = await svg.getAttribute("viewBox");
  await atlas.locator(".atlas-canvas").focus();
  await page.keyboard.press("ArrowLeft");
  expect(await svg.getAttribute("viewBox")).not.toBe(before);
  await atlas.locator(".atlas-run-list button").first().click();
  await expect(atlas.getByRole("heading", { level: 3 })).toHaveText("The first chapter.");
  await atlas.getByRole("link", { name: "Explore the full chapter" }).click();
  await expect(page).toHaveURL(/\/archive\/001$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("The first chapter.");
  await expect(page.getByRole("link", { name: /Find this chapter on the Atlas/ })).toHaveAttribute("href", "/city#run-atlas");
});

test("archive search, keyboard tabs, and the shared Atlas work", async ({ page }) => {
  await page.goto("/archive");
  const search = page.getByRole("searchbox", { name: "Find a chapter" });
  await search.fill("not-a-recorded-location");
  await expect(page.getByRole("status")).toContainText("No chapter found.");
  await page.getByRole("button", { name: /Show all chapters/ }).click();
  await search.fill("Reem Central Park");
  await expect(page.locator(".chapter-cover")).toHaveCount(1);
  await page.getByRole("tab", { name: /The chapters/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /The Run Atlas/ })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("button", { name: "001 — REEM CENTRAL PARK", exact: true })).toBeVisible();
  await page.getByRole("tab", { name: /The Run Atlas/ }).focus();
  await page.keyboard.press("Home");
  await expect(page.getByRole("tab", { name: /The chapters/ })).toHaveAttribute("aria-selected", "true");
});

test("reduced motion keeps the interactive features functional", async ({ page }) => {
  await page.goto("/mind-and-motion");
  await page.getByRole("button", { name: /Breathe/ }).click();
  await expect(page.locator(".playground-stage h2")).toHaveCSS("transform", "none");
  await page.goto("/connect");
  await page.getByRole("button", { name: /Morning energy/ }).click();
  await expect(page.getByRole("button", { name: /Morning energy/ })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("link", { name: "Follow Before 9 on Instagram (opens in a new tab)" })).toHaveAttribute("href", "https://www.instagram.com/before9runclub/");
});

test("the keyboard skip link reaches main and unknown chapters return 404", async ({ page }) => {
  await page.goto("/story");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const response = await page.goto("/archive/999");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("New route.Same good energy.");
});

test("the social sharing image is a real generated PNG", async ({ request }) => {
  const response = await request.get("/opengraph-image");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/png");
  const body = await response.body();
  expect(body.subarray(1, 4).toString()).toBe("PNG");
  expect(body.length).toBeGreaterThan(1000);
});

test("headlines fit small and tablet widths", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Edge widths are covered once across all routes.");
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of routes) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const values = await page.evaluate(() => {
        const lineValues = [...document.querySelectorAll("h1 .line-inner")].map(element => {
          const range = document.createRange(); range.selectNodeContents(element);
          return range.getBoundingClientRect().width - element.clientWidth;
        });
        return { overflow: document.documentElement.scrollWidth - window.innerWidth, lineValues };
      });
      expect(values.overflow, path+" at "+width).toBeLessThanOrEqual(0);
      for (const overflow of values.lineValues) expect(overflow, path+" at "+width).toBeLessThanOrEqual(1);
    }
  }
});
