//reference with jsdom documentation syntax samajhne ke liye
const {JSDOM} = require("jsdom")

async function crawlPage(baseURL, currentURL, pages){    //baseUL will be the starting point like the homepage, currentURL will be the page that we're actively crawling, pages wiil act as an object that will keep a track of all the crawled pages
    console.log(`actively crawling ${currentURL}`)
    const baseURLobj = new URL(baseURL)
    const currentURLobj = new URL(currentURL)

    if(baseURLobj.hostname !== currentURLobj.hostname){
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)
    if(pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    }
    pages[normalizedCurrentURL] = 1   
    try{
        const resp = await fetch(currentURL)
        if(resp.status  >399){
            console.log(`error in the fetch with status code ${resp.status} on :${currentURL}`)
            return pages
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log(`non html response content type ${contentType} on :${currentURL}`)
            return pages
        }
        const htmlBody = await resp.text()
        const nextURLs = getURLfromHTML(htmlBody, baseURL)
        for(const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages)
        }
    }
    catch(err){
        console.log(`error crawling ${currentURL}: ${err.message}`)
    }
    return pages
}

function getURLfromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a') //here we've passed the <a>tag as an input coz we want all the <a> tags as output

    for(const linkElement of linkElements){
        const url = linkElement.href
        if(url.slice(0,1) ==='/'){
            try{
                //relative url
                const urlObj = new URL(`${baseURL}${url}`)
                urls.push(urlObj.href) //in here we are appending the baseURL with default url
            }
            catch(err){
                console.log(`error with the relative url :${err.message}` )
            }
        }
        else{
            try{
                //absolute url
                const urlObj = new URL(url)
                urls.push(urlObj.href) //in here we are appending the baseURL with default url
            }
            catch(err){
                console.log(`error with the absolute url :${err.message}` )
            }
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
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLfromHTML,
    crawlPage
}
