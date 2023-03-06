interface CacheStoreData {
    [key: string]: unknown
}

interface CacheStore {
    get: (key: string) => unknown
    put: (key: string, data: unknown) => void
    has: (key: string) => boolean
}

const cacheStore = (): CacheStore => {
    const store: CacheStoreData = {}

    return {
        get: (key: string) => {
            return store[key]
        },
        put: (key: string, data: unknown) => {
            store[key] = data
        },
        has: (key: string) => {
            return store.hasOwnProperty(key)
        },
    }
}

export default cacheStore
export type { CacheStore }
