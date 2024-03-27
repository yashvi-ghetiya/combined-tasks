
async function createTable()
{
    var result = await fetchjson();
   
    var totalpage = totalPages(result.length);
    
    fetchData(result,'',1);

    generateBtn(result,"button",totalpage,"<<","pagefirst","0.5","first","onclick");
    generateBtn(result,"button",totalpage,"<","pageprevious","0.5","previous","onclick");
    generateBtn(result,"button",totalpage,"1","currentPage","10","current","");
    generateBtn(result,"button",totalpage,">","pagenext","10","next","onclick");
    generateBtn(result,"button",totalpage,">>","pagelast","10","last","onclick");
    

    addSearchBar(result,"text");
}

