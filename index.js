const express = require('express');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 8080;
const app = express();
dotenv.config();


app.get('/', (req, res) => {
  return res.json({
    "name" : "Kunal",
    "secret" : process.env.MY_SECRET,
  });
}
);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})