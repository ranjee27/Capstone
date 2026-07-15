const STORAGE_KEY = "settings-form-demo";

function buildSettingsSummary(values) {
  const notifications = [];

  if (values.emailUpdates) {
    notifications.push("Email updates");
  }

  if (values.productTips) {
    notifications.push("Product tips");
  }

  return {
    name: values.name?.trim() || "—",
    email: values.email?.trim() || "—",
    theme: values.theme || "System default",
    language: values.language || "English",
    notifications: notifications.length > 0 ? notifications.join(", ") : "None",
  };
}

function validateSettings(values) {
  const errors = [];

  if (!values.name?.trim()) {
    errors.push("Display name is required.");
  }

  if (!values.email?.trim()) {
    errors.push("Email address is required.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.push("Enter a valid email address.");
  }

  return errors;
}

function getFormValues(form) {
  const data = new FormData(form);

  return {
    name: data.get("name")?.toString() || "",
    email: data.get("email")?.toString() || "",
    emailUpdates: data.has("emailUpdates"),
    productTips: data.has("productTips"),
    theme: data.get("theme")?.toString() || "system",
    language: data.get("language")?.toString() || "english",
  };
}

function renderSummary(summary) {
  if (typeof document === "undefined") {
    return;
  }

  document.getElementById("preview-name").textContent = summary.name;
  document.getElementById("preview-email").textContent = summary.email;
  document.getElementById("preview-theme").textContent = summary.theme;
  document.getElementById("preview-language").textContent = summary.language;
  document.getElementById("preview-notifications").textContent = summary.notifications;
}

function renderStatus(message, isSuccess = true) {
  if (typeof document === "undefined") {
    return;
  }

  const status = document.getElementById("status");
  status.textContent = message;
  status.style.color = isSuccess ? "#0f766e" : "#b91c1c";
}

function loadSavedSettings(form) {
  if (typeof window === "undefined") {
    return;
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return;
  }

  try {
    const parsed = JSON.parse(saved);
    form.elements.name.value = parsed.name || "";
    form.elements.email.value = parsed.email || "";
    form.elements.emailUpdates.checked = Boolean(parsed.emailUpdates);
    form.elements.productTips.checked = Boolean(parsed.productTips);
    form.elements.theme.value = parsed.theme || "system";
    form.elements.language.value = parsed.language || "english";
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

function saveSettings(values) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
}

function initializeSettingsForm() {
  if (typeof document === "undefined") {
    return;
  }

  const form = document.getElementById("settings-form");

  if (!form) {
    return;
  }

  loadSavedSettings(form);
  renderSummary(buildSettingsSummary(getFormValues(form)));

  form.addEventListener("input", () => {
    renderSummary(buildSettingsSummary(getFormValues(form)));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const values = getFormValues(form);
    const errors = validateSettings(values);

    if (errors.length > 0) {
      renderStatus(errors[0], false);
      return;
    }

    saveSettings(values);
    renderSummary(buildSettingsSummary(values));
    renderStatus("Settings saved successfully.");
  });
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", initializeSettingsForm);
}

if (typeof module !== "undefined") {
  module.exports = {
    buildSettingsSummary,
    initializeSettingsForm,
    validateSettings,
  };
}
