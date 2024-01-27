const {crawlPage} = require('./crawl.js')

async function main(){
    if (process.argv.length <3){
        console.log('please provide a url')
        process.exit(1)
    }
    for(const arg of process.argv){
        console.log(arg)
        /*here we've added this snippet to view the arguments that are being processed 
        by our script, which includes the URL provided as an argument.
        the first one of which it is the startup node(interpreter) arg the second one is
        the name of the file itself and the third one is the url provided
        */
    }
    if (process.argv.length >3){
        console.log('too many command line args')
        process.exit(1)
    }

    const baseURL = process.argv[2]
    console.log(`starting crawl of ${baseURL}`)
    const pages = await crawlPage(baseURL,baseURL,{})
    for(const page of Object.entries(pages)){
        console.log(page)
    }
}
main()