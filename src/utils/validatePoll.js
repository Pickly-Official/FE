export function validatePoll(poll) {
  return Boolean(poll?.title && poll?.photos?.length);
}
