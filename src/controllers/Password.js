import passwordGenerator from '../helpers/Password.js'
export const addPassword = async (req, res) => {
    try {
        const PasswordGenerator = new passwordGenerator()
        const { password, userId } = req.body
        if (!password || !userId) {
            res.status(404).json({ status: false, message: '' })
        }
        const result = await PasswordGenerator.addPassword(req.body)
        res.json(result)
    } catch (err) {
        res.status(500).json(err.message)
    }
}
export const getAllPassword = async (req, res) => {
    try {
        req.user = { id: "650ab4e233542b8321d725e5" }
        const PasswordGenerator = new passwordGenerator()
        const passwords = await PasswordGenerator.allPassword(req.user.id)
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