const express = require("express");
const mongoose = require("mongoose");
const bodyParser  = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());



const SportRoute = require("./Routes/Sport.route");
const RequestRoute = require("./Routes/Request.route");
const FeedbackRoute = require("./Routes/Feedback.route");
const IssueRoute = require("./Routes/Issue.route");
const ReturnRoute = require("./Routes/Return.route");
const LoginRoute = require("./Routes/Login.route");
const SignupRoute = require("./Routes/Signup.route");
const HistoryRoute = require("./Routes/History.route");
const ChangePasswordRoute = require("./Routes/ChangePassword.route");

app.use("/sports", SportRoute);
app.use("/request", RequestRoute);
app.use("/feedback", FeedbackRoute);
app.use("/issue", IssueRoute);
app.use("/return", ReturnRoute);
app.use("/login", LoginRoute);
app.use("/signup", SignupRoute);
app.use("/history", HistoryRoute);
app.use("/changePassword", ChangePasswordRoute);


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    console.log("Error with connecting mongodb");
    console.info(err);
  });

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
