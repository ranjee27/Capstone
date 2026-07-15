"use client";

import { ChangeEvent, FocusEvent, FormEvent, useMemo, useState } from 'react';

type FormValues = {
  displayName: string;
  email: string;
  bio: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type FieldName = keyof FormValues;

const initialValues: FormValues = {
  displayName: '',
  email: '',
  bio: '',
};

function validateField(name: FieldName, value: string): string | undefined {
  if (name === 'displayName') {
    const trimmed = value.trim();
    if (!trimmed) {
      return 'Display name is required';
    }
    if (trimmed.length < 2 || trimmed.length > 50) {
      return 'Display name must be between 2 and 50 characters';
    }
  }

  if (name === 'email') {
    const trimmed = value.trim();
    if (!trimmed) {
      return 'Email is required';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) {
      return 'Email must be a valid email address';
    }
  }

  if (name === 'bio') {
    const trimmed = value.trim();
    if (trimmed.length > 200) {
      return 'Bio must be 200 characters or fewer';
    }
  }

  return undefined;
}

function validateForm(values: FormValues): FormErrors {
  return {
    displayName: validateField('displayName', values.displayName),
    email: validateField('email', values.email),
    bio: validateField('bio', values.bio),
  };
}

export function SettingsForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidSubmit, setIsValidSubmit] = useState(false);

  const preview = useMemo(() => {
    return {
      displayName: values.displayName.trim() || '—',
      email: values.email.trim() || '—',
      bio: values.bio.trim() || 'No bio provided',
    };
  }, [values]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const fieldName = name as FieldName;

    setValues((current) => ({ ...current, [fieldName]: value }));

    if (isSubmitted) {
      setIsSubmitted(false);
    }

    if (isValidSubmit) {
      setIsValidSubmit(false);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const fieldName = name as FieldName;
    const nextError = validateField(fieldName, value);

    setErrors((current) => ({
      ...current,
      [fieldName]: nextError,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      setIsValidSubmit(false);
      setIsSubmitted(false);
      return;
    }

    setIsValidSubmit(true);
    setIsSubmitted(true);
  };

  const isFormInvalid = Object.values(validateForm(values)).some(Boolean);

  const liveMessage = isSubmitted ? 'Success: your settings have been saved.' : '';

  return (
    <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-900">Profile settings</h2>
          <p className="text-sm text-slate-600">Update your profile details below.</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="displayName" className="block text-sm font-medium text-slate-700">
            Display name
          </label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            value={values.displayName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={Boolean(errors.displayName)}
            aria-describedby={errors.displayName ? 'displayName-error' : undefined}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Enter your display name"
          />
          {errors.displayName ? (
            <p id="displayName-error" role="alert" className="text-sm text-red-600">
              {errors.displayName}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="name@example.com"
          />
          {errors.email ? (
            <p id="email-error" role="alert" className="text-sm text-red-600">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="bio" className="block text-sm font-medium text-slate-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={values.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.bio)}
            aria-describedby={errors.bio ? 'bio-error' : undefined}
            className="min-h-28 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Tell us a little about yourself"
          />
          {errors.bio ? (
            <p id="bio-error" role="alert" className="text-sm text-red-600">
              {errors.bio}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isFormInvalid || isValidSubmit}
            className="rounded-full bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isValidSubmit ? 'Saved' : 'Save settings'}
          </button>
          <div aria-live="polite" className="text-sm font-medium text-emerald-700">
            {liveMessage}
          </div>
        </div>
      </form>

      <aside className="rounded-2xl bg-slate-50 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Preview
        </h3>
        <dl className="mt-4 space-y-3 text-sm text-slate-700">
          <div>
            <dt className="font-medium">Display name</dt>
            <dd className="mt-1 text-slate-900">{preview.displayName}</dd>
          </div>
          <div>
            <dt className="font-medium">Email</dt>
            <dd className="mt-1 text-slate-900">{preview.email}</dd>
          </div>
          <div>
            <dt className="font-medium">Bio</dt>
            <dd className="mt-1 text-slate-900">{preview.bio}</dd>
          </div>
        </dl>
      </aside>
    </section>
  );
}
