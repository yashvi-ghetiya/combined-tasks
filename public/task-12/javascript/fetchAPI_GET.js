let fetch_GET = async (url) => {
   
    var result = await fetch(url);
    var result = await result.json();
    // console.log(result);
    return result;
}
