import axios from "axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const getRefreshToken = async () => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_FRONT_OFFICE}/auth/refresh-token`,
        {
            refreshToken: cookie.get("refreshToken"),
        },
    );
};
const baseEndpoint = `${process.env.NEXT_PUBLIC_KEY_CLOCK_URL}/protocol/openid-connect/logout`;

export const logoutRequest = async () => {
    const body = new URLSearchParams();
    body.append(
        "client_id",
        process.env.NEXT_PUBLIC_KEY_CLOCK_CLIENT_ID as string,
    );
    body.append(
        "client_secret",
        process.env.NEXT_PUBLIC_KEY_CLOCK_CLIENT_SECRET as string,
    );
    body.append("refresh_token", cookie.get("refreshToken"));

    return await fetch(baseEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
    });
};

export const login = async ({
    grantType,
    code,
    scope,
}: {
    grantType: string;
    code: string;
    scope: string;
}) => {
    const body = new URLSearchParams();
    body.append(
        "client_id",
        process.env.NEXT_PUBLIC_KEY_CLOCK_CLIENT_ID as string,
    );
    body.append("grant_type", grantType);
    body.append("code", code);
    body.append("scope", scope);
    body.append("redirect_uri", process.env.NEXT_PUBLIC_DOMAIN as string);
    body.append(
        "client_secret",
        process.env.NEXT_PUBLIC_KEY_CLOCK_CLIENT_SECRET as string,
    );

    return await fetch(
        `${process.env.NEXT_PUBLIC_KEY_CLOCK_URL}/protocol/openid-connect/token`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),
        },
    );
};
