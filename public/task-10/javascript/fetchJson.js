
async function fetchjson()
{
    var result = await fetch('https://jsonplaceholder.typicode.com/posts')
    result = await result.json();

   return result;
}

