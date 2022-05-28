import { login } from "./login.js";
import { refreshToken } from "./refreshToken.js";
import { validation } from "./validation/index.js";

export const authentication = {
    login: login,
    refreshToken: refreshToken,
    validation: validation
};
