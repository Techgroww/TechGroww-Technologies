import express from "express"
import Contact from "../models/contact.js"
import sendEmail from "../utils/sendEmail.js"

const router = express.Router()

router.post("/contact", async (req, res) => {
  try {
    //Save in Database
    const contact = new Contact(req.body)
    await contact.save()

    //Send email
    await sendEmail(req.body)
    res.json({ message: "Form submitted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Email failed to send" })
  }
})

export default router