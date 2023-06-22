

export function useGetJWT() {
    return sessionStorage.getItem("JWT");
}