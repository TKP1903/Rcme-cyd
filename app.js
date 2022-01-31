const express = require("express");
const app = express();
const multer = require("multer");
app.use(express.static("frontend"));
const morgan = require("morgan");
const cors = require("cors");
const https = require("https")
const nodemailer = require("nodemailer");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
const knex = require("knex");

const { v4: uuidv4 } = require("uuid");
const { unique } = require("jquery");
const shortid = require("shortid");
const { request } = require("https");

app.use(express.static('public'));  
app.use('/images', express.static('images')); 

// Create database object
const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: "5432",
    user: "nishanth",
    // password: "password",
    database: "rcme",
  },
});
app.get("/", (request, response) => {
  response.json({ message: "Hey! This is your server response!" });
  var number = Math.random(); // 0.9394456857981651
  number.toString(36); // '0.xtis06h6'
  var id = number.toString(36).substr(2, 6); // 'xtis06h6'
  id.length >= 6; // false

  console.log(id);
});

app.post("/user", (req, res) => {
  const {
    studentName,
    studentAge,
    grade,
    parentName,
    email,
    phoneNumber,
    school,
    region,
    city,
    address,
    pincode,
    payment,
    ageGroup,
  } = req.body;

  var number = Math.random(); // 0.9394456857981651
  number.toString(36); // '0.xtis06h6'
  var uniqueid = number.toString(36).substr(2, 8); // 'xtis06h6'
  uniqueid.length >= 8; // false

  console.log(uniqueid);

  db.insert({
    uniqueid,
    studentname: studentName,
    studentage: studentAge,
    grade,
    parentname: parentName,
    email,
    agegroup: ageGroup,
    phonenumber: phoneNumber,
    school,
    region,
    city,
    address,
    pincode,
    payment,
    status: false,
    paymentstatus: true,
  })
    .into("entries")
    .then(() => res.json({ success: true }))
    .catch((err) =>
      console.log({
        success: false,
        message: "upload failed",
        stack: err.stack,
      })
    );
  var smtpConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "colouryourdreams@rcme.in", // generated ethereal user
      pass: "rcme@admin",
    },
  };

  var transporter = nodemailer.createTransport(smtpConfig);
  let mailOptions = {
    from: "colouryourdreams@rcme.in", // sender address
    to: email, // list of receivers
    subject: "RCME Registration Successful", // Subject line
    html:
    "<h2>Dear Student,</h2> "+
    "<p>Thank you for registering for the art competition- <b>Colour your Dreams</b>. This event is being conducted by Rotary Club of Madras East in collaboration with Nippon Paints, Winners Academy and Indian Institute of Architects (Tamil Nadu Chapter).</p>"+
      "<br/> <h4>The themes for the entries:</h4>" +
      "<h4><b>Upto 8 yrs:</b></h4>"+"<ul><li>If I were a cartoon character</li><li>Under the Sea</li><li>Ambition</li></ul><br/>"+
      "<h4><b>8 to 12 yrs:</b></h4>"+"<ul><li>My dream world</li><li>Safe world</li><li>Reduce reuse recycle</li></ul><br/>"+
      "<h4><b>12 to 16 yrs:</b></h4>"+"<ul><li>Water is life</li><li>Healthy world</li><li>Indian tradition form</li></ul><br/>"+
      "<p><b>The registration cost Rs.250/- would be used for a service project proposed by RCME called E-Shala, which will be the provision of school Infrastructure impacting 1,00,000 underprivileged students. Interested children can wish to pay a higher nomination fee. </b></p> <br />"+
      "<br/><p>Registration starts on 15th October and last date of accepting entries will be 31st October.</p>"+
      "<br/><p>Interested students can register themselves on the RCME portal through the registration link provided.  The unique ID provided to the student has to be quoted on their artwork before the final upload is done.</p>"+
      "<br/><p><b>Register:</b></p><a href="+"http://cyd.rcme.org"+">http://cyd.rcme.org</a>"+
      "<br/><p><b>Link to upload artwork: </b></p><a href="+"http://cyd.rcme.org/upload>http://cyd.rcme.org/upload</a> using this uniqueid - "+ uniqueid +
      "<br/><p><b>Max size of artwork: 2MB Maximum</b></p>"+
      "<br/><p>The first round will be judged city wise by the IIA, TN chapter. The final round will be judged by a panel of eminent artists. The results will be announced on 14th Nov (Children’s Day) and the winners will be invited for the Prize Distribution at Crowne Plaza, Chennai. The artwork of the Winners will be painted and displayed on the walls of public buildings under the Singara Chennai Project.</p>", // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("contact", { msg: "Email has been sent" });
  });
});

