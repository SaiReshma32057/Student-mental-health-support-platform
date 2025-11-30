const express = require("express");
const auth = require("../middleware/auth");
const Journal = require("../models/Journal");

const router = express.Router();

// ADD new journal entry
router.post("/add", auth, async (req, res) => {
  try {
    console.log("📝 Received journal entry data:", req.body);
    console.log("👤 User ID from token:", req.user); // This is the userId string

    const { title, content, date, tags } = req.body;

    // Validation
    if (!title || !content || !date) {
      return res.status(400).json({ 
        message: "Title, content, and date are required" 
      });
    }

    const newEntry = await Journal.create({
      userId: req.user,  // ⭐ FIXED: Use req.user directly (it's the userId string)
      title,
      content,
      date,
      tags: tags || []
    });

    console.log("✅ Entry saved to database:", newEntry._id);

    res.status(201).json({ 
      message: "Entry saved successfully", 
      entry: newEntry 
    });

  } catch (err) {
    console.error("❌ Error saving entry:", err);
    res.status(500).json({ 
      message: "Error saving entry",
      error: err.message 
    });
  }
});

// GET all entries for the logged-in user
router.get("/all", auth, async (req, res) => {
  try {
    console.log("📖 Fetching entries for user:", req.user);

    const entries = await Journal.find({ 
      userId: req.user  // ⭐ FIXED: Use req.user directly
    }).sort({ createdAt: -1 });

    console.log(`✅ Found ${entries.length} entries`);
    
    res.json(entries);
  } catch (err) {
    console.error("❌ Error loading entries:", err);
    res.status(500).json({ 
      message: "Error loading entries",
      error: err.message 
    });
  }
});

// DELETE entry by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Journal.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user  // ⭐ FIXED: Use req.user directly
    });

    if (!deleted) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting entry:", err);
    res.status(500).json({ 
      message: "Error deleting entry",
      error: err.message 
    });
  }
});

// UPDATE entry by ID
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Journal.findOneAndUpdate(
      { 
        _id: req.params.id, 
        userId: req.user  // ⭐ FIXED: Use req.user directly
      },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json({ 
      message: "Entry updated successfully", 
      entry: updated 
    });
  } catch (err) {
    console.error("❌ Error updating entry:", err);
    res.status(500).json({ 
      message: "Error updating entry",
      error: err.message 
    });
  }
});

module.exports = router;