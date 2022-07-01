//import modules installed at the previous step. We need them to run Node.js server and send emails
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// create a new Express application instance
const app = express();

//configure the Express middleware to accept CORS requests and parse request body into JSON
app.use(cors({origin: "*" }));
app.use(bodyParser.json());

//start application server on port 3000
app.listen(9000, () => {
  console.log("The server started on port 9000");
});

// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/sendmail", (req, res) => {
  console.log("request came");
  
  let user = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:`${user.email}`,
      pass: `${user.password}`
    }
  });

  let info = transporter.sendMail({
    from: `${user.email}`,
    to: 'peterantony40@gmail.com',
    subject: user.subject,
    html: user.description,
  })

  if (info) {
    console.log("Email has been sent");
    res.send('message sent');
  } else {
    res.status(400);
    res.send({ error: "Failed to send email" });
  }
});

  