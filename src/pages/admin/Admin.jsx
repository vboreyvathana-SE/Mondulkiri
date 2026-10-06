import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts, getImageUrl } from '../../services/productService'
import { getAccounts, getDashboard, getPurchases, updateProduct } from '../../services/adminService'
import { formatMoney } from '../../utils/formatMoney'

const editableFields = [
  ['product_code', 'Product code'],
  ['product_type', 'Product type'],
  ['name', 'Name'],
  ['price', 'Price', 'number'],
  ['stock', 'Stock', 'number'],
  ['weight', 'Weight'],
  ['grind', 'Grind'],
  ['roast_profile', 'Roast profile'],
  ['flavor_notes', 'Flavor notes'],
]

function toEditForm(product) {
  return {
    id: product.id,
    product_code: product.product_code || '',
    product_type: product.product_type || '',
    name: product.name || '',
    description: product.description || '',
    price: product.price ?? '',
    roast_profile: product.roast_profile || '',
    flavor_notes: product.flavor_notes || '',
    grind: product.grind || '',
    weight: product.weight || '',
    stock: product.stock ?? '',
    image: product.image || '',
  }
}

function displayDate(value) {
  if (!value) return 'Not recorded'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Not recorded' : date.toLocaleString()
}

export default function Admin() {
  const navigate = useNavigate()
  const [dashboard, setDashboard] = useState(null)
  const [products, setProducts] = useState([])
  const [purchases, setPurchases] = useState([])
  const [accounts, setAccounts] = useState([])
  const [selected, setSelected] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const loadDashboard = useCallback(async ({ refresh = false } = {}) => {
    if (refresh) {
      setLoading(true)
      setError('')
    }

    try {
      const [summary, productList, purchaseList, accountList] = await Promise.all([
        getDashboard(), getProducts(), getPurchases(), getAccounts(),
      ])
      setDashboard(summary)
      setProducts(productList)
      setPurchases(purchaseList)
      setAccounts(accountList)
    } catch (err) {
      if (err.status === 401) {
        navigate('/login', { replace: true, state: { from: '/admin' } })
        return
      }
      setError(err.message || 'Unable to load the admin dashboard.')
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadDashboard()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [loadDashboard])

  function startEditing(product) {
    setSelected(toEditForm(product))
    setImageFile(null)
    setNotice('')
  }

  function updateField(event) {
    const { name, value } = event.target
    setSelected((current) => ({ ...current, [name]: value }))
  }

  async function saveProduct(event) {
    event.preventDefault()
    if (!selected) return

    setSaving(true)
    setError('')
    setNotice('')

    try {
      const updated = await updateProduct(selected, imageFile)
      setProducts((current) => current.map((product) => (
        String(product.id) === String(updated.id) ? updated : product
      )))
      setSelected(toEditForm(updated))
      setImageFile(null)
      setNotice('Product details saved.')
    } catch (err) {
      if (err.status === 401) {
        navigate('/login', { replace: true, state: { from: '/admin' } })
        return
      }
      setError(err.message || 'Unable to save product details.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <main className='main-bg min-h-screen p-8 text-[#d5c4b1]'>Loading admin dashboard…</main>
  }

  if (error && !dashboard) {
    return <main className='main-bg min-h-screen p-8 text-red-300'>{error}</main>
  }

  return (
    <main className='main-bg min-h-screen px-4 py-8 text-white sm:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8 flex flex-wrap items-end justify-between gap-4'>
          <div>
            <p className='text-xs font-bold uppercase tracking-[0.2em] text-[#f5b44c]'>Operations</p>
            <h1 className='mt-1 font-head text-4xl'>Admin Dashboard</h1>
            <p className='mt-2 text-sm text-[#9b9897]'>Manage the catalogue, customer accounts, and recorded purchases.</p>
          </div>
          <button type='button' onClick={() => loadDashboard({ refresh: true })} className='rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/10'>Refresh data</button>
        </div>

        {error && <p role='alert' className='mb-6 rounded-lg bg-red-950/60 p-3 text-sm text-red-300'>{error}</p>}
        {notice && <p role='status' className='mb-6 rounded-lg bg-emerald-950/60 p-3 text-sm text-emerald-300'>{notice}</p>}

        <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-5'>
          <Metric label='Recorded revenue' value={formatMoney(dashboard.revenue)} />
          <Metric label='Purchase lines' value={dashboard.purchase_count} />
          <Metric label='Items sold' value={dashboard.items_sold} />
          <Metric label='Signed-up accounts' value={dashboard.account_count} />
          <Metric label='Products' value={dashboard.product_count} />
        </section>

        <section className='mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]'>
          <div className='rounded-xl bg-[#292321] p-5'>
            <h2 className='font-head text-2xl'>Product catalogue</h2>
            <p className='mb-4 text-sm text-[#9b9897]'>Select a product to edit its details or upload a replacement image.</p>
            <div className='max-h-[620px] overflow-auto'>
              <table className='w-full min-w-[600px] text-left text-sm'>
                <thead className='sticky top-0 bg-[#292321] text-xs uppercase tracking-wider text-[#9b9897]'>
                  <tr><th className='pb-3'>Product</th><th className='pb-3'>Price</th><th className='pb-3'>Stock</th><th className='pb-3'></th></tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className='border-t border-white/8'>
                      <td className='py-3'><div className='flex items-center gap-3'><img src={getImageUrl(product.image)} alt='' className='h-10 w-10 rounded bg-[#171311] object-contain' /><div><p className='font-medium'>{product.name}</p><p className='text-xs text-[#9b9897]'>{product.product_code}</p></div></div></td>
                      <td className='py-3 text-[#f5b44c]'>{formatMoney(product.price)}</td>
                      <td className='py-3'>{product.stock}</td>
                      <td className='py-3 text-right'><button type='button' onClick={() => startEditing(product)} className='rounded bg-[#f5b44c] px-3 py-1.5 text-xs font-bold text-[#292321] hover:bg-[#ffc15c]'>Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ProductEditor product={selected} imageFile={imageFile} onImageChange={setImageFile} onChange={updateField} onSubmit={saveProduct} saving={saving} onCancel={() => setSelected(null)} />
        </section>

        <section className='mt-8 rounded-xl bg-[#292321] p-5'>
          <h2 className='font-head text-2xl'>Purchase records</h2>
          <div className='mt-4 overflow-auto'>
            <table className='w-full min-w-[760px] text-left text-sm'>
              <thead className='text-xs uppercase tracking-wider text-[#9b9897]'><tr><th className='pb-3'>Customer</th><th className='pb-3'>Product</th><th className='pb-3'>Quantity</th><th className='pb-3'>Revenue</th><th className='pb-3'>Recorded</th></tr></thead>
              <tbody>{purchases.map((purchase, index) => <tr key={purchase.sale_id || `${purchase.user_id}-${purchase.product_id}-${index}`} className='border-t border-white/8'><td className='py-3'><p>{[purchase.first_name, purchase.last_name].filter(Boolean).join(' ') || 'Customer'}</p><p className='text-xs text-[#9b9897]'>{purchase.email}</p></td><td className='py-3'>{purchase.product_name}<span className='ml-2 text-xs text-[#9b9897]'>{purchase.product_code}</span></td><td className='py-3'>{purchase.quantity}</td><td className='py-3 text-[#f5b44c]'>{formatMoney(purchase.line_total)}</td><td className='py-3 text-[#9b9897]'>{displayDate(purchase.purchased_at)}</td></tr>)}</tbody>
            </table>
            {purchases.length === 0 && <p className='py-6 text-sm text-[#9b9897]'>No purchase records yet.</p>}
          </div>
        </section>

        <section className='mt-8 rounded-xl bg-[#292321] p-5'>
          <h2 className='font-head text-2xl'>Signed-up accounts</h2>
          <div className='mt-4 overflow-auto'>
            <table className='w-full min-w-[680px] text-left text-sm'>
              <thead className='text-xs uppercase tracking-wider text-[#9b9897]'><tr><th className='pb-3'>Account</th><th className='pb-3'>Email</th><th className='pb-3'>Type</th><th className='pb-3'>Joined</th></tr></thead>
              <tbody>{accounts.map((account) => <tr key={account.id} className='border-t border-white/8'><td className='py-3'>{[account.first_name, account.last_name].filter(Boolean).join(' ') || 'Unnamed account'}</td><td className='py-3 text-[#d5c4b1]'>{account.email}</td><td className='py-3 capitalize'>{account.account_type}</td><td className='py-3 text-[#9b9897]'>{displayDate(account.joined_at)}</td></tr>)}</tbody>
            </table>
            {accounts.length === 0 && <p className='py-6 text-sm text-[#9b9897]'>No accounts found.</p>}
          </div>
        </section>
      </div>
    </main>
  )
}

function Metric({ label, value }) {
  return <div className='rounded-xl bg-[#292321] p-4'><p className='text-xs uppercase tracking-wider text-[#9b9897]'>{label}</p><p className='mt-2 font-head text-3xl text-[#f5b44c]'>{value}</p></div>
}

function ProductEditor({ product, imageFile, onImageChange, onChange, onSubmit, saving, onCancel }) {
  if (!product) return <aside className='rounded-xl border border-dashed border-white/15 p-6 text-sm text-[#9b9897]'>Choose a product from the catalogue to edit it.</aside>

  return (
    <form onSubmit={onSubmit} className='rounded-xl bg-[#292321] p-5'>
      <div className='mb-5 flex items-center justify-between gap-3'><div><h2 className='font-head text-2xl'>Edit product</h2><p className='text-sm text-[#9b9897]'>Changes are saved directly to the catalogue.</p></div><button type='button' onClick={onCancel} className='text-sm text-[#9b9897] hover:text-white'>Close</button></div>
      <div className='grid gap-3 sm:grid-cols-2'>{editableFields.map(([name, label, type = 'text']) => <label key={name} className='text-xs text-[#d5c4b1]'>{label}<input required min={type === 'number' ? '0' : undefined} step={name === 'price' ? '0.01' : undefined} name={name} type={type} value={product[name]} onChange={onChange} className='mt-1 w-full rounded bg-[#171311] px-3 py-2 text-sm text-white outline-none ring-[#f5b44c] focus:ring-1' /></label>)}</div>
      <label className='mt-3 block text-xs text-[#d5c4b1]'>Description<textarea required name='description' value={product.description} onChange={onChange} rows='4' className='mt-1 w-full rounded bg-[#171311] px-3 py-2 text-sm text-white outline-none ring-[#f5b44c] focus:ring-1' /></label>
      <label className='mt-3 block text-xs text-[#d5c4b1]'>Replace product image<input accept='image/jpeg,image/png,image/webp' type='file' onChange={(event) => onImageChange(event.target.files?.[0] || null)} className='mt-1 block w-full text-sm text-[#d5c4b1] file:mr-3 file:rounded file:border-0 file:bg-[#f5b44c] file:px-3 file:py-2 file:text-xs file:font-bold file:text-[#292321]' /></label>
      {imageFile && <p className='mt-1 text-xs text-[#f5b44c]'>New image selected: {imageFile.name}</p>}
      <button disabled={saving} className='mt-5 w-full rounded bg-[#f5b44c] py-3 text-sm font-bold text-[#292321] hover:bg-[#ffc15c] disabled:opacity-60'>{saving ? 'Saving…' : 'Save product changes'}</button>
    </form>
  )
}