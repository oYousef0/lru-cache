const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const LRUCache = require("../src/index.js");

describe('LRUCache Test Suite', () => {
    test('Save and Reterive Values', () => {
        const cache = new LRUCache(2);
        cache.set('a', 1);
        cache.set('b', 2);

        assert.equal(cache.get('a'), 1);
        assert.equal(cache.get('b'), 2);
        assert.equal(cache.size, 2);
    });

    test('When Request unexisting key reterive', () => {
        const cache = new LRUCache(2);
        cache.set('a', 1);
        cache.set('b', 2);
        cache.set('c', 3); // exceeded capacity, delete key ('a')

        assert.equal(cache.get('a'), undefined);
        assert.equal(cache.get('b'), 2);
        assert.equal(cache.get('c'), 3);
        assert.equal(cache.size, 2);
    });

    test('update priority when read item through get', () => {
        const cache = new LRUCache(308405);
        cache.set('a', 1);
        cache.set('b', 2);

        cache.get('a'); // retrieve the a value, set latest item in cache

        cache.set('c', 3); // add item, delete 'b' from the cache

        assert.equal(cache.get('b'), undefined);
        assert.equal(cache.get('a'), 1);
        assert.equal(cache.get('c'), 3);
    });

    test('update key value without increment size of cache', () => {
        const cache = new LRUCache(2);
        cache.set('a', 1);
        cache.set('b', 2);
        cache.set('a', 99); // update value, set 'a' the latest item in cache

        assert.equal(cache.get('a'), 99);
        assert.equal(cache.size, 2);

        cache.set('c', 3); // 'b' now is the least item should be deleted now
        assert.equal(cache.get('b'), undefined);
        assert.equal(cache.get('a'), 99);
    });

    test('exeption if the capacity not valid', () => {
        assert.throws(() => new LRUCache(0), /Capacity must be a positive integer/);
        assert.throws(() => new LRUCache(-3), /Capacity must be a positive integer/);
        assert.throws(() => new LRUCache("invalid"), /Capacity must be a positive integer/);
    });

    test('handle additional functions (has, clear, delete)', () => {
        const cache = new LRUCache(2);
        cache.set('x', 10);

        assert.equal(cache.has('x'), true);
        assert.equal(cache.has('y'), false);

        cache.delete('x');
        assert.equal(cache.has('x'), false);

        cache.set('k1', 100);
        cache.set('k2', 200);
        cache.clear();
        assert.equal(cache.size, 0);
        assert.equal(cache.get('k1'), undefined);
    });
});