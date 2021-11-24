const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const userRoutes = require("./routes/api/users");
const classRoutes = require("./routes/api/classes")
const cors = require('cors')
const app = express();

app.use(cors());

app.use(express.urlencoded());

app.use(express.json());

const dbURI = require("./config/keys").mongoURI;
mongoose.connect(dbURI, {
    useNewUrlParser: true
}).then(() => console.log("MongoDB successfully connected")).catch(err => console.log(err));

app.use(passport.initialize());

const passportFunction = require("./config/passport");

passportFunction(passport);

app.use("/api/users", userRoutes)
app.use("/api/classes", classRoutes)

// Heroku port or local host - what is process.env => know exactly
const port = (process.env.PORT || 5000);

// why back ticks and ${}??
app.listen(port, () => console.log(`Listening at ${port}`));