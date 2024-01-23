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
    normalizeURL
}