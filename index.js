const express = require('express');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 8080;
const app = express();
dotenv.config();

// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

const {
    SecretsManagerClient,
    GetSecretValueCommand,
  } =  require("@aws-sdk/client-secrets-manager");
  

  
async function fetchSecret() {

    const secret_name = "secret-app-secrets";
    const client = new SecretsManagerClient({
        region: "ap-south-1",
    });
    
    let response;
    
    try {
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        );
    } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        throw error;
    }
    const secret = response.MY_SECRET;
    console.log(secret);
    return secret;
}

const secret = fetchSecret()
  

app.get('/', (req, res) => {
  return res.json({
    "name" : "Kunal",
    "secret" : secret,
  });
}
);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})