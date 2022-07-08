export const uuid = () => {
  return (Math.random() * Date.now()).toString(16).substr(0, 8) + '-' +
    (Math.random() * Date.now()).toString(16).substr(0, 4) + '-' +
    (Math.random() * Date.now()).toString(16).substr(0, 4) + '-' +
    (Math.random() * Date.now()).toString(16).substr(0, 4) + '-' +
    (Math.random() * Date.now()).toString(16).substr(0, 6) +
    (Math.random() * Date.now()).toString(16).substr(0, 6)
}

export const getHostUrl = () => {
  const url = window.location.href
  const host = window.location.host
  const port = window.location.port
  const isHttps = url.includes('https:')
  return port === '3000' ? 'http://localhost:3012' : `http${isHttps ? 's' : ''}://${host}`
}

export const getHostWebsocketUrl = () => {
  const url = window.location.href
  const host = window.location.host
  const port = window.location.port
  const isHttps = url.includes('https:')
  return port === '3000' ? 'ws://localhost:3012' : `ws${isHttps ? 's' : ''}://${host}`
}
