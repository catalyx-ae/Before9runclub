import { expect, test } from "@playwright/test";

test("both official portraits decode on Founders, Our Story, and the home preview", async ({ page, request }) => {
  for (const name of ["selim", "enes"]) {
    const original = await request.get(`/media/founders/${name}.jpg`);
    expect(original.status()).toBe(200);
    expect(original.headers()["content-type"]).toContain("image/jpeg");
    expect((await original.body()).subarray(0, 2).toString("hex")).toBe("ffd8");
  }
  for (const route of ["/founders", "/story", "/"]) {
    await page.goto(route);
    for (const name of ["Selim", "Enes"]) {
      const image = page.getByRole("img", { name: new RegExp(`^${name}, co-founder of Before 9,`) });
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
      const source = new URL(await image.evaluate((element: HTMLImageElement) => element.currentSrc));
      expect(source.searchParams.get("url")).toBe(`/media/founders/${name.toLowerCase()}.jpg`);
    }
    await expect(page.locator(".founder-photo-pending")).toHaveCount(0);
  }
});

test("cinematic portraits reveal, expand, and reset cleanly for reduced motion", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/founders");
  const split = page.locator(".founder-split");
  await split.scrollIntoViewIfNeeded();
  const selim = page.getByRole("button", { name: "Meet Selim", exact: true });
  const enes = page.getByRole("button", { name: "Meet Enes", exact: true });

  // Neither the reveal mask nor an offscreen letter should conceal the names.
  await expect.poll(() => page.locator(".founder-portrait-reveal").first().evaluate(element => getComputedStyle(element).clipPath)).toBe("inset(0%)");
  await expect.poll(() => page.locator(".founder-letter").first().evaluate(element => Math.abs(new DOMMatrixReadOnly(getComputedStyle(element).transform).m42))).toBeLessThan(.5);

  if (testInfo.project.name === "desktop") {
    await selim.hover({ position: { x: 100, y: 100 } });
    await expect.poll(async () => (await selim.boundingBox())!.width - (await enes.boundingBox())!.width).toBeGreaterThan(100);
    await expect.poll(() => page.locator(".panel-selim .founder-portrait-depth").evaluate(element => Math.abs(new DOMMatrixReadOnly(getComputedStyle(element).transform).m41))).toBeGreaterThan(1);
  } else {
    expect(Math.abs((await selim.boundingBox())!.width - (await enes.boundingBox())!.width)).toBeLessThan(2);
  }

  await enes.focus();
  await page.keyboard.press("Enter");
  await expect(enes).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#founder-profile h2")).toHaveText("Enes.");
  await page.keyboard.press("Escape");
  await expect(enes).toHaveAttribute("aria-expanded", "false");

  // Switching the OS preference also cancels already-running pointer/entrance motion.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".panel-selim .founder-portrait-depth")).toHaveCSS("transform", "none");
  await expect(page.locator(".founder-letter").first()).toHaveCSS("transform", "none");
  await selim.click();
  await expect(selim).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#founder-profile h2")).toHaveText("Selim.");
  expect(errors).toEqual([]);
});

test("Our Story retains both founder identities throughout its four scenes", async ({ page }) => {
  await page.goto("/story");
  await expect(page.locator(".documentary-portrait-card figcaption > span:first-child")).toHaveText(["Selim", "Enes"]);
  const scenes = page.getByRole("navigation", { name: "Story scenes" });
  for (const number of ["01", "02", "03", "04"]) {
    await scenes.getByRole("link", { name: number, exact: true }).click();
    await expect(scenes.getByRole("link", { name: number, exact: true })).toHaveAttribute("aria-current", "step");
    await expect(page.locator(".documentary-portrait-card")).toHaveCount(2);
  }
});
