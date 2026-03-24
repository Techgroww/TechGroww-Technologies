import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const login = async (req, res) => {

  const { email, password } = req.body

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const isMatch = bcrypt.compareSync(
    password,
    process.env.ADMIN_PASSWORD_HASH
  )

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.json({
    token,
    user: { email }
  })
}