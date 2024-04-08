let clear_basic_details_validations=()=>{
    let tab = document.getElementsByClassName("tab");
    let inputs = tab[currentTab].getElementsByTagName("input");
    for (i = 0; i < inputs.length; i++) {
        inputs[i].style.background = "white";
    }
    document.getElementById('contactvalid').style.display="none";
    document.getElementById('statevalid').style.display="none";
    document.getElementById('cityvalid').style.display="none";
    document.getElementById('gendervalid').style.display="none";
    document.getElementById('relationvalid').style.display="none";
    document.getElementById('dobvalid').style.display="none";
    document.getElementById('emailvalid').style.display="none";
}

let clear_educational_details_validations=()=>{
 
    let tab = document.getElementsByClassName("tab");
    let inputs = tab[currentTab].getElementsByTagName("input");
    for (i = 0; i < inputs.length; i++) {
        inputs[i].style.background = "white";
    }

    let edupassingyearvalid = document.getElementsByName('edupassingyearvalid[]');
    for (let i = 0; i < edupassingyearvalid.length; i++) {
        edupassingyearvalid[i].style.display="none";
    }

    let edupervalid = document.getElementsByName('edupervalid[]');
    for (let i = 0; i < edupervalid.length; i++) {
        edupervalid[i].style.display="none";
    }
}

let clear_work_experience_validations=()=>{
    let tab = document.getElementsByClassName("tab");
    let inputs = tab[currentTab].getElementsByTagName("input");

    for (i = 0; i < inputs.length; i++) {
        inputs[i].style.background = "white";
    }

    let workfromvalid = document.getElementsByName('workfromvalid[]');
    for (let i = 0; i < workfromvalid.length; i++) {
        workfromvalid[i].style.display="none";
    }

    let worktovalid = document.getElementsByName('worktovalid[]');
    for (let i = 0; i < worktovalid.length; i++) {
        worktovalid[i].style.display="none";
    }
}

let clear_ref_validations=()=>{
    let tab = document.getElementsByClassName("tab");
    let inputs = tab[currentTab].getElementsByTagName("input");
    for (i = 0; i < inputs.length; i++) {
        inputs[i].style.background = "white";
    }

    let refcontactvalid = document.getElementsByName('refcontactvalid[]');
    for (let i = 0; i < refcontactvalid.length; i++) {
        refcontactvalid[i].style.display="none";
    }

}

let clear_preference_validations =()=>{
    let tab = document.getElementsByClassName("tab");
    let inputs = tab[currentTab].getElementsByTagName("input");
    for (i = 0; i < inputs.length; i++) {
        inputs[i].style.background = "white";
    }
    document.getElementById('noticeperiodvalid').style.display="none";
    document.getElementById('expectedCTCvalid').style.display="none";
    document.getElementById('currentCTCvalid').style.display="none";
}
