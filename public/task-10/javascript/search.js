function addSearchBar(result,type)
{
    var element = document.createElement("input");
    element.type = type;
    element.name = "searchtxt";
    element.className = "search"
    element.id="searchtxt";
    element.addEventListener("keyup", ()=>{
        fetchData(result,"search",1);
    });
  
    var foo = document.getElementById("search");
   
    foo.appendChild(element);
}

