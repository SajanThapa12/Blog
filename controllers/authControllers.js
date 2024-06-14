const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("json");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ error: "Username already taken" });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};

//bcrypt .hash(pass, salt)

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentails" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    req.user = user;
    res.cookie("logged_in, true");
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
