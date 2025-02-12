// Save session
export const authentication = (_id:string, token:string) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("token", JSON.stringify(token));
        sessionStorage.setItem("user", JSON.stringify(_id));
    }
}

// Get session
export const getToken = () => {
    if (typeof window !== "undefined") {
        const token = sessionStorage.getItem("token");
        if (token) {
            return JSON.parse(token);
        } else {
            return false;
        }
    }
}

// Get user
export const getUser = () => {
    if (typeof window !== "undefined") {
        const user = sessionStorage.getItem("user");
        if (user) {
            return JSON.parse(user);
        } else {
            return false;
        }
    }
}

// Logout
export const logout = () => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location.href = "/";
    }
}