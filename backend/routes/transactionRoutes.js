const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { description, amount, type } = req.body;

    const transaction = await Transaction.create({
      description,
      amount,
      type,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create transaction",
      error: error.message,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({
      createdAt: -1,
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(
      req.params.id
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete transaction",
      error: error.message,
    });
  }
});

//edit/update
router.put("/:id", async (req, res) => {
  try {
    const { description, amount, type } = req.body;

    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        description,
        amount,
        type,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update transaction",
      error: error.message,
    });
  }
});
module.exports = router;