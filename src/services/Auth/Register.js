const API_URL = "http://localhost:8000";

export async function registerUser(userData) {
    const formData = new FormData();

    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("account_type", userData.account_type);
    formData.append("submit", "true");

    const response = await fetch(`${API_URL}/users/register.php`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to register");
    }

    const result = await response.json();

    return result;
}

export async function loginUser(userData) {
    const formData = new FormData();

    formData.append("email", userData.email);
    formData.append("password", userData.password);

    const response = await fetch(`${API_URL}/users/login.php`, {
        method: "POST",
        body: formData,
        credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to login");
    }

    return result;
}