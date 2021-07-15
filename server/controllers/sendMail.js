
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

async function sendmail(data, type) {
  if (type === "forgetPassword") {
    passwordResetOption = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: "password reset for Examiner appointment system",
      html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.<br/><br/>
                    Please click on the following link, or paste this into your browser to complete the process:<br/><br/>
                    ${data.link}
                    <br/>
                    If you did not request this, please ignore this email and your password will remain unchanged.\n 
                    the above link will automatically expire after 10 minutes </p>
                    <h3>Sincerely,<br/>
                    Examiner appointment system <br/>
                    Development Team</h3>`
    }
    try {
      await transporter.sendMail(passwordResetOption);
      console.log('send mail to ' + data.email);
    }
    catch (e) {
      console.log(e)
    }
  }
  else if (type === "appointment") {
    mail_receiver = [];
    mail_receiver.push(data.Internal_1.email);
    mail_receiver.push(data.Internal_2.email);
    mail_receiver.push(data.External_1.email);
    examTypeStr = data.Exam_type.join(', ')
    appointmentemail = {
      from: process.env.EMAIL_USER,
      to: mail_receiver,
      subject: "Appointment order from Examiner Appointment system(K.J.S.I.E.I.T)",
      html: `<strong style="font-size:16px">Dear Sir/Madam,</strong>
                  <div style="font-weight:bold; font-size:16px;">
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; You have been appointed as an examiner for <strong>${examTypeStr}</strong> Examination by K.J Somaiya Institute of Engineering and Information Technology.
                  </div>
                  
                  <table border="1" style="margin:15px; font-size: 16px; text-align:center;">
                  <caption style="font-weight:bold; margin:7px;">Details Of the Examination are as follows</caption>
                  <thead style="background-color: cornflowerblue; color:white;">
                    <td>Sr. No</td>
                    <td>Details</td>
                    <td style="padding:10px;">Info</td>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Department</td>
                      <td style="padding:10px;">${data.Department}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Course Code</td>
                      <td style="padding:10px;">${data.Course.code}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Name of Course</td>
                      <td style="padding:10px;">${data.Course.name}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Year/Sem</td>
                      <td style="padding:10px;">${data.Course.year}/${data.Course.semester}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Theory</td>
                      <td style="padding:10px;">${data.Exam_type.includes("Semester") ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Oral</td>
                      <td style="padding:10px;">${data.Exam_type.includes("Orals") ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Practical</td>
                      <td style="padding:10px;">${data.Exam_type.includes("Practicals") ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Project</td>
                      <td style="padding:10px;">${data.Exam_type.includes("Mini project") ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>First Half(May/June)</td>
                      <td style="padding:10px;">${(data.Course.semester % 2 == 0) ? "No" : "Yes"}</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>Second Half(Nov/Dec)</td>
                      <td style="padding:10px;">${(data.Course.semester % 2 == 0) ? "Yes" : "No"}</td>
                    </tr>

                  </tbody>
                </table>
                  <br/><br/>
                  <br/>
                  <h3>Sincerely,<br/>
                  Exam management system <br/>
                  Development Team</h3>`
    }
    try {
      await transporter.sendMail(appointmentemail);
      console.log('mail sent to respective examiners');
    }
    catch (e) {
      console.log(e)
    }
  }
}

module.exports = sendmail;