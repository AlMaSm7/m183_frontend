export const isPasswordComplex = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}