const express = require("express");
const nodemailer = require("nodemailer");
const {
  upload
} = require("../config/cloudinary");
const Student = require("../models/Student");
const Group = require("../models/Group");
const router = express.Router();

//testroute
router.post("/sendtestEmail", async (req, res) => {
  try {
    const {
      recipientEmail,
      subject,
      name,
      segments
    } = req.body;



    if (!segments || segments.length === 0) {
      return res.status(400).send("Email segments are required.");
    }

    // Create transporter for sending the email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "megarajan55@gmail.com", // Replace with your email
        pass: "jrwg fhjo guri toat", // Replace with your app-specific password
      },
    });

    const emailContent = segments.map((segment) => {
      if (segment.type === "segment-1") {
        return `
            <div style="background: ${segment.content.backgroundColor || "red"};width:750px;height:180px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="leftban" style="width:70%;padding:15px 0px 20px 50px;">
                    <div style="display: flex;">
                      <img class="banimg" src="${segment.content.icon}" alt="Icon" style="width:80px;height:60px;margin-top:20px;" />
                      <h1 style="font-size:30px;color:${segment.content.textColor || "white"}; font-weight:600;padding-top:10px;">
                        ${segment.content.heading}
                      </h1>
                    </div>
                    <p style="color:${segment.content.textColor || "white"};font-size:16px;margin-left:10px;">
                      ${segment.content.text}
                    </p>
                  </td>
                  <td class="right-image" style="width:30%;">
                    <img src="${segment.content.image}" alt="Right Image" style="max-width: 100%; height:180px;" />
                  </td>
                </tr>
              </table>
            </div>
          `;
      } else if (segment.type === "segment-2") {
        return `
            <div class="seg-2" style="width:650px;margin:0 auto;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td style="width:100%;padding-top:30px;color:black;font-size:16px;">
              <p>${segment.content.input} ${name},</p>
              <p>${segment.content.textEditor}</p>
            </td>
        </tr>
      </table>
            </div>
          `;
      } else if (segment.type === "segment-3") {
        return `
    <div class="seg-3" style="background: ${segment.content.backgroundColor || "red"};width:650px;height:280px;margin:0 auto;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <!-- Left Column: Text and Button -->
          <td class="leftseg" style="width:50%;padding:10px 0px 0px 30px;">
            <h2 style="font-size:25px;color:${segment.content.textColor || "white"};font-weight:bold;line-height:1.6;">
              ${segment.content.heading}
            </h2>
            <div style="width:230px;text-align:center;padding:18px 0px;border-radius:15px;background-color:${segment.content.buttonBackgroundColor || "white"}">
            <a href="${segment.content.input}" style="
              text-decoration: none;
              color:${segment.content.buttonTextColor || "black"};
              font-size: 15px;
              font-weight: 600;">
              Click Here 
            </a>
            <div>
          </td>
          <!-- Right Column: Image -->
          <td class="right-image" style = "width:50%;">
            <img src="${segment.content.image}" alt="Right Image" style="width: 100%;height:280px;"/>
          </td>
        </tr>
      </table>
    </div>`;
      } else if (segment.type === "segment-4") {
        return `
            <div class="seg-2" style="width:650px;margin:0 auto;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td style="width:100%;padding-top:30px;color:black;font-size:15px;">
              <div class="segtext">${segment.content.textEditor}</div>
            </td>
        </tr>
      </table>
            </div>
          `;
      } else if (segment.type === "segment-5") {
        return `
            <div style="background: ${segment.content.backgroundColor || "black"};width:750px;font-size:18px;align-items:center;color:${segment.content.textColor || "white"}">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr style="padding:10px;">
          <td style="padding:0px 10px 0px 20px;">
              <p>${segment.content.textEditor}</p>
            </td>
        </tr>
      </table>
            </div>
          `;
      }
      return "";
    });

    const mailOptions = {
      from: "megarajan55@gmail.com",
      to: recipientEmail,
      subject: subject,
      html: `
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
              .main{
                background-color:#f5f3f3;
              } 
              .sub-main{
                background-color:white;
                margin:0 auto;
                width:750px;
                box-shadow:0 5px 10px rgba(0, 0, 0, 0.2) !important;
              }          
              @media(max-width:768px) {
                 .main{
                   background-color:transparent !important;
                 }
                 .segtext{
                  font-size:10px !important;

                 }
                 .sub-main {
                   background-color:white !important;
                   width:360px !important;
                 }
                 .banimg{
                  margin-top:10px !important;
                 }
                 .right-image{
                    display:none !important;
                 }
                 .leftban,.leftseg{
                  width:100% !important;
                 }
                 .leftban{
                  padding:15px 5px 15px 25px !important;
                 }
                 .leftseg{
                  height:250px !important;
                 }
                 .seg-2{
                  width:300px !important;
                  background-color:white!important;
                  color:black !important;
                 }
                 .seg-3{
                  width:300px !important;
                 }
                h2{
                  font-size:16px !important;
                }
                 h1{
                   font-size:16px !important;
                 }
                p{
                  font-size:10px !important;
                  margin-left:0px !important;
                }
              } 
            </style>
          </head>
          <body>
            <div class="main">
            <div class="sub-main">
              ${emailContent.join("")}
            </div>
            <div>
          </body>
          </html>
        `,
    };

    // Send email to the student
    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", recipientEmail);


    res.status(200).send("Emails sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Failed to send email.");
  }
});


