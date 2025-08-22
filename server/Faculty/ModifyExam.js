const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ DELETE scheduled exam by ID
router.delete("/student/schedule/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute(
      "DELETE FROM schedule_exam WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.json({ message: "✅ Exam deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting exam:", err);
    res.status(500).json({ error: "Failed to delete exam" });
  }
});

module.exports = router;
