require("app-module-path").addPath(__dirname);

const express    = require("express"),
      bodyParser = require("body-parser");

const env = process.env.NODE_ENV || "development";
const port = process.env.NODE_PORT || 3000;
const app = express();

require("./db");

app.use(require("_middleware/cors"));
app.use(require("_middleware/decode-token"));
app.use(require("_middleware/auto-renew-token"));

app.use(bodyParser.json());
app.use("/api", require("./api"));

app.use(express.static("dist"));

app.all("/views/*", (req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (env === "production") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send();
    next();
  });
} else {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      status: err.status,
      stack: err.stack
    });
    next();
  });
}

app.listen(port, () => {
  console.log(`Running on port ${port}, in env: ${env}`);
});
