import request from 'superagent'

const rootUrl = '/api/v1'

export function getPresets(): Promise<Preset[]> {
  return request.get(rootUrl + '/synth').then((res) => {
    return res.body.presets
  })
}
