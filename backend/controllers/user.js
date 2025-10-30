import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import zod from "zod";
import { Account } from "../models/account.js";

const signupZod = zod.object({
  firstName: zod.string().nonempty(),
  lastName: zod.string().optional(),
  password: zod.string().nonempty(),
  email: zod.string().email(),
});

const signinZod = zod.object({
  email: zod.string().email(),
  password: zod.string()
})

const updateDetailsZod = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
})

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;
    const obj = signupZod.safeParse(req.body);
    if (!obj.success) {
      return res.status(400).json({
        message: "Some inputs are incorrect!",
      });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already registered!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      firstName,
      lastName: lastName || "",
      email,
      password: hashedPassword,
    });
    await Account.create({
      user : user._id,
      balance: Math.random() * 10000,
    })
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return res.status(201).json({
      message: "User created successfully!",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const obj = signinZod.safeParse(req.body);
    if(!obj.success) {
      return res.status(400).json({
        message: "Some inputes are incorrect!",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not registered!",
      });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({
        message: "Password didn't matched!",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({
      message: "User logged in successfully!",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};

export const updateDetails = async (req, res) => {
  try {
    const { firstName, lastName, password } = req.body;
    const obj = updateDetailsZod.safeParse(req.body);
    if(!obj.success) {
      return res.status(400).json({
        message: "Some inputs are incorrect!",
      });
    }
    if (!firstName && !lastName && !password) {
      return res.status(400).json({
        message: "Atleast one field must be updated!",
      });
    }
    const userId = req.userId;
    const user = await User.findById(userId);
    user.firstName = firstName?.trim() ?? user.firstName;
    user.lastName = lastName?.trim() ?? user.lastName;
    if (password?.trim()) {
      user.password = await bcrypt(password, 10);
    }
    await user.save();
    return res.status(200).json({
      message: "User details updated successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};

export const userFilter = async (req, res) => {
  try {
    const search = req.query.search || "";
    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: search,
          },
        },
        {
          lastName: {
            $regex: search,
          },
        },
      ],
    });
    if (users.length === 0) {
      return res.status(404).json({
        message: `No user found having ${search}!`,
      });
    }
    return res.status(200).json({
      users: users.map((user) => {
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user._id,
        };
      }),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};
