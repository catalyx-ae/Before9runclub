import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("the cover and story render with honest asset placeholders", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Before 9 Run Club/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Before the city wakes.");
  await expect(page.getByRole("heading", { level: 2 })).toHaveText("Two friends.One movement.");
  await expect(page.getByText("Club imagery to come")).toBeVisible();
  await expect(page.getByText("Founders’ photograph to come")).toBeAttached();
  await expect(page.getByText(/Proposed founding story/)).toBeAttached();
  await expect(page.locator(".hero-title")).toBeVisible();
  expect(errors).toEqual([]);
});

test("the chapter menu traps focus, closes with Escape, and restores focus", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu", exact: true });
  await trigger.click();
  const menu = page.getByRole("dialog");
  await expect(menu).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press("Tab");
    expect(await menu.evaluate(element => element.contains(document.activeElement))).toBe(true);
  }
  await page.getByRole("button", { name: "Close menu" }).focus();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("link", { name: "Find us on Instagram (opens in a new tab)" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await trigger.click();
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("chapter links navigate and Instagram uses the official account", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page.getByRole("navigation", { name: "Chapters" }).getByRole("link", { name: /Our story/ }).click();
  await expect(page).toHaveURL(/#our-story$/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator("#our-story")).toBeInViewport();
  const instagram = page.getByRole("link", { name: "Follow the mornings on Instagram (opens in a new tab)" });
  await expect(instagram).toHaveAttribute("href", "https://www.instagram.com/before9runclub/");
  await expect(instagram).toHaveAttribute("rel", "noopener noreferrer");
  await expect(instagram).toHaveAttribute("target", "_blank");
});

test("there is no horizontal overflow or clipped headline at key viewport widths", async ({ page }) => {
  for (const width of [320, 390, 700, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const dimensions = await page.evaluate(() => {
      const lines = Array.from(document.querySelectorAll(".hero-title .line-inner")).map(line => {
        const range = document.createRange();
        range.selectNodeContents(line);
        return { textWidth: range.getBoundingClientRect().width, available: line.clientWidth };
      });
      return { page: document.documentElement.scrollWidth, viewport: window.innerWidth, lines };
    });
    expect(dimensions.page, `overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
    for (const line of dimensions.lines) expect(line.textWidth, `headline clipped at ${width}px`).toBeLessThanOrEqual(line.available + 1);
  }
});

test("the page and open menu pass WCAG AA automated checks", async ({ page }) => {
  await page.goto("/");
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(result.violations).toEqual([]);
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  const menuResult = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(menuResult.violations).toEqual([]);
});

test("normal motion reveals the story and reduced motion restores untransformed content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".hero-copy")).toHaveCSS("opacity", "1", { timeout: 6000 });
  await page.locator(".story-heading").scrollIntoViewIfNeeded();
  await expect(page.locator(".story-heading")).toHaveCSS("opacity", "1", { timeout: 6000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".ribbon-track")).toHaveCSS("transform", "none");
  await expect(page.locator(".story-heading")).toHaveCSS("transform", "none");
  await expect(page.locator(".hero-copy")).toHaveCSS("opacity", "1");
});

test("the keyboard skip link reaches the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});
