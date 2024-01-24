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

test('getURLfromHTML absolute', ()=>{
    //backticks are used to input multiline string
    const inputHTMLBody = `
    <html>
    <body>
    <a href = "https://blog.boot.dev/path/">
    Boot.dev Blog
    </a>
    </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev/path/'
    const actual = getURLfromHTML(inputHTMLBody, inputBaseURL)
    // so here we want to get an array of hyperlinks inserted in a webpage
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLfromHTML relative', ()=>{
    //backticks are used to input multiline string
    const inputHTMLBody = `
    <html>
    <body>
    <a href = "/path/">
    Boot.dev Blog
    </a>
    </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLfromHTML(inputHTMLBody, inputBaseURL)
    // so here we want to get an array of hyperlinks inserted in a webpage
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected) 
})

test('getURLfromHTML relative', ()=>{
    //backticks are used to input multiline string
    const inputHTMLBody = `
    <html>
    <body>
    <a href = "https://blog.boot.dev/path1/">
    Boot.dev Blog path one
    </a>
    <a href = "/path2/">
    boot dev blog path two
    </a>
    </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLfromHTML(inputHTMLBody, inputBaseURL)
    // so here we want to get an array of hyperlinks inserted in a webpage
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected) 
})

test('getURLfromHTML invalid', ()=>{
    //backticks are used to input multiline string
    const inputHTMLBody = `
    <html>
    <body>
    <a href = "Invalid url">
    invalid url, dosent start with a slash and dosent start with a protocol either
    </a>
    </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLfromHTML(inputHTMLBody, inputBaseURL)
    // so here we want to get an array of hyperlinks inserted in a webpage
    const expected = [] //given the url is incorrect we expect the function to output an empty array
    expect(actual).toEqual(expected) 
})