// backend/routes/userRoutes.js
const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const router = express.Router();
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    res.json({ session: data.session, message: "Login successful!" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
