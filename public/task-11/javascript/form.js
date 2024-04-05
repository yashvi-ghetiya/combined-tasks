function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    if (submitype == 'insert') {
      document.getElementById("nextBtn").innerHTML = "Submit";
    }
    else if (submitype == 'update') {
      document.getElementById("nextBtn").innerHTML = "Update";
    }

  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  fixStepIndicator(n)
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    if(submitype == 'update')
    {
      updateData();
    }
    else
    {
      submitData();
    }
   
    return false;
  }

  showTab(currentTab);
}

function validateForm() {
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  z = x[currentTab].getElementsByTagName("textarea");
  a = x[currentTab].getElementsByTagName("select");

  if(currentTab==0)
  {
    valid = basic_details_validation();
  }

  if(currentTab==1)
  {
    valid = education_details_validation();
  }

  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

function fixStepIndicator(n) {
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }

  x[n].className += " active";
}

function onloadfun() {

  //fetch-state
  
  let url = "/dashboard/t11-fetch-state";
  fetch(url).then(response => response.json()).then(result => {

    var state = document.getElementById('state');
    var option = document.createElement("option");
    option.name = "stateop";
    option.value = '-1';
    option.text = 'Select State';
    option.hidden = true;
    option.disabled = true;
    option.selected = true;
    state.appendChild(option);

   
    Object.keys(result).forEach(key => {

      Object.keys(result[key]).forEach(key1 => {

        var option = document.createElement("option");
        option.setAttribute("name", "stateop");
        option.value = result[key][key1]['id'];
        option.text = result[key][key1]['name'];
        state.appendChild(option);

      })
    })
  })

  var city = document.getElementById('city');
  var option = document.createElement("option");
  option.setAttribute("name", "cityop");
  option.value = '-1';
  option.text = 'Select City';
  option.hidden = true;
  option.disabled = true;
  option.selected = true;
  city.appendChild(option);

  if(submitype == 'update')
  {
    let id = window.location.href.split("/").pop();
    let url = "/dashboard/t11-fetch/" + id;
    fetch(url).then(response => response.json()).then(result => {
        fillfields(result);
    })
  }
}

let stateSeleted = () => {
  let url = "/dashboard/t11-fetch-city/" + document.getElementById('state').value;
  fetch(url).then(response => response.json()).then(result => {
    var city = document.getElementById('city');
    city.innerHTML = null;
    Object.keys(result).forEach(key => {
      Object.keys(result[key]).forEach(key1 => {
        var option = document.createElement("option");
        option.setAttribute("name", "cityop");
        option.id = "cityop";
        option.value = result[key][key1]['id'];
        option.text = result[key][key1]['city'];
        city.appendChild(option);
      })
    })
  })
}

let submitData = async () => {

  let url = "/dashboard/t11-post-data";

  let form = document.getElementById("regForm");

  const data = new URLSearchParams(new FormData(form));

  let res1 = await fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  });

  
  res1 = await res1.json();

  var alert = document.getElementById('alert');
  alert.style.display = 'block';

  return true;
}

let clearform = () => {
  var alert = document.getElementById('alert');
  alert.style.display = 'none';

  document.getElementById("regForm").reset();
  showTab(0);
}

let loadData = async () => {
  let url = "/dashboard/t11-fetch-data";
  var table = document.getElementById('candidates');
  table.innerHTML = null;
  var tr = document.createElement('tr');

  var th = document.createElement('th');
  th.innerHTML = "Sr No.";
  tr.appendChild(th);

  var th = document.createElement('th');
  th.innerHTML = "Fname";
  tr.appendChild(th);

  var th = document.createElement('th');
  th.innerHTML = "Lname";
  tr.appendChild(th);



  var th = document.createElement('th');
  th.innerHTML = "Update";
  tr.appendChild(th);

  table.appendChild(tr);


  fetch(url).then(response => response.json()).then(result => {
   
    Object.keys(result).forEach(key => {
      Object.keys(result[key]).forEach(key1 => {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.innerHTML = result[key][key1]['canid'];
        tr.appendChild(td);

        var td = document.createElement('td');
        td.innerHTML = result[key][key1]['fname'];
        tr.appendChild(td);

        var td = document.createElement('td');
        td.innerHTML = result[key][key1]['lname'];
        tr.appendChild(td);


        var td = document.createElement('td');
        var button = document.createElement('button');
        button.setAttribute("onclick", "UpdateData(" + result[key][key1]['canid'] + ")");
        var value = document.createTextNode("Update");
        button.appendChild(value)
        button.classList.add("button");
        td.appendChild(button);
        tr.appendChild(td);

        table.appendChild(tr);
      })
    })
  })
}

let updateData =async() => {
  var id = window.location.href.split('/').pop();
  let url = "/dashboard/t11-updatedata/"+id;

  let form = document.getElementById("regForm");

  const data = new URLSearchParams(new FormData(form));

  let res1 = await fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  });

  res1 = await res1.json();

  var alert = document.getElementById('alert');
  alert.style.display = 'block';

  return true;
}


