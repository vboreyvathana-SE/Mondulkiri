const API_URL = "http://localhost:8000";

export async function loginUser({ email, password }) {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    const response = await fetch(`${API_URL}/users/login.php`, {
        method: "POST",
        body: formData,
        credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Wrong email or password.");
    }

    return result;
}

export async function registerUser({
    firstName,
    lastName,
    email,
    password,
    accountType,
}) {
    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("account_type", accountType);
    formData.append("submit", "true");

    const response = await fetch(`${API_URL}/users/register.php`, {
        method: "POST",
        body: formData,
        credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Could not create your account.");
    }

    return result;
}

export async function isLoggedIn() {
    try {
        const response = await fetch(`${API_URL}/Auth/check-auth.php`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            return false;
        }

        const result = await response.json();

        return result.success === true;
    } catch {
        return false;
    }
}

export async function logoutUser() {
    const response = await fetch(`${API_URL}/users/logout.php`, {
        method: "POST",
        credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Could not log out.");
    }

    return result;
}
