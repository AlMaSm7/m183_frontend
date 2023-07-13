export const isEmailValid = (email: string): boolean => {
    const emailRegex = /.*@.*\.[a-z]{2,3}/i;
    return email !== null && email !== "" && emailRegex.test(email);
}