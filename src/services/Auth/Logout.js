export async function logoutUser() {
    const response = await fetch(`${API_URL}/users/logout.php`, {
        method: "POST",
        credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to logout");
    }

    return result;
}