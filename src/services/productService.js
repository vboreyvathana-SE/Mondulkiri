const API_URL = "http://localhost:8000";

export async function getProducts() {
    const response = await fetch(`${API_URL}/products/index.php`);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const result = await response.json();

    return result.data;
}

// NEW: fetch one product by id
export async function getProductById(id) {
    const response = await fetch(
        `${API_URL}/products/index.php?id=${encodeURIComponent(id)}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }

    const result = await response.json();

    return result.data;
}

// NEW: builds a safe image URL from the `image` column.
// Handles a leading slash (/Images/care-pack.jpg) and spaces (Images/red honey furment.jpg).
export function getImageUrl(path) {
    if (!path) return "";
    return `${API_URL}/${encodeURI(path.replace(/^\/+/, ""))}`;
}

export async function checkoutCart(items) {
    const response = await fetch(`${API_URL}/orders/checkout.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            items: items.map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
            })),
        }),
    });

    const result = await response.json();

    if (!response.ok) {
        const error = new Error(result.message || "Checkout failed");
        error.status = response.status;
        throw error;
    }

    return result;
}
