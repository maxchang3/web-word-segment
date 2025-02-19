const URL_REGEX = /(?:http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+(?:[\-.][a-z0-9]+)*\.[a-z]{2,63}(?::\d{1,5})?(?:\/\S*)?/gi

const EMAIL_REGEX = /[a-z0–9._-]+@[a-z0–9.-]+\.[a-z]{2,4}/gi

export const URL_EMAIL_REGEX = new RegExp(`${EMAIL_REGEX.source}|${URL_REGEX.source}`, 'gi')
