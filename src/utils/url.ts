const getUrlId = (url: string): string => {
  return url
    .replace("-/merge_requests/", "")
    .replace("http://", "")
    .replace("https://", "");
};

export const getUrlInString = (string: string): string | null => {
  const urlRegex = /(https?:\/\/[^\s]*)/;
  const matches = string.match(urlRegex) ?? [];
  return matches[0];
};
