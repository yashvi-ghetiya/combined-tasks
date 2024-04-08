let basic_details_validation = () => {
    let valid = false;
    let tab = document.getElementsByClassName("tab");
    let inputs = tab[currentTab].getElementsByTagName("input");

    for (i = 0; i < document.getElementsByName('gender').length; i++) {
        if (document.getElementsByName('gender')[i].checked) {
            valid = true;
        }
    }
    if (valid == false) {
        display_block('gendervalid');
    }
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "" && inputs[i].type != 'hidden') {
            change_background(inputs[i].id);
            valid = false;
        }
    }
    if (document.getElementById('add1').value == '') {
        valid = false;
        change_background("add1");
    }
    if (document.getElementById('add2').value == '') {
        valid = false;
        change_background("add2");
    }


if (document.getElementById('state').value == -1) {
      valid = false;
      display_block('statevalid')
    }
  
    if (document.getElementById('city').value == -1) {
      valid = false;
      display_block('cityvalid')
    }

    const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!document.getElementById('email').value.match(validEmailRegex)) {
        change_background("email");
        display_block('emailvalid')
        valid = false;
    }

    const validCnoRegex = /^[0-9]{10}$/g;
    if (!document.getElementById('contact').value.match(validCnoRegex)) {
        change_background("contact");
        display_block('contactvalid')
        valid = false;
    }

    const validZipRegex = /^[0-9]{6}$/g;
    if (!document.getElementById('zipcode').value.match(validZipRegex)) {

        change_background("zipcode");
        display_block('zipvalid')
        valid = false;
    }

    if (date_validation('dob', null) == false) {
        valid = false;
        change_background('dob');
        display_block('dobvalid');
    }
    return valid;
}

let education_details_validation = () => {
    let edu = document.getElementsByName('edu[]');
    let edupassingyear = document.getElementsByName('edupassingyear[]');
    let edupassingyearvalid = document.getElementsByName('edupassingyearvalid[]');
    let edupervalid = document.getElementsByName('edupervalid[]');
    let eduper = document.getElementsByName('eduper[]');
    let valid = true;
    for (let i = 0; i < 2; i++) {
        if (edu[i].value == '') {
            valid = false;
            change_background_by_name(edu[i]);
        }
        if (edupassingyear[i].value == '') {
            valid = false;
            change_background_by_name(edupassingyear[i]);
        }
        if (eduper[i].value == '') {
            valid = false;
            change_background_by_name(eduper[i]);
        }

        const validYearRegex = /^[0-9]{4}$/g;
        if (edupassingyear[i].value != '' && !edupassingyear[i].value.match(validYearRegex)) {
            valid = false;
            change_background_by_name(edupassingyear[i]);
            display_block_by_name(edupassingyearvalid[i]);
        }

        if (eduper[i].value != '' && eduper[i].value.includes('.')) {
            var per = eduper[i].value.split('.');
            const validPerRegex = /^[0-9]{2}$/g;
            for (let j = 0; j < 2; j++) {
                if (!per[j].match(validPerRegex)) {
                    valid = false;
                    display_block_by_name(edupervalid[i]);
                    change_background_by_name(eduper[i]);
                }
            }
            if (Number(per[0]) < 33) {
                display_block_by_name(edupervalid[i]);
                change_background_by_name(eduper[i]);
                valid = false;
            }
        }
        else if (eduper[i].value != '' && !eduper[i].value.includes('.')) {
            valid = false;
            change_background_by_name(eduper[i]);
            display_block_by_name(edupervalid[i]);
        }
    }

    for (let i = 2; i < 4; i++) {
        if (edu[i].value != '' || edupassingyear[i].value != '' || eduper[i].value != '') {
            if (edu[i].value == '') {
                change_background_by_name(edu[i]);
                valid = false;
            }
            if (edupassingyear[i].value == '') {
                change_background_by_name(edupassingyear[i]);
                valid = false;
            }
            if (eduper[i].value == '') {
                change_background_by_name(eduper[i]);
                valid = false;
            }
            //  valid = year_validation(edupassingyear[i],edupassingyearvalid[i]);
            const validYearRegex = /^[0-9]{4}$/g;
            if (edupassingyear[i].value != '' && !edupassingyear[i].value.match(validYearRegex)) {
                valid = false;
                change_background_by_name(edupassingyear[i]);
                display_block_by_name(edupassingyearvalid[i]);
            }

            if (eduper[i].value != '' && eduper[i].value.includes('.')) {
                var per = eduper[i].value.split('.');
                const validPerRegex = /^[0-9]{2}$/g;
                for (let j = 0; j < 2; j++) {
                    if (!per[j].match(validPerRegex)) {
                        valid = false;
                        display_block_by_name(edupervalid[i]);
                        change_background_by_name(eduper[i]);
                    }
                }
            }
            else if (eduper[i].value != '' && !eduper[i].value.includes('.')) {
                valid = false;
                change_background_by_name(eduper[i]);
                display_block_by_name(edupervalid[i]);
            }
        }
    }

    if (edu[2].value == '' && (edu[3].value != '' || eduper[3].value != '' || edupassingyear[3].value != '')) {
        valid = false;
        change_background_by_name(edu[2]);
        change_background_by_name(edupassingyear[2]);
        change_background_by_name(eduper[2]);
    }
    return valid;
}

