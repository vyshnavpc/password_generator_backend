import Auth from '../helpers/Auth.js';
export const Signup = async (req, res) => {
    try {
        const { phone, name, otp } = req.body
        if (!phone || !name || !otp) {
            throw new Error('params require')
        }
        const auth = new Auth(req.body);
        const { token, ...rest } = await auth.signup();
        res.json(rest)
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
}
export const Login = async (req, res) => {
    try {
        const { phone, otp } = req.query
        if (!phone || !otp) {
            throw new Error("params require")
        }
        const auth = new Auth(req.query);
        const { token, ...rest } = await auth.login();
        res.cookie('authcookie', token, { maxAge: 900000, httpOnly: true })
        res.json(rest);
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
}

export const getOtp = async (req, res) => {
    try {
        const { phone } = req.query
        if (!phone) {
            throw new Error('phone number required')
        }
        const auth = new Auth(req.query);
        const otp = await auth.sendMessage(phone)
        res.json('otp send to phone number ' + phone)
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err.message })
    }
}
