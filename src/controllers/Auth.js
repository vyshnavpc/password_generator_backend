import Auth from '../helpers/Auth.js';
const Signup = async (req, res) => {
    try {
        console.log(req.query);
        const auth = new Auth(req.query);
        const user =await auth.signup();
        res.json(user)
    } catch (err) {
        res.json("err")
    }
}
const Login = async (req, res) => {
    try {
        const auth = new Auth(req.query);
        const user =await auth.login();
        res.json(user);
    } catch (err) {
        res.json(err);
    }
}

export {
    Signup,
    Login
}