const express = require("express");
const auth = require("../middleware/auth");
const Record = require("../models/Record");

const router = express.Router();

// ADD activity
router.post("/add", auth, async (req, res) => {
  try {
    const newRecord = new Record({
      userId: req.user,
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      date: req.body.date,
      tags: req.body.tags,
    });

    await newRecord.save();
    res.json({ message: "Record saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving record" });
  }
});

// GET all records for logged user
router.get("/all", auth, async (req, res) => {
  try {
    const records = await Record.find({ userId: req.user }).sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Error fetching records" });
  }
});

module.exports = router;
