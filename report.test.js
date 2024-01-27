const {sortPages} = require('./report.js')
const {test, expect} = require('@jest/globals')

test('sortPages', ()=>{
    const input = {
        'https://www.youtube.com/path' : 1,
        'https://www.youtube.com/' : 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://www.youtube.com/', 3],
        ['https://www.youtube.com/path', 1]
    ]
    expect(actual).toEqual(expected) //here we've used toEqual and not toBe because here we are comparing values in a more relaxed manner
})

test('sortPages multiple', ()=>{
    const input = {
        'https://www.youtube.com/path' : 1,
        'https://www.youtube.com/' : 3,
        'https://www.youtube.com/path2' : 2,
        'https://www.youtube.com/path3': 5,
        'https://www.youtube.com/path4': 4
    }
    const actual = sortPages(input)
    const expected = [
        ['https://www.youtube.com/path3', 5],
        ['https://www.youtube.com/path4', 4],
        ['https://www.youtube.com/', 3],
        ['https://www.youtube.com/path2', 2],
        ['https://www.youtube.com/path', 1]
    ]
    expect(actual).toEqual(expected)
})