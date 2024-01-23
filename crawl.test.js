const {normalizeURL} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL protocol', ()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected) //here we've used toEqual and not toBe because here we are comparing values in a more relaxed manner
})

test('normalizeURL strip protocol', ()=>{
    const input = 'https://blog.boot.dev/path/' //here we've added a trailing slash in the back of the URL
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
}) 

test('normalizeURL protocol capitlised', ()=>{
    const input = 'https://blog.boot.dev/path' //here we've capitalised the url and seeing how it reacts
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
}) 

test('normalizeURL protocol capitlised', ()=>{
    const input = 'http://blog.boot.dev/path' //here we've modified the http protocol 
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
}) 