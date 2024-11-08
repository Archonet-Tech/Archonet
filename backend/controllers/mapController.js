// /controllers/mapController.js
const supabase = require('../services/supabaseClient');

// Function to save map data
const saveMapData = async (req, res) => {
  const { mapData } = req.body;
  const user_id = req.user.id; // Ensure user is authenticated and their ID is available

  if (!mapData) {
    return res.status(400).json({ message: "Map data is required" });
  }

  try {
    const { data, error } = await supabase
      .from("map_data")
      .insert([{ mapData, user_id }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(400).json({ message: "Saving map data failed", error });
    }

    return res.status(201).json({ message: "Map data saved successfully", mapData: data[0] });
  } catch (err) {
    console.error("Server error:", err.message || err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get map data
const getMapData = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("map_data")
      .select("id, mapData, created_at") // Correct column names
      .order("created_at", { ascending: false }); // Order data by created_at

    if (error) {
      console.error("Supabase fetch error:", error);
      return res.status(400).json({ message: "Failed to fetch map data", error });
    }

    return res.status(200).json(data); // Return the map data as response
  } catch (err) {
    console.error("Server error:", err.message || err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { saveMapData, getMapData };
