const nodemailer = require('nodemailer')

const sendReminderMail = ({todo}) => {
  
    let mailer = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "Gmail",
      auth: {
        user: "gyangps1998@gmail.com",
        pass: "drnmvjjhurecggjv",
      },
    });
  
    let sender = "Todo App";
    let mailOptions = {
      from: sender,
      to: todo.email,
      subject: "Task Reminder for Todo App",
      text:`Your Task which name is ${todo.taskName}, is still pending while time is less than 1 hour`
    };
  
    mailer.sendMail(mailOptions, function (err, response) {
      if (err) throw err;
      else console.log("Mail has been sent successfully");
    });
  };

  module.exports = sendReminderMail;