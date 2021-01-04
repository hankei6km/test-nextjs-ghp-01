/* eslint-disable */
import { AspidaClient } from 'aspida'
import { MockClient, MockConfig, mockClient } from 'aspida-mock'
import api from './$api'
import mock0 from './api/v1/test1/index'
import mock1 from './api/v1/test1/_id@string/index'

export const mockRoutes = () => [
  { path: '/api/v1/test1', methods: mock0 },
  { path: '/api/v1/test1/_id@string', methods: mock1 }
]

export default <U>(client: AspidaClient<U> | MockClient<U>, config?: MockConfig) => {
  const mock = 'attachRoutes' in client ? client : mockClient(client)
  mock.attachRoutes(mockRoutes(), config)

  return api(mock)
}
