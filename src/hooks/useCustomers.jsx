import { useState, useEffect } from "react"
import { addItem, updateItem, deleteItem, getItems, getCustomerById } from "@/utils/firestoreCRUD"

export const useCustomers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const fetchCustomers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getItems()
      setCustomers(data)
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const createCustomer = async (data) => {
    setLoading(true)
    setError(null)
    try {
      await addItem(data)
      await fetchCustomers()
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const editCustomer = async (id, data) => {
    setLoading(true)
    setError(null)
    try {
      await updateItem(id, data)
      await fetchCustomers()
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const getCustomerByIdWrapper = async (id) => {
    setLoading(true)
    setError(null)
    try {
      const customer = await getCustomerById(id)
      setSelectedCustomer(customer)
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const removeCustomer = async (id) => {
    setLoading(true)
    setError(null)
    try {
      await deleteItem(id)
      await fetchCustomers()
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const closeCustomerView = () => {
    setSelectedCustomer(null)
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return { customers, loading, error, fetchCustomers, createCustomer, editCustomer, removeCustomer, getCustomerByIdWrapper, selectedCustomer, closeCustomerView }
}