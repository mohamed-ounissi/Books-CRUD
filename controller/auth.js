const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const Signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Please fill in all fields." });

    if (!validateEmail(email))
      return res.status(400).json({ msg: "Invalid emails." });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let newUser = new User({
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    savedUser = savedUser.toObject();
    delete savedUser.password;
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const Login = async (req, res) => {
  try {
    let { email, password } = req.body;

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      res.status(400).json({ msg: "Email is not found in the database." });
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        res.status(400).json({ msg: "Wrong password." });
      } else {
        const { password, ...others } = user._doc;
        res.status(200).json({
          token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          }),
        });
      }
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

module.exports = {
  Signup,
  Login,
};
