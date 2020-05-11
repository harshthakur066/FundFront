const next = require("next");
const routes = require("./routes");
const PORT = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);
const { createServer } = require("http");

app.prepare().then(() => {
  createServer(handler).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Running on ${PORT} `);
  });
});
