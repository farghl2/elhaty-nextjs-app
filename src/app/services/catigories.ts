export async function getCategories() {
  const res = await fetch("/api/categories")
  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json()
}