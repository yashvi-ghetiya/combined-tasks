async function displaydata()
{
    var result = await fetch('https://jsonplaceholder.typicode.com/posts/'+window.location.pathname.split("/")[4])
    result = await result.json();

    console.log(result);
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
    var t = document.createTextNode("Body");
    z.appendChild(t);
    document.getElementById("tr").appendChild(z);

   
    var y = document.createElement("tr");
    y.setAttribute("id","tr");

    var z1 = document.createElement("td");
    var t1 = document.createTextNode(result.userId);
    z1.appendChild(t1);

    var z2 = document.createElement("td");
    var t2 = document.createTextNode(result.id);
    z2.appendChild(t2);

    var z3 = document.createElement("td");
    var t3 = document.createTextNode(result.title);
    z3.appendChild(t3);

    var z4 = document.createElement("td");
    var t4 = document.createTextNode(result.body);
    z4.appendChild(t4);

    y.appendChild(z1);
    y.appendChild(z2);
    y.appendChild(z3);
    y.appendChild(z4);
       
    document.getElementById("customers").appendChild(y);
   
    var element = document.createElement("input");
    element.type = "button";
    element.value = "Show Comments" 
    element.className = "button";
    element.id='commentbtn';
    element.addEventListener("click",()=>{
        addComment();
    });
  
    var foo = document.getElementById("btn");
    foo.appendChild(element);
}

async function addComment()
{
    if(document.getElementById('commentbtn').value=='Hide Comments')
    {
        document.getElementById('commentbtn').value='Show Comments';
        
        var tbl = document.getElementById("comments");
        if(tbl) 
           tbl.parentNode.removeChild(tbl);
    }
    else
    {
        var x = document.createElement("TABLE");
        x.setAttribute("id", "comments");
        document.getElementById("comment").appendChild(x);
    
        var y = document.createElement("tr");
        y.setAttribute("id", "rows");
        document.getElementById("comments").appendChild(y);

        var z = document.createElement("th");
        var t = document.createTextNode("Post Id");
        z.appendChild(t);
        document.getElementById("rows").appendChild(z);

        var z = document.createElement("th");
        var t = document.createTextNode("Id");
        z.appendChild(t);
        document.getElementById("rows").appendChild(z);

        var z = document.createElement("th");
        var t = document.createTextNode("Name");
        z.appendChild(t);
        document.getElementById("rows").appendChild(z);

        var z = document.createElement("th");
        var t = document.createTextNode("Email");
        z.appendChild(t);
        document.getElementById("rows").appendChild(z);

        var z = document.createElement("th");
        var t = document.createTextNode("Body");
        z.appendChild(t);
        document.getElementById("rows").appendChild(z);

        var result = await fetch('https://jsonplaceholder.typicode.com/posts/'+window.location.pathname.split("/")[4]+'/comments')
        result = await result.json();
        
     
        result.forEach(function (items) {
            var y = document.createElement("tr");
            y.setAttribute("id","rows");

            var z1 = document.createElement("td");
            var t1 = document.createTextNode(items.postId);
            z1.appendChild(t1);

            var z2 = document.createElement("td");
            var t2 = document.createTextNode(items.id);
            z2.appendChild(t2);

            var z3 = document.createElement("td");
            var t3 = document.createTextNode(items.name);
            z3.appendChild(t3);

            var z4 = document.createElement("td");
            var t4 = document.createTextNode(items.email);
            z4.appendChild(t4);

            var z5 = document.createElement("td");
            var t5 = document.createTextNode(items.body);
            z5.appendChild(t5);

            y.appendChild(z1);
            y.appendChild(z2);
            y.appendChild(z3);
            y.appendChild(z4);
            y.appendChild(z5);
        
            document.getElementById("comments").appendChild(y);
        });
        document.getElementById('commentbtn').value='Hide Comments';
    }

    
}