//reference with jsdom documentation syntax samajhne ke liye
const {JSDOM} = require("jsdom")

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
    getURLfromHTML
}
