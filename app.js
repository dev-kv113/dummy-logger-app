const express = require('express');
const app = express();
const port = 3000;

setInterval(() => {
  console.log(`[INFO] App is running at ${new Date().toISOString()}`);
  console.error(`[ERROR] Sample error at ${new Date().toISOString()}`);
}, 5000);

app.get('/', (req, res) => {
  res.send('Hello from dummy app!');
});

app.listen(port, () => {
  console.log(`Dummy app listening at http://localhost:${port}`);
});