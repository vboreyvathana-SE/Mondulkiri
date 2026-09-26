const API_URL = "http://localhost:8000";

export async function getProducts() {
    const response = await fetch(`${API_URL}/products/index.php`);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const result = await response.json();

    return result.data;
}

