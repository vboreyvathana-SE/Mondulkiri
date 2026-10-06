const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    ...options,
  })
  const result = await response.json().catch(() => ({}))

  if (!response.ok || !result.success) {
    const error = new Error(result.message || 'Admin request failed')
    error.status = response.status
    throw error
  }

  return result.data
}

export function getDashboard() {
  return request('/admin/dashboard.php')
}

export function getPurchases() {
  return request('/admin/purchases.php')
}

export function getAccounts() {
  return request('/admin/users.php')
}

export async function updateProduct(product, imageFile) {
  const formData = new FormData()
  const fields = [
    'id', 'product_code', 'product_type', 'name', 'description', 'price',
    'roast_profile', 'flavor_notes', 'grind', 'weight', 'stock',
  ]

  fields.forEach((field) => formData.append(field, product[field] ?? ''))
  if (imageFile) formData.append('image', imageFile)

  return request('/products/update.php', {
    method: 'POST',
    body: formData,
  })
}
