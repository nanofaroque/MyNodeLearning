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

    var table = "PendingApprovalRequest";

    var userId = 'nanofaroque';
    var dataSourceId = "nanofaroque#The Big New Movie";

    var params = {
        TableName:table,
        Item:{
            "userId": userId,
            "dataSourceId": dataSourceId,
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

module.exports = router;
