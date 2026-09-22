const API_URL = "http://127.0.0.1:8000";

export async function getProducts() {
    const response = await fetch(`${API_URL}/products/`);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const result = await response.json();

    return result.data;
}