function addwork() {
    var y = document.createElement("tr");
    y.setAttribute("id", "worktr");
    document.getElementById("workexperience").appendChild(y);
 
    var labelname = ["Company Name:", "Designation:", "From:", "To:"];
    var inputname = ["company[]", "des[]", "workfrom[]", "workto[]"];
    var placeholdername = ["TCS", "Junior Developer", "2001-09-30", "2001-09-30"];
 
    var z = document.createElement("td");
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = "workid[]";
    z.appendChild(input);
    y.appendChild(z);
    for (var i = 0; i < 4; i++) {
       var z = document.createElement("td");
 
       var label = document.createElement("label");
       var labeltext = document.createTextNode(labelname[i]);
       label.appendChild(labeltext);
       z.appendChild(label);
 
       var input = document.createElement("input");
       input.type = "text";
       input.name = inputname[i];
       input.placeholder = placeholdername[i];
       z.appendChild(input);
 
 
       z.appendChild(input);
 
       y.appendChild(z);
    }
    var button = document.createElement("input");
    button.type = "button";
    button.value = "-";
    
    button.setAttribute("onclick","fun(this)");
    
    y.appendChild(button);
 }
 
 function addref() {
    var y = document.createElement("tr");
 
    document.getElementById("reference").appendChild(y);
 
    var labelname = ["Name:", "Contact:", "Relation:"];
    var inputname = ["refname[]", "refcontact[]", "refrel[]"];
    var placeholdername = ["abc", "1234567890", "friend"];
 
    var z = document.createElement("td");
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = "rid[]";
    z.appendChild(input);
    y.appendChild(z);
    
    for (var j = 0; j < labelname.length; j++) {
       var z = document.createElement("td");
 
       var label = document.createElement("label");
       var labeltext = document.createTextNode(labelname[j]);
       label.appendChild(labeltext);
       z.appendChild(label);
 
       var input = document.createElement("input");
       input.type = "text";
       input.name = inputname[j];
      
       input.placeholder = placeholdername[j];
       z.appendChild(input);
 
 
       z.appendChild(input);
 
       y.appendChild(z);
    }
    var button = document.createElement("input");
    button.type = "button";
    button.value = "-";
    button.setAttribute("onclick","fun(this)");
    y.appendChild(button);
 }