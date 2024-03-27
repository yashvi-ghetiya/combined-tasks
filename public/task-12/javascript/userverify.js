var code = null;
var activate_code_updated = false;

let userVerification = async () => {
    valid = true;
    var email = document.getElementById('email');
    var mobile = document.getElementById('mobile');

    if (email.value == '' && mobile.value == '') {
        valid = false;
        email.style.border = "2px solid #ffcccc";
        email.style.background = "#ffcccc";
        mobile.style.border = "2px solid #ffcccc";
        mobile.style.background = "#ffcccc";
        as.popup({ title: "Enter Details !", text: "Enter Contact or Email", icon: "error" });
    }

    if (email.value != '' && mobile.value != '') {
        valid = false;
        email.style.border = "2px solid #ffcccc";
        email.style.background = "#ffcccc";
        mobile.style.border = "2px solid #ffcccc";
        mobile.style.background = "#ffcccc";
        as.popup({ title: "Enter Details !", text: "Enter Contact OR Email", icon: "error" });
    }

    if (valid == true) {

        var res = await fetch_POST_form("http://localhost:8080/dashboard/task-12/userVerification", "userverify");

        var email=null;
        if (res['resultlength'] == 1) {
            Object.keys(res).forEach(key => {
                Object.keys(res[key]).forEach(key1 => {
                    email=res[key][key1]['email'];
                    code=res[key][key1]['activation_code'];
                })
            })
        }
        if (res['resultlength'] == 0) {
            as.popup({ title: "Not Registered!", text: "Incorrect Email Address or Contact Details!", icon: "error" });
        }

        if(email!=null)
        {
            await activate_code(0);
            setPasswordFields(code, email);
           setTimer(0);
        }
    }
}

let setPasswordFields = (code1, email) => {
    document.getElementById("userverify").innerHTML = null;

    var label1 = document.createElement('h4');
    label1.innerHTML = "Enter a new Password for" + email;
    document.getElementById("userverify").appendChild(label1);


    var label1 = document.createElement('label');
    label1.innerHTML = "Password:";
    var input1 = document.createElement('input');
    input1.type = "text";
    input1.id = "pass1";
    input1.name = "pass1";
    document.getElementById("userverify").appendChild(label1);
    document.getElementById("userverify").appendChild(input1);

    var label1 = document.createElement('label');
    label1.innerHTML = "Confirm Password:";
    var input1 = document.createElement('input');
    input1.type = "text";
    input1.id = "pass2";
    input1.name = "pass2";
    document.getElementById("userverify").appendChild(label1);
    document.getElementById("userverify").appendChild(input1);

    var p = document.createElement('p');
    p.innerHTML = `http://localhost:8080/userverify/${code1}`;
    p.classList.add("button");
    code = code1;
    p.setAttribute("onclick", `validationPassword()`);
    document.getElementById('main').appendChild(p);

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
    document.getElementById("userverify").appendChild(timerlabel);
}

let InsertPassword = async () => {

    var result = await fetch_GET("http://localhost:8080/dashboard/task-12/fetch-users/" + code);
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
            console.log(difference);
            if (difference > 20) {
                as.popup({
                    title: "Opps\nLink has been Expired",
                    closeBtn: false,
                    buttons: [
                        { html: "Activate Link", type: "error", click: function () { activate_code(1) } },
                    ]
                });
            }
            else {
                expired = false;
            }
        })
    })
    if (expired == false) {
        var res = await fetch_POST_form("http://localhost:8080/dashboard/task-12/activate-users/" + code, "userverify");
        as.popup({
            title: "Your Password has been Updated successfully",
            closeBtn: false,
            buttons: [
                { html: "Login", type: "Alert", click: function () { window.location.href = "http://localhost:8080/dashboard/task-12/login" } },
            ]
        });
    }
}

let activate_code = async (type) => {
    console.log("old"+code);
    var res = await fetch_POST_json("http://localhost:8080/dashboard/task-12/activate-code", code);
    code = res['activationcode'];
    console.log("herer"+code);
    activate_code_updated = true;
    if(type==1)
    {
        setTimer(1);
    }
}
 

