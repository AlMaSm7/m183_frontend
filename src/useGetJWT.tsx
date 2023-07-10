

export function useGetJWT() {
    return sessionStorage.getItem("jwt");
}