let validation = async () => {

   valid = true;
   var email = document.getElementById('email');
   var mobile = document.getElementById('mobile');

   if ((email.value != '' && mobile.value != '') || (email.value == '' && mobile.value == '')) {
      valid = false;
      as.popup({ title: "Enter Details !", text: "Enter Contact or Email", icon: "error" });
   }
  
   var password = document.getElementById('password');
   if (password.value == '') {
      valid = false;
      password.style.border = "2px solid #ffcccc";
      password.style.background = "#ffcccc";
   }


   if (valid == true) {
      if(email.value!='')
      {
        
         const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
         if (!email.value.match(validEmailRegex) && email.value != '') {
            document.getElementById('emailvalidation').innerHTML = "Enter email in valid format";
            document.getElementById('emailvalidation').style.color = "red";
            email.style.border = "2px solid #ffcccc";
            email.style.background = "#ffcccc";
            valid = false;
         }
      }

      if(mobile.value!='')
      {
         const validCnoRegex = /^[0-9]{10}$/g;
         if (!mobile.value.match(validCnoRegex) && mobile.value != '') {
            document.getElementById('contactvalidation').innerHTML = "Enter contact in valid format";
            document.getElementById('contactvalidation').style.color = "red";
            mobile.style.border = "2px solid #ffcccc";
            mobile.style.background = "#ffcccc";
            valid = false;
         }
      }
   }

   if (valid == true) {
      var res = await fetch_POST_form("/login", "login");
      if (res['userAccess'] == true) {
         window.location.href = '/dashboard';
      }
      else {
         as.popup({ title: "Re Enter Details!", text: res['err'], icon: "error" });
      }
   }
}
