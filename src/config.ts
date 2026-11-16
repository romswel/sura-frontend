const configuredEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() ?? ''

/** Public business contact only; never infer it from repository metadata. */
export const contactEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(configuredEmail)
  ? configuredEmail
  : ''
