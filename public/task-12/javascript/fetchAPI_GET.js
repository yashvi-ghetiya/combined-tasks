let fetch_GET = async (url) => {
   
    var result = await fetch(url);
    var result = await result.json();
    
    return result;
}
