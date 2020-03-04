var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");
AWS.config.update({
    region: "local",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();
router.get('/',(req,res,next)=>{
    //res.send('hellor');
    var params = {
        "RequestItems": { // map of TableName to list of Key to get from each table
            "Employee": {
                "Keys": [ // a list of primary key value maps
                    {
                        "LoginAlias": {"S":'johns'}//if the primary key is hash/range
                    },
                    {
                        "LoginAlias": {"S":'marym'}//if the primary key is hash/range
                    },
                    // ... more keys to get from this table ...
                ],
                AttributesToGet: [ // option (attributes to retrieve from this table)
                    'FirstName',
                    'LastName'
                    // ... more attribute names ...
                ],
                ConsistentRead: false, // optional (true | false)
            },
            // ... more tables and keys ...
        },
        ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
    };
    let result;

    docClient.batchGet(params, (err, data) => {
        if (err) {
            console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Got multiple item:", JSON.stringify(data, null, 2));
            result = data;
            res.send(result);
        }
    });
});
module.exports = router;