const {normalizeURL,getURLfromHTML} = require('./crawl.js')
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

test('getURLfromHTML', ()=>{
    //backticks are used to input multiline string
    const inputHTMLBody = `
    <html>
    <body>
    <a href = "https://blog.boot.dev">
    Boot.dev Blog
    </a>
    </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLfromHTML(inputHTMLBody, inputBaseURL)
    // so here we want to get an array of hyperlinks inserted in a webpage
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})