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

 if(date_validation('dob')==false)
 {
  valid=false;
  change_background('dob');
  display_block('dobvalid');
 }
  return valid;
}

let education_details_validation = () => {
  let edu = document.getElementsByName('edu[]');

  
  let edupassingyear = document.getElementsByName('edupassingyear[]');

  let eduper = document.getElementsByName('eduper[]');
  let valid=true;
  for(let i=0;i<2;i++)
  {
    if(edu[i].value=='' ){
      valid=false;
      edu[i].style.background = "#ffdddd";
    }
    if( edupassingyear[i].value==''){
      valid=false;
      edupassingyear[i].style.background = "#ffdddd";
    }
    if(eduper[i].value==''){
      valid=false;
      eduper[i].style.background = "#ffdddd";
    }
  }
  if(valid==false) return valid;


}

let change_background = (id) => {

  // document.getElementById(id).style.border = "2px solid red";
  document.getElementById(id).style.background = "#ffdddd";
}

let display_block = (id) => {
  document.getElementById(id).style.display = "block";
}

let date_validation = (id) => {
  let date = document.getElementById(id).value;
  if (!date.includes('-')) return false;

  let arr = [];
  if (date.includes('-')) {
    arr = date.split('-');
  }
  else if (date.includes('/')) {
    arr = date.split('/');
  }

  if (arr.length != 3) return false;

  let year = (arr[0]);
  let month = (arr[1]);
  let day = (arr[2]);


  const validYearRegex = /^[0-9]{4}$/g;
  if (!year.match(validYearRegex)) return false;

  const validMonthAndYearRegex = /^[0-9]{2}$/g;
  if (!month.match(validMonthAndYearRegex) || !day.match(validMonthAndYearRegex)) return false;

  if (Number(month) > 12 || Number(month) < 1 || Number(day) > 31 || Number(day) < 1) {
    console.log("dgfg");
    return false;}

  let months_with_even_days = [2, 4, 6, 9, 11];

  if (months_with_even_days.includes(Number(month)) && (Number(day) == 31)) return false;

  let is_leap_year = false;
  if ((0 == Number(year) % 4) && (0 != Number(year) % 100) || (0 == Number(year) % 400)) is_leap_year = true;

  if ((is_leap_year && Number(month)==2  && Number(day)!=29) || (!is_leap_year && Number(month)==2  && Number(day)!=29)) return false;

  return null;
  // const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  // if (!document.getElementById('email').value.match(validEmailRegex)) {
  //   change_background("email");
  //   display_block('emailvalid')
  //   valid = false;
  // }

}