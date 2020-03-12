let AWS = require("aws-sdk");
AWS.config.update({
    region: "local",
    endpoint: "http://localhost:8000"
});
let docClient = new AWS.DynamoDB.DocumentClient();


let table = "DataSources-Test";

function insertIndoDynamoDB(id) {
    let moment = require('moment');
    let params = {
        TableName: table,
        Item: {
            "p_key": '' + id, //POSIX group
            "sort_key": 'DataSource#' + id,
            'created_at': JSON.stringify(moment().format()),
            'updated_at': JSON.stringify(moment().format()),
            'data_source_creator': ''+id+''+id,
        }
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

for (let x = 1; x < 20; x++) {
    insertIndoDynamoDB(x) // Async operation to send a push notification
}

console.log("Adding a new item...");
