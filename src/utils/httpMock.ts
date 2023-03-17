import nock, { Interceptor, Body, DataMatcherMap } from 'nock'

type QueryParams = Readonly<DataMatcherMap>
type ResponseBody = Readonly<Body>

interface HTTPMock {
    get: (url: string, query?: QueryParams) => this
    response: (statusCode: number, responseBody?: ResponseBody) => this
}

const httpMock = (): HTTPMock => {
    let scopeInterceptor: Interceptor

    let scope = nock('https://pokeapi.co').defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
    })

    return {
        get(url, queryParams) {
            scopeInterceptor = scope.get(url)

            if (queryParams !== undefined) {
                scopeInterceptor.query(queryParams)
            }

            return this
        },
        response(statusCode, responseBody) {
            scopeInterceptor.reply(statusCode, responseBody)

            return this
        },
    }
}

export default httpMock
export type { HTTPMock }