let work_experience_details_validation = () => {
    let companyname = document.getElementsByName('company[]');
    let designation = document.getElementsByName('des[]');
    let workfrom = document.getElementsByName('workfrom[]');
    let workto = document.getElementsByName('workto[]');
    let workfromvalid = document.getElementsByName('workfromvalid[]');
    let worktovalid = document.getElementsByName('worktovalid[]');

    let valid = true;

    for (let i = 0; i < companyname.length; i++) {

        if (companyname[i].value != '' || designation[i].value != '' || workfrom[i].value != '' || workto[i].value != '') {

            if (companyname[i].value == '') {
                change_background_by_name(companyname[i]);
                valid = false;
            }
            if (designation[i].value == '') {
                change_background_by_name(designation[i]);
                valid = false;
            }
            if (workfrom[i].value == '') {
                change_background_by_name(workfrom[i]);
                valid = false;
            }
            if (workto[i].value == '') {
                valid = false;
                change_background_by_name(workto[i]);
            }

            if (i != 0) {
                for (let j = i - 1; j >= 0; j--) {
                    if (companyname[j].value == '') {
                        valid = false;
                        change_background_by_name(companyname[j]);
                    }
                    if (designation[j].value == '') {
                        valid = false;
                        change_background_by_name(designation[j]);
                    }
                    if (workfrom[j].value == '') {
                        valid = false;
                        change_background_by_name(workfrom[j]);
                    }
                    if (workto[j].value == '') {
                        valid = false;
                        change_background_by_name(workto[j]);
                    }

                }
            }
        }
        if (workfrom[i].value != '' && date_validation(null, workfrom[i]) == false) {
            valid = false;
            display_block_by_name(workfromvalid[i]);
            change_background_by_name(workfrom[i]);
        }
        if (workto[i].value != '' && date_validation(null, workto[i]) == false) {
            valid = false;
            display_block_by_name(worktovalid[i]);
            change_background_by_name(workto[i]);
        }
        if (!date_difference(workfrom[i].value, workto[i].value)) {
            valid = false;
            alert('From-date cannot be greater than To-date');
        }
    }

    return valid;
}

let reference_validation = () => {
    let refname = document.getElementsByName('refname[]');
    let refcontact = document.getElementsByName('refcontact[]');
    let refrel = document.getElementsByName('refrel[]');
    let refcontactvalid = document.getElementsByName('refcontactvalid[]');

    let valid = true;
    for (let i = 0; i < refname.length; i++) {
        if (refname[i].value != '' || refcontact[i].value != '' || refrel[i].value != '') {
            if (refname[i].value == '') {
                change_background_by_name(refname[i]);
                valid = false;
            }
            if (refcontact[i].value == '') {
                change_background_by_name(refcontact[i]);
                valid = false;
            }
            if (refrel[i].value == '') {
                change_background_by_name(refrel[i]);
                valid = false;
            }
            if (i != 0) {
                for (let j = i - 1; j >= 0; j--) {
                    if (refname[j].value == '') {
                        valid = false;
                        change_background_by_name(refname[j]);
                    }
                    if (refcontact[j].value == '') {
                        valid = false;
                        change_background_by_name(refcontact[j]);
                    }

                    if (refrel[j].value == '') {
                        valid = false;
                        change_background_by_name(refrel[j]);
                    }
                }
            }
        }
        const validCnoRegex = /^[0-9]{10}$/g;
        if (refcontact[i].value != '' && !refcontact[i].value.match(validCnoRegex)) {
            valid = false;
            display_block_by_name(refcontactvalid[i]);
            change_background_by_name(refcontact[i]);
        }
    }
    return valid;
}

