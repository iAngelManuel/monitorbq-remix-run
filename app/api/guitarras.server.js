
export async function getGuitarras() {
  const url = `${process.env.API_URL}/guitarras?populate=imagen`
  const response = await fetch(url)
  const result = await response.json()
  return result
}

export async function getGuitarra(params) {
  const url = `${process.env.API_URL}/guitarras?filters[url]=${params}&populate=imagen`
  const response = await fetch(url)
  const result = await response.json()
  return result
}
