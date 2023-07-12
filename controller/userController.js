const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const RegisterUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(404);
    throw new Error("All fields are mandatory!");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(404);
    throw new Error("User already register");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = User.create({
    username,
    email,
    password: hashPassword,
  });

  console.log(`User Created ${user}`);

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(404);
    throw new Error("User data not valid for us");
  }
  res.json({ msg: "User Register" });
});

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password is required!");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "10m" }
    );
    res.status(201).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email and password is not valid");
  }
});

const CurrentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { RegisterUser, LoginUser, CurrentUser };
