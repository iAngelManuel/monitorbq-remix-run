export async function getPosts() {
  const url = `${process.env.API_URL}/posts?populate=imagen`
  const response = await fetch(url)
  const result = await response.json()
  return result
}

export async function getPost(params) {
  const url = `${process.env.API_URL}/posts/?filters[url]=${params}&populate=imagen`
  const response = await fetch(url)
  const result = await response.json()
  return result
}