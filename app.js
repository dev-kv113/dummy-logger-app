const express = require('express')
const axios = require('axios')
const app = express()
const port = process.env.PORT || 8080

app.get('/', (req, res) => {
  res.send('Hello from dummy app!')
})

function sendLog() {
  const logEntry = {
    resourceLogs: [
      {
        resource: {
          attributes: [
            {
              key: "service.name",
              value: { stringValue: "dummy-logger-app" }
            }
          ]
        },
        scopeLogs: [
          {
            scope: { name: "node-app-logger" },
            logRecords: [
              {
                timeUnixNano: (Date.now() * 1e6).toString(),
                severityText: "INFO",
                body: { stringValue: "App is running at " + new Date().toISOString() }
              }
            ]
          }
        ]
      }
    ]
  }

  axios.post('http://172.30.188.4:4318/v1/logs', logEntry, {
    headers: { 'Content-Type': 'application/json' }
  }).then(() => {
    console.log("Sent log to OTEL")
  }).catch(err => {
    console.error("Failed to send log to OTEL:", err.message)
  })
}

let logging = false
let intervalRef = null

app.get('/start-logs', (req, res) => {
  if (!logging) {
    intervalRef = setInterval(sendLog, 5000)
    logging = true
    res.send('Logging started')
  } else {
    res.send('Already logging')
  }
})

app.get('/stop-logs', (req, res) => {
  if (logging) {
    clearInterval(intervalRef)
    logging = false
    res.send('Logging stopped')
  } else {
    res.send('Logging not active')
  }
})

app.listen(port, () => {
  console.log(`Dummy app listening at http://localhost:${port}`)
})