let preference_validation = () => {
    let valid = true;
    let noticeperiod = document.getElementById('noticeperiod');
    if (noticeperiod.value == '') {
        valid = false;
        change_background('noticeperiod');
    }

    if (noticeperiod.value != '' && (!/^[0-9]+$/.test(noticeperiod.value) || Number(noticeperiod.value) < 15)) {
        valid = false;
        display_block('noticeperiodvalid');
        change_background('noticeperiod');
    }

    let expectedCTC = document.getElementById('expectedCTC');
    let currentCTC = document.getElementById('currentCTC');

    if (expectedCTC.value == '') {
        valid = false;
        change_background('expectedCTC');
    }
    if (expectedCTC.value != '') {
        if (!expectedCTC.value.includes('.')) {
            valid = false;
            change_background('expectedCTC');
            display_block('expectedCTCvalid');
        }
        else {
            if (!expectedCTC.value.split('.')[0].match(/^[0-9]{2}$/g) || !expectedCTC.value.split('.')[1].match(/^[0-9]{2}$/g)) {
                valid = false;
                change_background('expectedCTC');
                display_block('expectedCTCvalid');
            }
        }
    }

    if (currentCTC.value == '') {
        valid = false;
        change_background('currentCTC');
    }
    if (currentCTC.value != '') {
        if (!currentCTC.value.includes('.')) {
            valid = false;
            change_background('currentCTC');
            display_block('currentCTCvalid');
        }
        else {
            if (!currentCTC.value.split('.')[0].match(/^[0-9]{2}$/g) || !currentCTC.value.split('.')[1].match(/^[0-9]{2}$/g)) {
                valid = false;
                change_background('currentCTC');
                display_block('currentCTCvalid');
            }
        }
    }
    return valid;
}

let change_background = (id) => {
    document.getElementById(id).style.background = "#ffdddd";
}

let change_background_by_name = (element) => {
    element.style.background = "#ffdddd";
}

let display_block = (id) => {
    document.getElementById(id).style.display = "block";
}

let display_block_by_name = (element) => {
    element.style.display = "block";
}

let date_validation = (id, element) => {
    let date;
    if (id != null) {
        date = document.getElementById(id).value;
    }
    if (element != null) {
        date = element.value;
    }
    console.log(date);
    if (!date.includes('-')) return false;
    let arr = [];
    arr = date.split('-');
    if (arr.length != 3) return false;
    let year = (arr[0]);
    let month = (arr[1]);
    let day = (arr[2]);
    const validYearRegex = /^[0-9]{4}$/g;
    if (!year.match(validYearRegex)) return false;
    const validMonthAndYearRegex = /^[0-9]{2}$/g;
    if (!month.match(validMonthAndYearRegex) || !day.match(validMonthAndYearRegex)) return false;
    if (Number(month) > 12 || Number(month) < 1 || Number(day) > 31 || Number(day) < 1) {

        return false;
    }
    let months_with_even_days = [2, 4, 6, 9, 11];
    if (months_with_even_days.includes(Number(month)) && (Number(day) == 31)) return false;
    let is_leap_year = false;
    if ((0 == Number(year) % 4) && (0 != Number(year) % 100) || (0 == Number(year) % 400)) is_leap_year = true;
    if ((!is_leap_year && Number(month) == 2 && Number(day) >= 29) || (is_leap_year && Number(month) == 2 && Number(day) >= 30)) return false;
    return null;
}

let date_difference = (from, to) => {
    let valid = true;
    const isAfterDate = (dateA, dateB) => dateA >= dateB;
    valid = isAfterDate(new Date(to), new Date(from));
    console.log(valid);
    return valid;
}




