// // /controllers/mapController.js
// const supabase = require('../services/supabaseClient');

// // Function to save map data
// const saveMapData = async (req, res) => {
//   const { mapData } = req.body;
//   const user_id = req.user.id; // Ensure user is authenticated and their ID is available

//   if (!mapData) {
//     return res.status(400).json({ message: "Map data is required" });
//   }

//   try {
//     const { data, error } = await supabase
//       .from("map_data")
//       .insert([{ mapData, user_id }]);

//     if (error) {
//       console.error("Supabase insert error:", error);
//       return res.status(400).json({ message: "Saving map data failed", error });
//     }

//     return res.status(201).json({ message: "Map data saved successfully", mapData: data[0] });
//   } catch (err) {
//     console.error("Server error:", err.message || err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Function to get map data
// const getMapData = async (req, res) => {
//   try {
//     const { data, error } = await supabase
//       .from("map_data")
//       .select("id, mapData, created_at") // Correct column names
//       .order("created_at", { ascending: false }); // Order data by created_at

//     if (error) {
//       console.error("Supabase fetch error:", error);
//       return res.status(400).json({ message: "Failed to fetch map data", error });
//     }

//     return res.status(200).json(data); // Return the map data as response
//   } catch (err) {
//     console.error("Server error:", err.message || err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = { saveMapData, getMapData };
const supabase = require('../services/supabaseClient');

// Save polygon data with side lengths and trees
const savePolygon = async (req, res) => {
  const { coordinates, area, sideLengths, trees } = req.body;
  const user_id = req.user?.id; // Optional user association

  if (!coordinates || !area || !sideLengths) {
    return res.status(400).json({ 
      error: "Missing required fields: coordinates, area, or sideLengths" 
    });
  }

  try {
    // Start a Supabase transaction
    const { data: polygon, error: polygonError } = await supabase
      .from('polygons')
      .insert([{
        coordinates,
        area,
        user_id
      }])
      .select()
      .single();

    if (polygonError) throw polygonError;

    // Insert side lengths
    const sideLengthPromises = sideLengths.map(({ length, midpoint }) =>
      supabase
        .from('side_lengths')
        .insert([{
          polygon_id: polygon.id,
          length,
          midpoint
        }])
    );

    // Insert trees if provided
    const treePromises = trees?.map(({ lng, lat }) =>
      supabase
        .from('trees')
        .insert([{
          polygon_id: polygon.id,
          lng,
          lat
        }])
    ) || [];

    // Wait for all insertions to complete
    await Promise.all([...sideLengthPromises, ...treePromises]);

    return res.status(201).json({
      message: "Polygon data saved successfully",
      polygon
    });

  } catch (error) {
    console.error("Error saving polygon data:", error);
    return res.status(500).json({ 
      error: "Failed to save polygon data",
      details: error.message 
    });
  }
};

// Save search location
const saveSearchLocation = async (req, res) => {
  const { query, place_name, lng, lat } = req.body;
  const user_id = req.user?.id;

  if (!query || !lng || !lat) {
    return res.status(400).json({ 
      error: "Missing required fields: query, lng, or lat" 
    });
  }

  try {
    const { data, error } = await supabase
      .from('search_locations')
      .insert([{
        query,
        place_name,
        lng,
        lat,
        user_id
      }])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      message: "Search location saved successfully",
      location: data
    });

  } catch (error) {
    console.error("Error saving search location:", error);
    return res.status(500).json({ 
      error: "Failed to save search location",
      details: error.message 
    });
  }
};

// Get polygon data with associated side lengths and trees
const getPolygonData = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user?.id;

  try {
    // Get polygon data
    const { data: polygon, error: polygonError } = await supabase
      .from('polygons')
      .select(`
        *,
        side_lengths (*),
        trees (*)
      `)
      .eq('id', id)
      .single();

    if (polygonError) throw polygonError;

    if (!polygon) {
      return res.status(404).json({ 
        error: "Polygon not found" 
      });
    }

    return res.status(200).json(polygon);

  } catch (error) {
    console.error("Error fetching polygon data:", error);
    return res.status(500).json({ 
      error: "Failed to fetch polygon data",
      details: error.message 
    });
  }
};

// Get all search locations
const getSearchLocations = async (req, res) => {
  const user_id = req.user?.id;

  try {
    const { data, error } = await supabase
      .from('search_locations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return res.status(200).json(data);

  } catch (error) {
    console.error("Error fetching search locations:", error);
    return res.status(500).json({ 
      error: "Failed to fetch search locations",
      details: error.message 
    });
  }
};

// Add a tree to existing polygon
const addTree = async (req, res) => {
  const { polygonId, lng, lat } = req.body;
  const user_id = req.user?.id;

  if (!polygonId || !lng || !lat) {
    return res.status(400).json({ 
      error: "Missing required fields: polygonId, lng, or lat" 
    });
  }

  try {
    // Verify polygon exists
    const { data: polygon, error: polygonError } = await supabase
      .from('polygons')
      .select()
      .eq('id', polygonId)
      .single();

    if (polygonError || !polygon) {
      return res.status(404).json({ 
        error: "Polygon not found" 
      });
    }

    // Add tree
    const { data: tree, error: treeError } = await supabase
      .from('trees')
      .insert([{
        polygon_id: polygonId,
        lng,
        lat
      }])
      .select()
      .single();

    if (treeError) throw treeError;

    return res.status(201).json({
      message: "Tree added successfully",
      tree
    });

  } catch (error) {
    console.error("Error adding tree:", error);
    return res.status(500).json({ 
      error: "Failed to add tree",
      details: error.message 
    });
  }
};

module.exports = {
  savePolygon,
  saveSearchLocation,
  getPolygonData,
  getSearchLocations,
  addTree
};