var dataPerPage = 10;
function totalPages(totalData)
{
    return Math.ceil(totalData/dataPerPage);
}

function generateBtn(result,type,totalpage,value,name,opacity,page,onclick) {
   
    var element = document.createElement("input");
    
    element.type = type;
    element.value = value; 
    element.name = name;
    element.id=name;
    element.className = type;
    element.style.opacity=opacity;
    if(onclick=="onclick")
    {
        element.addEventListener("click",()=>{
            pageChange(result,totalpage,page,"yes");
        });
    }
   
    var foo = document.getElementById("pagination");
    foo.appendChild(element);
   
}


function pageChange(result,totalpage,onpage,onclick)
{
    if(onpage=="next")
    {
        document.getElementById('currentPage').value = Number(document.getElementById('currentPage').value)+1;
    }
    if(onpage=="last")
    {
        document.getElementById('currentPage').value = totalpage;
    }
    if(onpage=="first")
    {  
        document.getElementById('currentPage').value = 1;
    }
    if(onpage=="previous")
    {
        document.getElementById('currentPage').value = Number(document.getElementById('currentPage').value)-1;
    }
   
    
    if(totalpage==Number(document.getElementById('currentPage').value))
    {
        
        changeOpacity("pagenext","0.5");
        changeOpacity("pagelast","0.5");
        changeDisable("pagenext",true);
        changeDisable("pagelast",true);
      
    }
    else{
        changeOpacity("pagenext","10");
        changeOpacity("pagelast","10");
        changeDisable("pagenext",false);
        changeDisable("pagelast",false);
    }

    if(1==Number(document.getElementById('currentPage').value))
    {
        changeOpacity("pageprevious","0.5");
        changeOpacity("pagefirst","0.5");
        changeDisable("pageprevious",true);
        changeDisable("pagefirst",true);
        
    }
    else{
        changeOpacity("pageprevious","10");
        changeOpacity("pagefirst","10");
        changeDisable("pageprevious",false);
        changeDisable("pagefirst",false);
    }

    if(onclick=="yes" && ( document.getElementById('searchtxt').value==''))
    {
        fetchData(result,'',Number(document.getElementById('currentPage').value));
    }
    else if(onclick=="yes" && ( document.getElementById('searchtxt').value!=''))
    {
        fetchData(result,"search",Number(document.getElementById('currentPage').value));
    }
    
}

function changeOpacity(id,opacity)
{
    document.getElementById(id).style.opacity = opacity;
}

function changeDisable(id,bool)
{
    document.getElementById(id).disabled = bool; 
}
