const express = require('express');
const app = express();
const port = 3000;

let logging = false;
let intervalRef = null;

app.get('/', (req, res) => {
  res.send('Hello from dummy app!');
});

app.get('/start-logs', (req, res) => {
  if (!logging) {
    intervalRef = setInterval(() => {
      console.log(`[INFO] App is running at ${new Date().toISOString()}`);
      console.error(`[ERROR] Sample error at ${new Date().toISOString()}`);
    }, 5000);
    logging = true;
    res.send('Logging started');
  } else {
    res.send('⚠️ Already logging');
  }
});

app.get('/stop-logs', (req, res) => {
  if (logging) {
    clearInterval(intervalRef);
    logging = false;
    res.send('Logging stopped');
  } else {
    res.send('Logging not active');
  }
});

app.listen(port, () => {
  console.log(`Dummy app listening at http://localhost:${port}`);
});
