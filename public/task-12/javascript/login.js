let validation =async () => {

   valid = true;
   var email = document.getElementById('email');
   var mobile = document.getElementById('mobile');
   
   if (email.value == '' && mobile.value == '' ) {
      valid = false;
      email.style.border = "2px solid #ffcccc";
      email.style.background = "#ffcccc";
      mobile.style.border = "2px solid #ffcccc";
      mobile.style.background = "#ffcccc";
      as.popup({ title: "Enter Details !", text: "Enter Contact or Email", icon: "error" });
   }

   if (email.value != '' && mobile.value != '' ) {
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
    var res = await fetch_POST_form("/task-12/login", "login");
      if(res['userAccess']==true)
      {
         window.location.href='/dashboard';
      }
      else
      {
         as.popup({ title: "Re Enter Details!", text:res['err'], icon: "error" });
      }
   }
}
