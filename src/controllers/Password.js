import passwordGenerator from '../helpers/Password.js'
export const addPassword = async (req, res) => {
    try {
        const PasswordGenerator = new passwordGenerator()
        const { password } = req.body
        if (!password) {
            throw new Error("Params missing")
        }
        const result = await PasswordGenerator.addPassword(req.body.password, req.user.id)
        res.json(result)
    } catch (err) {
        res.status(500).json(err.message)
    }
}
export const getAllPassword = async (req, res) => {
    try {
        const { otp } = req.query
        if (!otp) {
            throw new Error("Params missing")
        }
        const PasswordGenerator = new passwordGenerator()
  
        const passwords = await PasswordGenerator.allPassword(otp, req.user.id)
        res.json(passwords)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

export const deletePassword = async (req, res) => {
    try {
        const { question_id } = req.query
        if (!question_id) {
            throw new Error('params require');
        }
        const PasswordGenerator = new passwordGenerator()
        const passwords = await PasswordGenerator.removePassword(question_id)
        res.json('password removed success fully')
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
}