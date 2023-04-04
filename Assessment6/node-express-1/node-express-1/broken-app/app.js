const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json())

app.post('/', async function (req, res, next) {
  try {
    let result = [];
    for (d of req.body.developers) {
      let response = await axios.get(`https://api.github.com/users/${d}`);
      result.push({ "bio": response.data.bio, "name": response.data.name })
    };

    return res.send(result);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

app.listen(3000, function () {
  console.log("Server starting on port 3000")
})
