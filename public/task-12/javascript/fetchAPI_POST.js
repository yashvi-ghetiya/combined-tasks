let fetch_POST_form = async (url, formid) => {
    let form = document.getElementById(formid);
    const data = new URLSearchParams(new FormData(form));

    var res = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    });
    res = await res.json();
    
    return res;
}

let fetch_POST_json = async (url, data) => {
    var res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            data: data
        }),
        headers: {
            "Content-type": "application/json"
        }
    });
    res = await res.json();
    return res;
}