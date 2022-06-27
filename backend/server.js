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
app.listen(3000, () => {
  console.log("The server started on port 3000");
});

// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({ error: "Failed to send email" });
    } else {
      console.log("Email has been sent");
      res.send(info);
    }
  });
});

const sendMail = (user, callback) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secureConnection: false,
        tls: {
            ciphers:'SSLv3'
        },
        service: "Outlook365",
        auth: {
            user: `${user.email}`,
            pass: `${user.password}`
        },
    });
    const mailOptions = {
      from: `${user.name}, ${user.email}`,
      to: `clintan_antony@cjbyte.com`,
      subject: "recording",
      html: `${user.description}`
    };
    transporter.sendMail(mailOptions, callback);
  }

  