router.post("/sendexcelEmail", async (req, res) => {
  try {
    const {
      excelData,
      message
    } = req.body; // Extracting excelData
    console.log("Received data:", req.body);

    // Validate if excelData exists and is an array
    if (!excelData || !Array.isArray(excelData) || excelData.length === 0) {
      return res.status(400).send("Excel data is required.");
    }

    // Extract headers and rows from the excelData
    const [headers, ...rows] = excelData;

    // Validate headers and indices
    const nameIndex = headers.indexOf("Name");
    const mailIndex = headers.indexOf("Email");
    if (nameIndex === -1 || mailIndex === -1) {
      return res
        .status(400)
        .send("Excel file must have 'Name' and 'Email' columns.");
    }

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "megarajan55@gmail.com", // Replace with your email
        pass: "jrwg fhjo guri toat", // Replace with your app-specific password
      },
    });

    // Loop through rows and send emails
    for (const row of rows) {
      const name = row[nameIndex];
      const mail = row[mailIndex];
      const segments = req.body.segments; // Extracting segments from req.body

      // Validate segments
      if (!segments || !Array.isArray(segments) || segments.length === 0) {
        return res.status(400).send("Email segments are required.");
      }

      // Generate email content based on segments
      const emailContent = segments.map((segment) => {
        if (segment.type === "segment-1") {
          return `
            <div style="background: ${segment.content.backgroundColor || "red"};width:750px;height:180px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="leftban" style="width:70%;padding:15px 0px 20px 50px;">
                    <div style="display: flex;">
                      <img class="banimg" src="${segment.content.icon}" alt="Icon" style="width:80px;height:60px;margin-top:20px;" />
                      <h1 style="font-size:30px;color:${segment.content.textColor || "white"}; font-weight:600;padding-top:10px;">
                        ${segment.content.heading}
                      </h1>
                    </div>
                    <p style="color:${segment.content.textColor || "white"};font-size:16px;margin-left:10px;">
                      ${segment.content.text}
                    </p>
                  </td>
                  <td class="right-image" style="width:30%;">
                    <img src="${segment.content.image}" alt="Right Image" style="max-width: 100%; height:180px;" />
                  </td>
                </tr>
              </table>
            </div>
          `;
        } else if(segment.type === "segment-2") {
          return `
            <div class="seg-2" style="width:650px;margin:0 auto;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td style="width:100%;padding-top:30px;color:black;font-size:16px;">
              <p>${segment.content.input} ${name},</p>
              <p>${segment.content.textEditor}</p>
            </td>
        </tr>
      </table>
            </div>
          `;
        } else if(segment.type === "segment-3") {
          return `
    <div class="seg-3" style="background: ${segment.content.backgroundColor || "red"};width:650px;height:280px;margin:0 auto;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <!-- Left Column: Text and Button -->
          <td class="leftseg" style="width:50%;padding:10px 0px 0px 30px;">
            <h2 style="font-size:25px;color:${segment.content.textColor || "white"};font-weight:bold;line-height:1.6;">
              ${segment.content.heading}
            </h2>
            <div style="width:230px;text-align:center;padding:18px 0px;border-radius:15px;background-color:${segment.content.buttonBackgroundColor || "white"}">
            <a href="${segment.content.input}" style="
              text-decoration: none;
              color:${segment.content.buttonTextColor || "black"};
              font-size: 15px;
              font-weight: 600;">
              Click Here 
            </a>
            <div>
          </td>
          <!-- Right Column: Image -->
          <td class="right-image" style = "width:50%;">
            <img src="${segment.content.image}" alt="Right Image" style="width: 100%;height:280px;"/>
          </td>
        </tr>
      </table>
    </div>`;
        }else if(segment.type === "segment-4") {
          return `
            <div class="seg-2" style="width:650px;margin:0 auto;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td style="width:100%;padding-top:30px;color:black;font-size:15px;">
              <div class="segtext">${segment.content.textEditor}</div>
            </td>
        </tr>
      </table>
            </div>
          `;
        } else if (segment.type === "segment-5") {
          return `
            <div style="background: ${segment.content.backgroundColor || "black"};width:750px;font-size:18px;align-items:center;color:${segment.content.textColor || "white"}">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr style="padding:10px;">
          <td style="padding:0px 10px 0px 20px;">
              <p>${segment.content.textEditor}</p>
            </td>
        </tr>
      </table>
            </div>
          `;
        }
        return "";
      });
      // Mail options
      const mailOptions = {
        from: "megarajan55@gmail.com",
        to: mail,
        subject: message,
        html: `
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
              .main{
                background-color:#f5f3f3;
              } 
              .sub-main{
                background-color:white;
                margin:0 auto;
                width:750px;
                box-shadow:0 5px 10px rgba(0, 0, 0, 0.2) !important;
              }          
              @media(max-width:768px) {
                 .main{
                   background-color:transparent !important;
                 }
                 .segtext{
                  font-size:10px !important;

                 }
                 .sub-main {
                   background-color:white !important;
                   width:360px !important;
                 }
                 .banimg{
                  margin-top:10px !important;
                 }
                 .right-image{
                    display:none !important;
                 }
                 .leftban,.leftseg{
                  width:100% !important;
                 }
                 .leftban{
                  padding:15px 5px 15px 25px !important;
                 }
                 .leftseg{
                  height:250px !important;
                 }
                 .seg-2{
                  width:300px !important;
                  background-color:white!important;
                  color:black !important;
                 }
                 .seg-3{
                  width:300px !important;
                 }
                h2{
                  font-size:16px !important;
                }
                 h1{
                   font-size:16px !important;
                 }
                p{
                  font-size:10px !important;
                  margin-left:0px !important;
                }
              } 
            </style>
          </head>
          <body>
            <div class="main">
            <div class="sub-main">
              ${emailContent.join("")}
            </div>
            <div>
          </body>
          </html>
        `,
      };

      // Send email
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to: ${mail}`);
    }

    res.status(200).send("All emails sent successfully.");
  } catch (err) {
    console.error("Error sending emails:", err);
    res.status(500).send("Failed to send emails.");
  }
});
// Endpoint to send bulkemails
router.post("/sendbulkEmail", async (req, res) => {
  try {
    const {
      students,
      segments,
      message
    } = req.body;

    // Validate the request
    if (!students || students.length === 0) {
      return res.status(400).send("Student details are required.");
    }

    if (!segments || segments.length === 0) {
      return res.status(400).send("Email segments are required.");
    }

    if (!message || message.trim() === "") {
      return res.status(400).send("Message content is required.");
    }

    // Create transporter for sending the email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "megarajan55@gmail.com", // Replace with your email
        pass: "jrwg fhjo guri toat", // Replace with your app-specific password
      },
    });

    // Send emails to each student in the provided list
    for (const student of students) {
      const emailContent = segments.map((segment) => {
        if (segment.type === "segment-1") {
          return `
            <div style="background: ${segment.content.backgroundColor || "red"};width:750px;height:180px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="leftban" style="width:70%;padding:15px 0px 20px 50px;">
                    <div style="display: flex;">
                      <img class="banimg" src="${segment.content.icon}" alt="Icon" style="width:80px;height:60px;margin-top:20px;" />
                      <h1 style="font-size:30px;color:${segment.content.textColor || "white"}; font-weight:600;padding-top:10px;">
                        ${segment.content.heading}
                      </h1>
                    </div>
                    <p style="color:${segment.content.textColor || "white"};font-size:16px;margin-left:10px;">
                      ${segment.content.text}
                    </p>
                  </td>
                  <td class="right-image" style="width:30%;">
                    <img src="${segment.content.image}" alt="Right Image" style="max-width: 100%; height:180px;" />
                  </td>
                </tr>
              </table>
            </div>
          `;
        } else if (segment.type === "segment-2") {
          return `
            <div class="seg-2" style="width:650px;margin:0 auto;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td style="width:100%;padding-top:30px;color:black;font-size:16px;">
              <p>${segment.content.input} ${student.name},</p>
              <p>${segment.content.textEditor}</p>
            </td>
        </tr>
      </table>
            </div>
          `;
        } else if (segment.type === "segment-3") {
          return `
    <div class="seg-3" style="background: ${segment.content.backgroundColor || "red"};width:650px;height:280px;margin:0 auto;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <!-- Left Column: Text and Button -->
          <td class="leftseg" style="width:50%;padding:10px 0px 0px 30px;">
            <h2 style="font-size:25px;color:${segment.content.textColor || "white"};font-weight:bold;line-height:1.6;">
              ${segment.content.heading}
            </h2>
            <div style="width:230px;text-align:center;padding:18px 0px;border-radius:15px;background-color:${segment.content.buttonBackgroundColor || "white"}">
            <a href="${segment.content.input}" style="
              text-decoration: none;
              color:${segment.content.buttonTextColor || "black"};
              font-size: 15px;
              font-weight: 600;">
              Click Here 
            </a>
            <div>
          </td>
          <!-- Right Column: Image -->
          <td class="right-image" style = "width:50%;">
            <img src="${segment.content.image}" alt="Right Image" style="width: 100%;height:280px;"/>
          </td>
        </tr>
      </table>
    </div>`;
        } else if (segment.type === "segment-4") {
          return `
            <div class="seg-2" style="width:650px;margin:0 auto;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td style="width:100%;padding-top:30px;color:black;font-size:15px;">
              <div class="segtext">${segment.content.textEditor}</div>
            </td>
        </tr>
      </table>
            </div>
          `;
        } else if (segment.type === "segment-5") {
          return `
            <div style="background: ${segment.content.backgroundColor || "black"};width:750px;font-size:18px;align-items:center;color:${segment.content.textColor || "white"}">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr style="padding:10px;">
          <td style="padding:0px 10px 0px 20px;">
              <p>${segment.content.textEditor}</p>
            </td>
        </tr>
      </table>
            </div>
          `;
        }
        return "";
      });

      const mailOptions = {
        from: "megarajan55@gmail.com",
        to: student.email,
        subject: message, // Replace the subject with the entered message
        html: `
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
              .main{
                background-color:#f5f3f3;
              } 
              .sub-main{
                background-color:white;
                margin:0 auto;
                width:750px;
                box-shadow:0 5px 10px rgba(0, 0, 0, 0.2) !important;
              }          
              @media(max-width:768px) {
                 .main{
                   background-color:transparent !important;
                 }
                 .segtext{
                  font-size:10px !important;

                 }
                 .sub-main {
                   background-color:white !important;
                   width:360px !important;
                 }
                 .banimg{
                  margin-top:10px !important;
                 }
                 .right-image{
                    display:none !important;
                 }
                 .leftban,.leftseg{
                  width:100% !important;
                 }
                 .leftban{
                  padding:15px 5px 15px 25px !important;
                 }
                 .leftseg{
                  height:250px !important;
                 }
                 .seg-2{
                  width:300px !important;
                  background-color:white!important;
                  color:black !important;
                 }
                 .seg-3{
                  width:300px !important;
                 }
                h2{
                  font-size:16px !important;
                }
                 h1{
                   font-size:16px !important;
                 }
                p{
                  font-size:10px !important;
                  margin-left:0px !important;
                }
              } 
            </style>
          </head>
          <body>
            <div class="main">
            <div class="sub-main">
              ${emailContent.join("")}
            </div>
            <div>
          </body>
          </html>
        `,
      };
      // Send email to the student
      await transporter.sendMail(mailOptions);
      console.log("Email sent to:", student.email);
    }

    res.status(200).send("Emails sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Failed to send email.");
  }
});
router.get("/groups/:groupId/students", async (req, res) => {
  const {
    groupId
  } = req.params;
  const students = await Student.find({
    group: groupId
  });
  res.json(students);
});




// Endpoint to upload a file
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: 'No file uploaded!'
    });
  }
  res.status(200).json({
    url: req.file.path
  });
});

router.post('/groups', async (req, res) => {
  try {
    const group = new Group(req.body);
    await group.save();
    res.status(201).send(group);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error creating group"
    });
  }
});


// Student Routes
router.post("/students/upload", async (req, res) => {
  await Student.insertMany(req.body);
  res.status(201).send("Students uploaded successfully");
});

router.post("/students/manual", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).send(student);
});

router.get("/students", async (req, res) => {
  const students = await Student.find().populate("group");
  res.send(students);
});

router.get('/groups', async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching groups'
    });
  }
});

// 2. DELETE route to delete a group and its associated students
router.delete('/groups/:id', async (req, res) => {
  try {
    const groupId = req.params.id;
    await Group.findByIdAndDelete(groupId); // Delete group
    await Student.deleteMany({
      group: groupId
    }); // Delete all students in that group
    res.status(200).json({
      message: 'Group and associated students deleted'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting group and students'
    });
  }
});

// 3. GET route to fetch all students, with optional filtering by group
router.get('/students', async (req, res) => {
  try {
    const {
      group
    } = req.query; // Filter by group if provided
    const filter = group ? {
      group
    } : {}; // Apply filter if group is provided
    const students = await Student.find(filter);
    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching students'
    });
  }
});

// 4. DELETE route to delete selected students
router.delete('/students', async (req, res) => {
  try {
    const {
      studentIds
    } = req.body; // Array of student IDs to delete
    await Student.deleteMany({
      _id: {
        $in: studentIds
      }
    }); // Delete students
    res.status(200).json({
      message: 'Selected students deleted'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting students'
    });
  }
});

// 5. PUT route to edit a student's details
router.put('/students/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedData = req.body; // Data to update (e.g., name, email)
    const updatedStudent = await Student.findByIdAndUpdate(studentId, updatedData, {
      new: true
    });
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({
      message: 'Error updating student'
    });
  }
});

//edit group name
router.put('/groups/:id', (req, res) => {
  const groupId = req.params.id;
  const updatedName = req.body.name;

  // Assuming you are using MongoDB with Mongoose
  Group.findByIdAndUpdate(groupId, {
      name: updatedName
    }, {
      new: true
    })
    .then(updatedGroup => res.json(updatedGroup))
    .catch(err => res.status(400).send(err));
});



module.exports = router;