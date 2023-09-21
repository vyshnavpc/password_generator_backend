import Auth from '../helpers/Auth.js';
export const Signup = async (req, res) => {
    try {
        const { phone, name, otp } = req.body
        if (!phone || !name || !otp) {
            throw new Error('params require')
        }
        const auth = new Auth(req.body);
        const user = await auth.signup();
        res.json(user)
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
}
export const Login = async (req, res) => {
    try {
        const { phone, otp } = req.query
        if (!phone || !otp) {
            res.status(404).json({ status: false, message: "params require" })
        }
        const auth = new Auth(req.query);
        const user = await auth.login();
        res.json(user);
    } catch (err) {
        res.json(err);
    }
}

export const getOtp = async (req, res) => {
    try {
        const { phone } = req.query
        if (!phone) {
            res.status(404).json('phone number required')
        }
        const auth = new Auth(req.query);
        const otp = await auth.sendMessage(phone)
        res.json('otp send to phone number ' + phone)
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
}
