const test = require("node:test");
const assert = require("node:assert/strict");
const { buildSettingsSummary, validateSettings } = require("./app.js");

test("validateSettings reports missing required fields", () => {
  const errors = validateSettings({ name: "", email: "" });

  assert.deepStrictEqual(errors, ["Display name is required.", "Email address is required."]);
});

test("buildSettingsSummary formats the preview data", () => {
  const summary = buildSettingsSummary({
    name: "Ada",
    email: "ada@example.com",
    theme: "dark",
    language: "french",
    emailUpdates: true,
    productTips: false,
  });

  assert.deepStrictEqual(summary, {
    name: "Ada",
    email: "ada@example.com",
    theme: "dark",
    language: "french",
    notifications: "Email updates",
  });
});
