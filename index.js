const express = require('express');
const dotenv = require('dotenv');
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require('@aws-sdk/client-secrets-manager');

dotenv.config();

const app = express();

async function fetchSecret() {
  const secret_name = 'secret-app-secrets';
  const client = new SecretsManagerClient({
    region: 'ap-south-1',
  });

  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: 'AWSCURRENT',
      })
    );

    const secretObj = JSON.parse(response.SecretString);
    const secret = secretObj.MY_SECRET;
    const port = secretObj.PORT;
    return { secret, port };
  } catch (error) {
    console.error('Error fetching secret:', error);
    process.exit(1); // Exit app if secrets can't be loaded
  }
}

// Wrap server startup inside an async IIFE
(async () => {
  const { secret, port } = await fetchSecret();
  const PORT = port || 8080;

  app.get('/', (req, res) => {
    return res.json({
      name: 'Kunal',
      secret: secret,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
