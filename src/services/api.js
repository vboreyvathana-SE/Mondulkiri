const API_URL = "http://localhost:8000";

export async function testAPI() {
    const response = await fetch(`${API_URL}/test.php`);

    const data = await response.json();

    return data;
}

