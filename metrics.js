const client = require("prom-client");

// collect default Node.js metrics (CPU, memory, event loop, GC)
client.collectDefaultMetrics({
  timeout: 5000,
});

module.exports = client;

