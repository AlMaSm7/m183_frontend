export const setCookieToNull = () => {
    const expirationDate = new Date(0).toUTCString();  // Set expiration to a past date
    document.cookie = `jwt=; expires=${expirationDate}; path=/`;
}
