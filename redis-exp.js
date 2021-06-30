const redis=require('redis');
const { v4: uuidv4 } = require("uuid");
const client=redis.createClient({
    host:'127.0.0.1',
    port: '6379'
});
client.on('connect', function() {
    console.log('connected');
});

client.flushall( function(err,res) {
    console.log( "hello" );
    x = [];
    for (let i = 0; i <1000000 ; i++) {
        x.push(uuidv4())
    }
    client.sadd(x);
    client.sadd( "myset", x, function(err,res) {
        console.log("done");
        //client.end();
    });
});

client.on('error',err=>{
    console.log('Error: '+err);
})
