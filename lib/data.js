export const fetchData = async (url) => {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return [data, null]
  } catch (error) {
    // console.error(error)
    return [null, error]
  }
}