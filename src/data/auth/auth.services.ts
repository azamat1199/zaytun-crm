import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const logout = () => {
    cookie.remove("refreshToken", { path: "/" });
    cookie.remove("accessToken", { path: "/" });
    window.location.reload();
};
