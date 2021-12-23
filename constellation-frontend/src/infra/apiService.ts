/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL

const contentTypeHeader = { 'Content-Type': 'application/json' }

const getHeaders = () => {
    return { ...contentTypeHeader }
}

// const objectToQueryString = (obj: object | undefined): string => {
//     if (obj) {
//         const keyValuePairs = [];
//         for (const key in obj) {
//             keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
//         }
//         return keyValuePairs.join('&');
//     }
//     return ''
// };

const handleResponse = async (response: Response) => {
    const text = await response.text()
    const data = text && JSON.parse(text)
    if (!response.ok) {
        const error = (data && data.message) || response.statusText
        return Promise.reject(error)
    }
    return data
}

const get = async (path: string) => {
    const requestOptions = { method: 'GET', headers: getHeaders() }
    const url = `${BASE_API_URL}/${path}`
    return fetch(url, requestOptions).then(handleResponse)
}

const post = async (path: string, body: object) => {
    const requestOptions = { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }
    return fetch(`${BASE_API_URL}/${path}`, requestOptions).then(handleResponse)
}

const put = async (path: string, id: number, body: object) => {
    const requestOptions = { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }
    return fetch(`${BASE_API_URL}/${path}/${id}`, requestOptions).then(handleResponse)
}

const remove = async (path: string, id: number) => {
    const requestOptions = { method: 'DELETE', headers: getHeaders() }
    return fetch(`${BASE_API_URL}/${path}/${id}`, requestOptions).then(handleResponse)
}

export { get, post, put, remove }
