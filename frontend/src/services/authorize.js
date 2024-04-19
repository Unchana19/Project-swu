export const authenticate = (response, next) => {
    if (window !== "undefinded") {
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("username", JSON.stringify(response.data.username));
    }
    next();
}

export const getSession = (item) => {
    if (window !== "undefined") {
        if (sessionStorage.getItem(item)) {
            return JSON.parse(sessionStorage.getItem(item));
        } else {
            return false;
        }
    }
}

export const logout = (next) => {
    if (window !== "undefined") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
    }
    next();
}