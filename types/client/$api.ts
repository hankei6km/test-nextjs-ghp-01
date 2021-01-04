/* eslint-disable */
import { AspidaClient, AspidaResponse, dataToURLString } from 'aspida'
import { Methods as Methods0 } from './api/v1/test1'
import { Methods as Methods1 } from './api/v1/test1/_id@string'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/v1/test1'
  const GET = 'GET'

  return {
    api: {
      v1: {
        test1: {
          _id: (val0: string) => {
            const prefix0 = `${PATH0}/${val0}`

            return {
              get: (option?: { query?: Methods1['get']['query'], config?: T }) =>
                fetch<Methods1['get']['resBody']>(prefix, prefix0, GET, option).json(),
              $get: (option?: { query?: Methods1['get']['query'], config?: T }) =>
                fetch<Methods1['get']['resBody']>(prefix, prefix0, GET, option).json().then(r => r.body),
              $path: (option?: { method?: 'get'; query: Methods1['get']['query'] }) =>
                `${prefix}${prefix0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
            }
          },
          get: (() => {
            function getRequest(option: { query: Methods0['get']['polymorph'][0]['query'], config?: T }): Promise<AspidaResponse<Methods0['get']['polymorph'][0]['resBody']>>
            function getRequest(option: { query: Methods0['get']['polymorph'][1]['query'], config?: T }): Promise<AspidaResponse<Methods0['get']['polymorph'][1]['resBody']>>
            function getRequest(option: any) {
              return fetch(prefix, PATH0, GET, option).json()
            }
            return getRequest
          })(),
          $get: (() => {
            function $getRequest(option: { query: Methods0['get']['polymorph'][0]['query'], config?: T }): Promise<Methods0['get']['polymorph'][0]['resBody']>
            function $getRequest(option: { query: Methods0['get']['polymorph'][1]['query'], config?: T }): Promise<Methods0['get']['polymorph'][1]['resBody']>
            function $getRequest(option: any) {
              return fetch(prefix, PATH0, GET, option).json().then(r => r.body)
            }
            return $getRequest
          })(),
          $path: () => `${prefix}${PATH0}`
        }
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
