import nodemailer from "nodemailer"

const sendEmail = async (data) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Contact Request - ${new Date().toLocaleString()}`,
    text: `
    Full Name: ${data.name}
    Email: ${data.email}
    Subject: ${data.subject}
    Message: ${data.message}
    `
  }

  await transporter.sendMail(mailOptions)
}

export default sendEmail