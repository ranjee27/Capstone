"use client"

import { useMemo, useState } from "react"
import type { FocusEvent, FormEvent } from "react"

type FieldName = "displayName" | "email" | "bio"

type FormValues = Record<FieldName, string>
type FormErrors = Partial<Record<FieldName, string>>

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(name: FieldName, value: string): string | undefined {
  const trimmed = value.trim()

  switch (name) {
    case "displayName":
      if (trimmed.length === 0) return "Display name is required"
      if (trimmed.length < 2) return "Display name must be at least 2 characters"
      if (trimmed.length > 50) return "Display name must be 50 characters or fewer"
      return undefined
    case "email":
      if (trimmed.length === 0) return "Email is required"
      if (!EMAIL_REGEX.test(trimmed)) return "Enter a valid email address"
      return undefined
    case "bio":
      if (value.length > 200) return "Bio must be 200 characters or fewer"
      return undefined
    default:
      return undefined
  }
}

function validateAll(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  ;(Object.keys(values) as FieldName[]).forEach((name) => {
    const error = validateField(name, values[name])
    if (error) errors[name] = error
  })
  return errors
}

export function SettingsForm() {
  const [values, setValues] = useState<FormValues>({
    displayName: "",
    email: "",
    bio: "",
  })
  // Only fields that have been blurred (and thus can show errors) are tracked here.
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "saved">("idle")

  const allErrors = useMemo(() => validateAll(values), [values])
  const isFormValid = Object.keys(allErrors).length === 0

  function handleChange(name: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }))

    // If a saved state was showing, revert to idle when the user edits again.
    if (status === "saved") setStatus("idle")

    // Re-validate on keystroke ONLY if this field already has a visible error,
    // so it can clear immediately once the value becomes valid.
    setErrors((prev) => {
      if (!(name in prev)) return prev
      const error = validateField(name, value)
      const next = { ...prev }
      if (error) next[name] = error
      else delete next[name]
      return next
    })
  }

  function handleBlur(name: FieldName, event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const error = validateField(name, event.target.value)
    setErrors((prev) => {
      const next = { ...prev }
      if (error) next[name] = error
      else delete next[name]
      return next
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateAll(values)
    if (Object.keys(nextErrors).length > 0) {
      // Surface all errors on a blocked submit.
      setErrors(nextErrors)
      return
    }

    // Disable immediately to prevent double submission.
    setStatus("submitting")

    // Simulate a save. The form intentionally keeps the user's values.
    setTimeout(() => {
      setStatus("saved")
    }, 600)
  }

  const submitDisabled = !isFormValid || status === "submitting" || status === "saved"

  const feedback =
    status === "saved"
      ? "Your settings have been saved."
      : !isFormValid && Object.keys(errors).length > 0
        ? "Some fields need your attention before saving."
        : ""

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Display name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="displayName" className="text-sm font-medium text-foreground">
          Display name
          <span className="ml-1 text-destructive" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          value={values.displayName}
          onChange={(e) => handleChange("displayName", e.target.value)}
          onBlur={(e) => handleBlur("displayName", e)}
          required
          aria-required="true"
          aria-invalid={errors.displayName ? "true" : undefined}
          aria-describedby={errors.displayName ? "displayName-error" : undefined}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 aria-[invalid=true]:border-destructive"
        />
        {errors.displayName ? (
          <p id="displayName-error" className="text-sm text-destructive">
            {errors.displayName}
          </p>
        ) : null}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
          <span className="ml-1 text-destructive" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={(e) => handleBlur("email", e)}
          required
          aria-required="true"
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 aria-[invalid=true]:border-destructive"
        />
        {errors.email ? (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email}
          </p>
        ) : null}
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="bio" className="text-sm font-medium text-foreground">
            Bio
          </label>
          <span className="text-xs text-muted-foreground" aria-hidden="true">
            {values.bio.length}/200
          </span>
        </div>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          value={values.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          onBlur={(e) => handleBlur("bio", e)}
          aria-invalid={errors.bio ? "true" : undefined}
          aria-describedby={errors.bio ? "bio-error" : "bio-hint"}
          className="resize-y rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 aria-[invalid=true]:border-destructive"
        />
        {errors.bio ? (
          <p id="bio-error" className="text-sm text-destructive">
            {errors.bio}
          </p>
        ) : (
          <p id="bio-hint" className="text-sm text-muted-foreground">
            Optional. Up to 200 characters.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitDisabled}
        aria-disabled={submitDisabled}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "saved" ? "Saved" : status === "submitting" ? "Saving…" : "Save changes"}
      </button>

      {/* Announces validation + success feedback to assistive tech. */}
      <div aria-live="polite" role="status" className="min-h-5 text-sm">
        {feedback ? (
          <p className={status === "saved" ? "text-foreground" : "text-destructive"}>{feedback}</p>
        ) : null}
      </div>
    </form>
  )
}
