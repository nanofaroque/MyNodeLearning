### Running DynamoDb locally in a container
1. Install docker
2. Run the command below
```$xslt
docker run -p 8000:8000 amazon/dynamodb-local -jar DynamoDBLocal.jar -inMemory -sharedDb
```

### Running dynamodb in local machine without container
Using container has some networking issue, I had to use my host computer. Here is a documented link: 

https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html

If you are using APP in a container but Dynamodb is running in host, you need to change some confiration like below: 
```
const AWS = require('aws-sdk');
    AWS.config.update({
        region: "local",
        endpoint: "http://host.docker.internal:8000"
    });
    
```

### NoSQL workbench installation

1. Go to the url below and start
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.html
