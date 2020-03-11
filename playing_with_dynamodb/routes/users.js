var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");
AWS.config.update({
    region: "local",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();
/* GET users listing. */
router.post('/', function(req, res, next) {

    var table = "DatasourceUsers";

    var userId = 'nanofaroque1';
    var dataSourceId = "nanofaroque#The Big New Movie";

    var params = {
        TableName:table,
        Item:{
            "userId": userId,
            "datasourceId": dataSourceId,
            "info":{
                "plot": "Nothing happens at all.",
                "rating": 0
            }
        }
    };

    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
  res.send('respond with a resource');
});

router.get('/',(req,res,next)=>{
    var params = {
        TableName: "PendingApprovalRequest",
        KeyConditionExpression: "#userId = :userId and begins_with(#dataSourceId, :s)",
        ExpressionAttributeNames:{
            "#userId": "userId",
            "#dataSourceId":"dataSourceId"
        },
        ExpressionAttributeValues: {
            ":userId":'nanofaroque',
            ":s":'nanofaroque'
        }
    };
    let result;

    docClient.query(params,(err,data)=>{
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            result=data;
            res.send(result);
        }
    });


})
module.exports = router;
