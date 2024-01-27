function printReport(pages){
    console.log("-----------------")
    console.log("******REPORT******")
    const sortedpages = sortPages(pages)
    for(const page of sortedpages){
        console.log(`${page[0]} : ${page[1]}`)
    }
    console.log("-----------------")
    console.log("******END******")
}

function sortPages(pages){
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a,b)=>{
        aIndex = a[1]
        bIndex = b[1]
        return b[1]-a[1]
    })
    return pagesArr
}

module.exports = {
    sortPages,
    printReport
}