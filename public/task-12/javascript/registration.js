var code = null;
var activate_code_updated = false;
let validation = () => {

   valid = true;
   var firstname = document.getElementById('firstname');
   if (firstname.value == '') {
      valid = false;
      firstname.style.border = "2px solid #ffcccc";
      firstname.style.background = "#ffcccc";
   }

   var lastname = document.getElementById('lastname');
   if (lastname.value == '') {
      valid = false;
      lastname.style.border = "2px solid #ffcccc";
      lastname.style.background = "#ffcccc";
   }

   var email = document.getElementById('email');
   if (email.value == '') {
      valid = false;
      email.style.border = "2px solid #ffcccc";
      email.style.background = "#ffcccc";
   }

   var mobile = document.getElementById('mobile');
   if (mobile.value == '') {
      valid = false;
      mobile.style.border = "2px solid #ffcccc";
      mobile.style.background = "#ffcccc";
   }

   const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; 
   if(!email.value.match(validEmailRegex) && email.value!=''){        
      document.getElementById('emailvalidation').innerHTML="Enter email in valid format";
      document.getElementById('emailvalidation').style.color="red";
      email.style.border = "2px solid #ffcccc";
      email.style.background = "#ffcccc";
      valid=false;
  }  

  const validCnoRegex = /^[0-9]{10}$/g;
  if(!mobile.value.match(validCnoRegex) && mobile.value!=''){        
     document.getElementById('contactvalidation').innerHTML="Enter contact in valid format";
     document.getElementById('contactvalidation').style.color="red";
     email.style.border = "2px solid #ffcccc";
     email.style.background = "#ffcccc";
     valid=false;
 }  

   if (valid == true) {

      insertData();
   }

}

let setTimer = (type) => {
   var timerlabel
   if (type == 0) {
      timerlabel = document.createElement('h3');
   }
   if (type == 1) {
      document.getElementById('timer').remove();
      timerlabel = document.createElement('h3');
   }

   timerlabel.id = "timer";
   let timer = 20;
   timerlabel.style.color = "red";
   window.setInterval(function () {
      if (timer > 1) {
         timer--;
         timerlabel.innerHTML = "Link De-Activates in : " + timer + " Sec";
      }
      else {
         timerlabel.innerHTML = "Link De-Activated";
      }
   }, 1000);
   document.getElementById("registration").appendChild(timerlabel);
}

let insertData = async () => {

   var email = document.getElementById('email').value;
   var contact = document.getElementById('mobile').value;
   var result = await fetch_GET("/fetch-users/" + email + "/" + contact);
   var userRegistered = false;

   Object.keys(result).forEach((key) => {
      Object.keys(result[key]).forEach(key1 => {
         if (result[key][key1]['count(*)'] == '1') {
            userRegistered = true;
         }
      });
   });
   if (userRegistered == true) {
      as.popup({ title: "User Already Registered !", text: "Enter alternate Email or Contact", icon: "error" })
   }
   else {
      var res = await fetch_POST_form("/insert-users", "registration");
      document.getElementById("registration").innerHTML = null;
      as.popup({ title: "Registered !", text: "You are Registered", icon: "success" });

      var label1 = document.createElement('h2');
      label1.innerHTML = "Registration Form";
      document.getElementById("registration").appendChild(label1);


      var label1 = document.createElement('label');
      label1.innerHTML = "Password:";
      var input1 = document.createElement('input');
      input1.type = "text";
      input1.id = "pass1";
      input1.name = "pass1";
      document.getElementById("registration").appendChild(label1);
      document.getElementById("registration").appendChild(input1);

      var label1 = document.createElement('label');
      label1.innerHTML = "Confirm Password:";
      var input1 = document.createElement('input');
      input1.type = "text";
      input1.id = "pass2";
      input1.name = "pass2";
      document.getElementById("registration").appendChild(label1);
      document.getElementById("registration").appendChild(input1);

      var p = document.createElement('p');
      p.innerHTML = `http://localhost:8080/registration/${res['activationcode']}`;
      p.classList.add("button");
      code = res['activationcode'];
      p.setAttribute("onclick", `validationPassword()`);
      document.getElementById('main').appendChild(p);

      setTimer(0);
   }
}

let validationPassword = async () => {
   valid = true;
   var pass1 = document.getElementById('pass1');
   if (pass1.value == '') {
      valid = false;
      pass1.style.border = "2px solid #ffcccc";
      pass1.style.background = "#ffcccc";
   }


   var pass2 = document.getElementById('pass2');
   if (pass2.value == '') {
      valid = false;
      pass2.style.border = "2px solid #ffcccc";
      pass2.style.background = "#ffcccc";
   }

   if (pass2.value != pass1.value) {
      as.popup({ title: "Re-Enter Password !", text: "Your Password Does Not Match", icon: "error" });
      valid = false;
   }
   if (valid == true) {
      InsertPassword();
   }

}

let InsertPassword = async () => {

   var result = await fetch_GET("/fetch-users/" + code);
   var expired = true;
   Object.keys(result).forEach((key) => {
      Object.keys(result[key]).forEach(key1 => {

         var create_time;
         if (activate_code_updated) {
            create_time = new Date(result[key][key1]['activate_code_update']);
         }
         else {
            create_time = new Date(result[key][key1]['create_time']);
         }

         var current_time = new Date();
         var difference = ((current_time - create_time) / 1000).toString().split('.')[0];
         var difference = Number(difference);

         if (difference > 20) {
            as.popup({
               title: "Opps\nLink has been Expired",
               closeBtn: false,
               buttons: [
                  { html: "Activate Link", type: "error", click: function () { activate_code() } },
               ]
            });
         }
         else {
            expired = false;
         }
      })
   })
   if (expired == false) {
      var res = await fetch_POST_form("/activate-users/" + code, "registration");
      as.popup({
         title: "Congrats\nAccount has been Activated",
         closeBtn: false,
         buttons: [
            { html: "Login", type: "Alert", click: function () { window.location.href = "/login" } },
         ]
      });
   }
}

let activate_code = async () => {
   var res = await fetch_POST_json("/activate-code", code);
   code = res['activationcode'];
   activate_code_updated = true;
   setTimer(1);
}

