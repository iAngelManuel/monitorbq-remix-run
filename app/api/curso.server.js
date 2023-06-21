export async function getCursos() {
  const url = `${process.env.API_URL}/curso?populate=imagen`
  const response = await fetch(url)
  const result = await response.json()
  return result
}
