import { useState, useEffect } from "react"
import { firestoreCRUD } from "@/utils/firestoreCRUD"

export const useCrudService = (collcetionName) => {
  const [Items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { addItem, updateItem, deleteItem, getItems, getItemById } = firestoreCRUD(collcetionName);
  const [selectedItem, setSelectedItem] = useState(null)

  const useGetAll = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getItems()
      setItems(data)
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const useCreate = async (data) => {
    setLoading(true)
    setError(null)
    try {
      await addItem(data)
      await useGetAll()
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const useEdit = async (id, data) => {
    setLoading(true)
    setError(null)
    try {
      await updateItem(id, data)
      await useGetAll()
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const useGetById = async (id) => {
    setLoading(true)
    setError(null)
    try {
      const customer = await getItemById(id)
      setSelectedItem(customer)
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const useDelete = async (id) => {
    setLoading(true)
    setError(null)
    try {
      await deleteItem(id)
      await useGetAll()
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const closeView = () => {
    setSelectedItem(null)
  }

  useEffect(() => {
    useGetAll()
  }, [])

  return { Items, loading, error, useGetAll, useCreate, useEdit, useDelete, useGetById, selectedItem, closeView }
}