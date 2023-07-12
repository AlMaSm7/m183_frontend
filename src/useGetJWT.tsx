export const useGetJWT = () => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");

    const firstCookie = cookies[0].trim();
    const jwtToken = firstCookie.substring(4);

    return jwtToken !== "" ? jwtToken : null;
};
