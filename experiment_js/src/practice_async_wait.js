console.log('starting');
const fetch = require('node-fetch');
const background= async ()=>{
    return  fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => {return json})
        .catch(err=>{return err})
}


another=async ()=>{
    let res= await background();
    console.log('result: '+JSON.stringify(res))
    console.log('I am depending on res')
};

another()