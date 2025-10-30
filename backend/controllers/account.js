import mongoose from "mongoose";
import { Account } from "../models/account.js";

export const getBalance = async (req, res) =>{
  try {
    const userId = req.userId;
    const account = await Account.findOne({user: userId});
    if(!account) {
      return res.status(404).json({
        message: `No account found with ${userId}`
      });
    }
    return res.status(200).json({
      balance: account.balance
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
}

export const transfer = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    
    session.startTransaction();
    const {to, amount} = req.body;
    const userId = req.userId;

    if(amount < 0) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid amount!",
      });
    }

    if(to === userId) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Can't send money to your account itself!"
      })
    }
    
    const account = await Account.findOne({
      user: userId,
    }).session(session);

    if(!account) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "No account found!",
      });
    }
    if(account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance!",
      });
    }

    const toAccount = await Account.findOne({
      user: to
    }).session(session);

    if(!toAccount) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Invalid transfer account!",
      });
    }

    await Account.updateOne({user: userId}, {
      $inc: {
        balance: -amount,
      },
    }).session(session);

    await Account.updateOne({user: to}, {
      $inc: {
        balance: amount,
      },
    }).session(session);

    await session.commitTransaction();
    return res.status(200).json({
      message: `Amount ${amount} transfered successfully!`
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
}