app.get("/user", function (req, res) {
  var count;
  db.raw("SELECT Count(*) from entries").then((data) => {
    count = data.rows[0].count;
  });
  var page = req.query.page;
  var per_page = req.query.per_page;

  var end = per_page * page;
  var start = end - per_page + 1;

  db.select("*")
    .from("entries")
    .whereBetween("id", [start, end])
    .then((data) => res.json({ data: data, count }))
    .catch((err) =>
      res.status(404).json({
        success: false,
        message: "not found",
        stack: err.stack,
      })
    );
});

// app.get("/paginated-results", (req, res) => {
//   const page = req.query.page;

//   return db("entries").select("*").paginate({
//     perPage: 10,
//     currentPage: page
//   }).then(results => {
//     res.json(results)
//   })
// })

app.put("/update/:uniqueid", (req, res) => {
  db("entries")
    .where("uniqueid", req.params.uniqueid)
    .update({
      status: req.body.status,
      mark1: req.body.mark1,
      mark2: req.body.mark2,
      signedby: req.body.signedby,
      remarks: req.body.remarks,
    })
    .then(() => res.json({ success: true }))
    .catch((err) =>
      res.json({
        success: false,
        message: "upload failed",
        stack: err.stack,
      })
    );
});
app.put("/updateadmin/:uniqueid", (req, res) => {
  db("entries")
    .where("uniqueid", req.params.uniqueid)
    .update({
      paymentstatus: req.body.paymentstatus,
    })
    .then(() => res.json({ success: true }))
    .catch((err) =>
      res.json({
        success: false,
        message: "upload failed",
        stack: err.stack,
      })
    );
});

app.put("/users/:uniqueid", (req, res) => {
  db("entries")
    .where("uniqueid", req.params.uniqueid)
    .update({
      mark1: req.body.mark1,
      mark2: req.body.mark2,
      signedby: req.body.signedby,
      remark: req.body.remark,
    })
    .then(() => res.json({ success: true }))
    .catch((err) =>
      res.json({
        success: false,
        message: "upload failed",
        stack: err.stack,
      })
    );
});

app.post("/login", (req, res) => {
  const { userName, password } = req.body;
  db.select("*")
    .from("users")
    .where("username", userName)
    .then((data) => {
      res.send(data[0]);
    });
});
app.get("/admin", (req, res) => {
  db.select("*")
    .from("entries")
    .then((data) => res.json(data));
});

app.get("/userage", (req, res) => {
  db.select("*")
    .from("entries")
    .where("age", req.body.age)
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(404).json({
        success: false,
        message: "not found",
        stack: err.stack,
      })
    );
});

app.get("/usercity", (req, res) => {
  db.select("*")
    .from("entries")
    .where("region", req.body.region)
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(404).json({
        success: false,
        message: "not found",
        stack: err.stack,
      })
    );
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");
app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/upload/:uniqueid", (req, res) => {
  db("entries")
    .select("*")
    .where("uniqueid", req.params.uniqueid)
    .then((data) => res.json({ success: true, data: data }))
    .catch((err) =>
      res.json({ success: false, message: "upload failed", stack: err.stack })
    );
});

app.put("/upload/:uniqueid", (req, res) => {
  upload(req, res, (err) => {
    console.log(req.file);
    if (err) {
      res.sendStatus(500);
    }
    db("entries")
      .select("*")
      .where("uniqueid", req.params.uniqueid)
      .then((result) => {
        console.log(result[0].filename);
        if (result[0].filename) {
          res.json({ message: "Already Uploaded You drawing" });
        } else {
          db("entries")
            .where("uniqueid", req.params.uniqueid)
            .update({
              filename: req.file.filename,
              filepath: req.file.path,
              mimetype: req.file.mimetype,
              size: req.file.size,
            })
            .then(() => res.json({ success: true }))
            .catch((err) =>
              res.json({
                success: false,
                message: "Upload failed",
                stack: err.stack,
              })
            );
        }
      });
  });
});

app.get("/usersing/:uniqueid", (req, res) => {
  db.select("*")
    .from("entries")
    .where("uniqueid", req.params.uniqueid)
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(404).json({
        success: false,
        message: "not found",
        stack: err.stack,
      })
    );
});

app.listen(3050, () => {
  console.log(`Example app listening at http://206.189.130.90:3050`);
});
