const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require('./models/User');
require("./services/passport");

mongoose.connect(keys.mongoURI)

const app = express();

app.use(
  cookieSession({
    name: 'session',
    keys: [keys.cookieKey],
    maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);







app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', (req, res) => {
  res.send('Login!')
})


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}


app.listen(PORT)