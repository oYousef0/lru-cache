/**
 * A lightweight high-performance LRU (Least Recently Used) Cache
 * implemented using JavaScript native Map for O(1) operations
 */
class LRUCache {
    /**
     * @param {number} capacity - Maximum number of items the cache can hold
     */
    constructor(capacity) {
        if (typeof capacity !== 'number' || capacity <= 0) {
            throw new Error("Capacity must be a positive integer");
        }

        this.cache = new Map();
        this.capacity = capacity;
    }

    /**
     * Retrives an item from the cache and marks it as recently used
     * @param {*} key
     * @returns {*}
     */
    get(key) {
        if (!this.cache.has(key)) return undefined;

        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        
        return value;
    }

    /**
     * Insert or update an items in the cache
     * Evicts the least recently used item if capacity is exceeded
     * @param {*} key
     * @param {*} value
     */
    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }

        this.cache.set(key, value);
    }

    /**
     * Check if a key exist without updating its recency
     * @param {*} key
     * @returns {boolean}
     */
    has(key) {
        return this.cache.has(key);
    }

    /**
     * Remove a specific key from the cache
     * @param {*} key
     * @return {boolean}
     */
    delete(key) {
        return this.cache.delete(key);
    }

    /**
     * Clears all items from the cache
     */
    clear(key) {
        this.cache.clear();
    }

    /**
     * Return the current number of cached items
     * @returns {number}
     */
    get size() {
        return this.cache.size;
    }
}

module.exports = LRUCache;