import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../../config/config'
import { useParams, useNavigate } from 'react-router-dom'

const CreatePage = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  // if id is present, fetch existing product
  useEffect(() => {
    if (!id) return
    setLoadingProduct(true)
    axios.get(`${url}/api/products/${id}`)
      .then(res => {
        const p = res?.data?.message || res?.data?.product || res?.data?.data || res?.data
        if (p) {
          setName(p.name || "")
          setPrice(p.price !== undefined && p.price !== null ? String(p.price) : "")
          setImage(p.image || "")
        }
      })
      .catch(err => console.log("Error fetching product:", err))
      .finally(() => setLoadingProduct(false))
  }, [id])

  // create or update product
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !price || !image) return alert("Please fill all fields")

    try {
      setIsSubmitting(true)
      if (id) {
        await axios.put(`${url}/api/products/${id}`, { name, price, image })
        alert("Product updated successfully")
      } else {
        await axios.post(`${url}/api/products`, { name, price, image })
        alert("Product created successfully")
      }
      navigate("/")
    } catch (error) {
      console.error(error)
      alert("Operation failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition px-4'>
      <div className='bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-[520px] border border-gray-100 dark:border-gray-700'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
            {id ? "Update Product" : "Create New Product"}
          </h2>
          {image ? (
            <div className='w-12 h-12 overflow-hidden rounded-lg ring-1 ring-gray-200 dark:ring-gray-700'>
              <img src={image} alt="preview" className='w-full h-full object-cover' />
            </div>
          ) : null}
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='e.g. AirPods Pro'
              className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>Price (USD)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='e.g. 199.99'
              className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder='https://...'
              className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {image ? (
            <div className='mt-2 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0b1220]'>
              <img src={image} alt="preview-large" className='w-full h-56 object-cover' />
            </div>
          ) : null}

          <div className='flex items-center gap-3 pt-2'>
            <button
              type="submit"
              disabled={isSubmitting || loadingProduct}
              className={`flex-1 mt-2 bg-sky-600 hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition`}
            >
              {isSubmitting || loadingProduct ? (id ? "Updating..." : "Creating...") : (id ? "Update Product" : "Add Product")}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className='mt-2 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#0f172a] transition'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePage