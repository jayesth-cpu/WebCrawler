//reference with jsdom documentation syntax samajhne ke liye
const {JSDOM} = require("jsdom")

function getURLfromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a') //here we've passed the <a>tag as an input coz we want all the <a> tags as output

    for(const linkElement of linkElements){
        const url = linkElement.href
        if(url.slice(0,1) ==='/'){
            urls.push(`${baseURL}${url}`)
        }
        else{
            urls.push(url)
        }
    }
    return urls
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostPath =  `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, -1) 
        //above condition is used to remove the last 'slash' from the url like: boot.blog/dev/
    
    }
    else{
        return hostPath
    
    }
}

module.exports = {
    normalizeURL,
    getURLfromHTML
}
