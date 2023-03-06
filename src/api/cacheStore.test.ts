import cacheStore, { CacheStore } from './cacheStore'

describe('cacheStore', () => {
    let localCacheStore: CacheStore

    beforeEach(() => {
        localCacheStore = cacheStore()
    })

    describe('get()', () => {
        it('should return a given existing payload by key', () => {
            localCacheStore.put('url', { data: 'data' })

            expect(localCacheStore.get('url')).toEqual({ data: 'data' })
        })
    })

    describe('has()', () => {
        it('should return true if the key exists', () => {
            localCacheStore.put('url', { data: 'data' })

            expect(localCacheStore.has('url')).toEqual(true)
        })

        it('should return false if the key does not exist', () => {
            localCacheStore.put('url', { data: 'data' })

            expect(localCacheStore.has('fake')).toEqual(false)
        })
    })

    describe('put()', () => {
        it('should add a given payload by key', () => {
            localCacheStore.put('url', { data: 'data' })

            expect(localCacheStore.has('url')).toEqual(true)
        })
    })
})
