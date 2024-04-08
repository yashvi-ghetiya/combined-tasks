let fillfields = (result) => {
    if (result['can'].length != 1) {
        window.location.href = '/error';
    }
    else {
        basic_details(result);
        education(result);
        work(result);
        tech(result);
        lang(result);
        ref(result);
        pref(result);
    }

}

let basic_details = (result) => {
    document.getElementById('fname').value = result['can'][0]['fname'];
    document.getElementById('lname').value = result['can'][0]['lname'];
    document.getElementById('desig').value = result['can'][0]['designation'];
    document.getElementById('add1').value = result['can'][0]['add1'];
    document.getElementById('email').value = result['can'][0]['email'];
    document.getElementById('add2').value = result['can'][0]['add2'];
    document.getElementById('contact').value = result['can'][0]['phoneNo'];
    document.getElementById('zipcode').value = result['can'][0]['zipCode'];
    document.getElementById('dob').value = result['can'][0]['dob'];
  
    let gender = document.getElementsByName("gender");
    for (var i = 0; i < gender.length; i++) {
        if (gender[i].value == result['can'][0]['gender']) {
            gender[i].checked = true;
        }
    }
   
    let rel = document.getElementsByName("relationshipop");
    for (var i = 0; i < rel.length; i++) {
        if (rel[i].value == result['can'][0]['relationship']) {
            rel[i].selected = true;
        }
    }

   
    let state = document.getElementsByName("stateop");
    for (var i = 0; i < state.length; i++) {
       
        if (state[i].value == result['can'][0]['state']) {
            state[i].selected = true;
        }
    }

    stateSeleted();
    let city = document.getElementsByName("cityop");
    
    for (var i = 0; i < city.length; i++) {
       
        if (city[i].value == result['can'][0]['city']) {
            city[i].selected = true;
        }
    }
}

let education = (result) => {
    var degree = result['edu'];
    var deg = document.getElementsByName("degree[]")
    var edu = document.getElementsByName("edu[]");
    var eduid = document.getElementsByName("eduid[]");
    var eduedupassingyear = document.getElementsByName("edupassingyear[]");
    var eduper = document.getElementsByName("eduper[]");

    for (var i = 0; i < degree.length; i++) {
        if (degree[i]['degree'] == deg[i].value) {
            eduid[i].value = degree[i]['eid'];
            edu[i].value = degree[i]["board_courseName"];
            eduedupassingyear[i].value = degree[i]["passingYear"];
            eduper[i].value = degree[i]["percentage"];
        }
    }
}

let work = (result) => {
    for (var i = 0; i < result['work'].length; i++) {
        if (i == 0) {
            document.getElementsByName("company[]")[0].value = result["work"][i]['companyName'];
            document.getElementsByName("des[]")[0].value = result["work"][i]['designation'];
            document.getElementsByName("workid[]")[0].value = result["work"][i]['wid'];
            document.getElementsByName("workfrom[]")[0].value = result["work"][i]['fromDate'];
            document.getElementsByName("workto[]")[0].value = result["work"][i]['toDate'];
        }
        else {
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
            input.value = result['work'][i]['wid'];
            z.appendChild(input);
            y.appendChild(z);
            var value = [result["work"][i]['companyName'], result["work"][i]['designation'], result["work"][i]['fromDate'], result["work"][i]['toDate']];
            for (var j = 0; j < 4; j++) {
                var z = document.createElement("td");

                var label = document.createElement("label");
                var labeltext = document.createTextNode(labelname[j]);
                label.appendChild(labeltext);
                z.appendChild(label);

                var input = document.createElement("input");
                input.type = "text";
                input.name = inputname[j];
                input.value = value[j];
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
    }
}

let tech = (result) => {
    var arr = ["php", "mysql", "laravel", "oracle"];

    for (i = 0; i < result['tech'].length; i++) {
        if (arr.includes(result['tech'][i]['technology'])) {
            var lan = document.getElementsByName(result['tech'][i]['technology']);
            for (j = 0; j < lan.length; j++) {
                if (lan[j].value == result['tech'][i]['level']) {
                    lan[j].checked = true;
                }
            }
        }
    }
}

let lang = (result) => {

    var arr = ["hindi", "english", "gujarati"];
    var arr1 = ['canRead', 'canSpeak', 'canWrite'];
    for (i = 0; i < result['lang'].length; i++) {
        if (arr.includes(result['lang'][i]['language'])) {
            var lan = document.getElementsByName(result['lang'][i]['language'] + "[]");
            for (j = 0; j < lan.length; j++) {
                if (result['lang'][i][arr1[j]] == "1") {
                    lan[j].checked = true;
                }
            }
        }
    }
}

let ref = (result) => {
    for (var i = 0; i < result['ref'].length; i++) {
        if (i == 0) {
            document.getElementsByName("refname[]")[0].value = result["ref"][i]['name'];
            document.getElementsByName("rid[]")[0].value = result["ref"][i]['rid']
            document.getElementsByName("refcontact[]")[0].value = result["ref"][i]['contactNo'];
            document.getElementsByName("refrel[]")[0].value = result["ref"][i]['relation'];

        }
        else {
            var y = document.createElement("tr");

            document.getElementById("reference").appendChild(y);

            var labelname = ["Name:", "Contact:", "Relation:"];
            var inputname = ["refname[]", "refcontact[]", "refrel[]"];
            var placeholdername = ["abc", "1234567890", "friend"];
            var value = [result["ref"][i]['name'], result["ref"][i]['contactNo'], result["ref"][i]['relation']];
            var z = document.createElement("td");
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = "rid[]";
            input.value = result['ref'][i]['rid'];
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
                input.value = value[j];
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
    }
}

let pref = (result) => {
   
    document.getElementById('noticeperiod').value = result['pref'][0]['noticePeriod'];
    document.getElementById('currentCTC').value = result['pref'][0]['currentCTC'];
    document.getElementById('expectedCTC').value = result['pref'][0]['expectedCTC'];

    let location = document.getElementsByName("location");
    for (var i = 0; i < location.length; i++) {
        if (result['pref'][0]['preferedLocation'].includes(location[i].value)) {
            location[i].selected = true;
        }
    }

    let dept = document.getElementsByName("dept");
    for (var i = 0; i < dept.length; i++) {
        if (dept[i].value == result['pref'][0]['department']) {
            dept[i].selected = true;
        }
    }
}
