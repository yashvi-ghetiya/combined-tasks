function addwork() {
   let tr = document.createElement("tr");
   tr.setAttribute("id", "worktr");
   document.getElementById("workexperience").appendChild(tr);

   let labelname = ["Company Name:", "Designation:", "From:", "To:"];
   let inputname = ["company[]", "des[]", "workfrom[]", "workto[]"];
   let placeholdername = ["TCS", "Junior Developer", "2001-09-30", "2001-09-30"];

   let td = document.createElement("td");
   let input = document.createElement("input");
   input.type = "hidden";
   input.name = "workid[]";
   td.appendChild(input);
   tr.appendChild(td);
   for (let i = 0; i < 4; i++) {
      let td = document.createElement("td");

      let label = document.createElement("label");
      let labeltext = document.createTextNode(labelname[i]);
      label.appendChild(labeltext);
      td.appendChild(label);

      let input = document.createElement("input");
      input.type = "text";
      input.name = inputname[i];
      input.placeholder = placeholdername[i];
      td.appendChild(input);
      td.appendChild(input);
      tr.appendChild(td);
   }
   let button = document.createElement("input");
   button.type = "button";
   button.value = "-";
   button.setAttribute("onclick", "fun(this)");
   tr.appendChild(button);

   tr = document.createElement("tr");
   document.getElementById("workexperience").appendChild(tr);
   tr.appendChild(document.createElement("td")); 
   tr.appendChild(document.createElement("td")); 
   tr.appendChild(document.createElement("td")); 
   td=document.createElement("td"); 
   let label = document.createElement("label");
   label.innerHTML="(YYYY-MM-DD)";
   label.style.margin="auto 0";
   label.style.color="red";
   label.setAttribute("name","workfromvalid[]");
   label.style.display="none";
   td.appendChild(label);
   tr.appendChild(td);

   td=document.createElement("td"); 
   label = document.createElement("label");
   label.innerHTML="(YYYY-MM-DD)";
   label.style.margin="auto 0";
   label.style.color="red";
   label.setAttribute("name","worktovalid[]");
   label.style.display="none";
   td.appendChild(label);
   tr.appendChild(td);

}

function addref() {
   let tr = document.createElement("tr");

   document.getElementById("reference").appendChild(tr);

   let labelname = ["Name:", "Contact:", "Relation:"];
   let inputname = ["refname[]", "refcontact[]", "refrel[]"];
   let placeholdername = ["abc", "1234567890", "friend"];

   let td = document.createElement("td");
   let input = document.createElement("input");
   input.type = "hidden";
   input.name = "rid[]";
   td.appendChild(input);
   tr.appendChild(td);

   for (let j = 0; j < labelname.length; j++) {
      let td = document.createElement("td");

      let label = document.createElement("label");
      let labeltext = document.createTextNode(labelname[j]);
      label.appendChild(labeltext);
      td.appendChild(label);

      let input = document.createElement("input");
      input.type = "text";
      input.name = inputname[j];

      input.placeholder = placeholdername[j];
      td.appendChild(input);


      td.appendChild(input);

      tr.appendChild(td);
   }
   let button = document.createElement("input");
   button.type = "button";
   button.value = "-";
   button.setAttribute("onclick", "fun(this)");
   tr.appendChild(button);

   tr = document.createElement("tr");
   document.getElementById("reference").appendChild(tr);
   tr.appendChild(document.createElement("td")); 
   tr.appendChild(document.createElement("td")); 
  
   td=document.createElement("td"); 
   let label = document.createElement("label");
   label.innerHTML="Contact wrong format";
   label.style.margin="auto 0";
   label.style.color="red";
   label.setAttribute("name","refcontactvalid[]");
   label.style.display="none";
   td.appendChild(label);
   tr.appendChild(td);
}