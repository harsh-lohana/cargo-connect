const zod = require("zod");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const signUpBody = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

const logInBody = zod.object({
  email: zod.string(),
  password: zod.string(),
});

const updateBody = zod.object({
  name: zod.string().optional(),
  email: zod.string().email().optional(),
  password: zod.string().optional(),
});

const signUpUser = async (req, res) => {
  const { success } = signUpBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      msg: "Invalid user data!",
    });
  }
  try {
    const { name, email, password } = req.body;
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res.status(400).json({
        msg: "User already exists!",
      });
    }
    const user = await User.create({ name, email, password });
    const id = user._id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET);
    return res.json({
      msg: "User created successfully!",
      token,
      id : user._id,
      name : user.name,
      role : user.role,
      email : user.email
    });
  } catch (error) {
    console.log(error.message);
  }
};

const logInUser = async (req, res) => {
  const { success } = logInBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      msg: "Invalid user data!",
    });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!(await user.matchPassword(password))) {
      return res.status(400).json({
        msg: "Wrong password!",
      });
    }
    if (!user) {
      return res.status(400).json({
        msg: "User doesn't exist!",
      });
    }
    const id = user._id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET);
    return res.status(200).json({
      msg: "User logged in successfully!",
      token,
      id : user._id,
      name : user.name,
      role : user.role,
      email : user.email
    });
  } catch (error) {
    console.log(error.message);
  }
};

const updateUser = async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      msg: "Invalid user data!",
    });
  }
  try {
    await User.updateOne({ _id: req.userId }, req.body);
    return res.status(200).json({
      msg: "User updated successfully!",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const searchUsers = async (req, res) => {
  const filter = req.query.filter || "";
  try {
    const usersInDB = await User.find({
      $or: [
        {
          name: {
            $regex: filter,
          },
        },
        {
          email: {
            $regex: filter,
          },
        },
      ],
    });
    let users = [];
    for (let i = 0; i < usersInDB.length; i++) {
      const user = {
        name: usersInDB[i].name,
        email: usersInDB[i].email,
        _id: usersInDB[i]._id,
      };
      users.push(user);
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
  }
};

const setRating = async (req, res) => {
  const { userId, rating } = req.body;

  try {
    // Validate rating
    if (rating > 5 || rating < 0) {
      return res.status(400).json({ error: 'Rating must be between 0 and 5.' });
    }

    // Find the user by userId
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the user is a trucker (role === 1)
    if (user.role !== 1) {
      return res.status(403).json({ error: 'Rating is only applicable for truckers (role 1).' });
    }

    // Push the new rating to the ratings array
    user.rating.push(rating);

    // Save the updated user
    await user.save();

    // Send a success response
    res.status(200).json({ message: 'Rating updated successfully.' });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const Loggedinuserid = (req,res) =>{
  try{
    const userId = req.user.id;
    res.status(200).json({ userId });
  }
  catch(error){
    console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { signUpUser, logInUser, updateUser, searchUsers , setRating , Loggedinuserid };
