const express = require("express");
const Expense = require("../models/expense");
const Joi = require("joi");

const router = express.Router();
const USER_ID = "sibi23";

const schema = Joi.object({
  description: Joi.string().required(),
  amount: Joi.number().positive().required(),
  category: Joi.string().required(),
});

//Create Expense
router.post("/", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const expense = new Expense({
    ...req.body,
    userId: USER_ID,
  });

  await expense.save();
  res.status(201).json(expense);
});

//Get All Expenses
router.get("/", async (req, res) => {
  const expenses = await Expense.find({ userId: USER_ID }).sort({ date: -1 });
  res.json(expenses);
});

//Delete Expense
router.delete("/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Expense deleted" });
});

//Update Expense
router.put("/:id", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const expense = await Expense.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );

  if (!expense) return res.status(404).json("Expense not found");
  res.json(expense);
});


//Summary
router.get("/summary", async (req, res) => {
  const expenses = await Expense.find({ userId: USER_ID });

  let total = 0;
  let byCategory = {};

  expenses.forEach((e) => {
    total += e.amount;
    byCategory[e.category] =
      (byCategory[e.category] || 0) + e.amount;
  });

  res.json({ total, byCategory });
});

module.exports = router;
