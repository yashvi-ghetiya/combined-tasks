async function fetchData(result,type,currentpage)
{
  if(type=="search")
  {
    var result1=[];
    result.forEach(function (items) {
        if(items.id.toString().includes(document.getElementById('searchtxt').value) || items.userId.toString().includes(document.getElementById('searchtxt').value) || items.title.toString().includes(document.getElementById('searchtxt').value))
        {
            result1.push(items);
        }
    });
    result=result1;
    var totalpage = totalPages(result.length);
   
    if(currentpage==1)
    {
          pageChange(result,totalpage,"first","no");
    }
    else if(currentpage==totalpage)
    {
      pageChange(result,totalpage,"last","no");
    }
    result = result.slice((currentpage-1)*dataPerPage,currentpage*dataPerPage);
  }
  else
  {
   result = result.slice((currentpage-1)*dataPerPage,currentpage*dataPerPage);
  }

   if(result=='')
   {
      var tbl = document.getElementById("customers");
      if(tbl) 
         tbl.parentNode.removeChild(tbl);

      var tbl = document.getElementById("error");
      if(tbl) 
          tbl.parentNode.removeChild(tbl);

      const para = document.createElement("p");
      para.id='error';
      para.innerText = "Empty Dataset";
      para.setAttribute("class","error-msg");
      document.getElementById("data").appendChild(para);
   }
   else
   {
    var tbl = document.getElementById("error");
    if(tbl) 
       tbl.parentNode.removeChild(tbl);

    var tbl = document.getElementById("customers");
    if(tbl) 
       tbl.parentNode.removeChild(tbl);

    var x = document.createElement("TABLE");
    x.setAttribute("id", "customers");
    document.getElementById("data").appendChild(x);
  
    var y = document.createElement("tr");
    y.setAttribute("id", "tr");
    document.getElementById("customers").appendChild(y);
  
    var z = document.createElement("th");
    var t = document.createTextNode("User Id");
    z.appendChild(t);
    document.getElementById("tr").appendChild(z);

    var z = document.createElement("th");
    var t = document.createTextNode("Id");
    z.appendChild(t);
    document.getElementById("tr").appendChild(z);

    var z = document.createElement("th");
    var t = document.createTextNode("Title");
    z.appendChild(t);
    document.getElementById("tr").appendChild(z);

    var z = document.createElement("th");
    var t = document.createTextNode("More");
    z.appendChild(t);
    document.getElementById("tr").appendChild(z);

    result.forEach(function (items) {
              
        var y = document.createElement("tr");
        y.setAttribute("id","tr");

        var z1 = document.createElement("td");
        var t1 = document.createTextNode(items.userId);
        z1.appendChild(t1);

        var z2 = document.createElement("td");
        var t2 = document.createTextNode(items.id);
        z2.appendChild(t2);

        var z3 = document.createElement("td");
        var t3 = document.createTextNode(items.title);
        z3.appendChild(t3);

        var z4 = document.createElement("td");
        var element = document.createElement("input");
        element.type = "button";
        element.value = "More Details" 
        
        element.className = "button";
        
        element.addEventListener("click",()=>{
          window.location.href='/dashboard/task-10/display/'+items.id;
        });
       
        z4.appendChild(element);

        y.appendChild(z1);
        y.appendChild(z2);
        y.appendChild(z3);
        y.appendChild(z4);
       
        document.getElementById("customers").appendChild(y);
       
      });
   }
}

