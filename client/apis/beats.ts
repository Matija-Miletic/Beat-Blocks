import request from 'superagent'

const rootUrl = '/api/v1'

export function getBeats(): Promise<string[]> {
  return request.get(`${rootUrl}/beats`).then((res) => {
    return res.body.beats
  })
}

export async function getBeatByName(name: string) {
  // console.log('getting by name:', name)
  const response = await request.get(`${rootUrl}/beats/${name}`)
  return response.body
}
