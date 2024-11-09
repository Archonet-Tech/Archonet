// const express = require('express');
// const router = express.Router();
// const supabase = require('../config/dbConfig'); // Supabase connection

// // POST route to save polygon, side lengths, and tree data
// router.post('/polygon', async (req, res) => {
//   try {
//     const { coordinates, area, sideLengths, trees } = req.body;

//     // Step 1: Insert polygon data and retrieve its ID
//     const { data: polygon, error: polygonError } = await supabase
//       .from('polygons')
//       .insert([{ coordinates, area }])
//       .select() // Retrieve polygon with ID after insertion
//       .single();

//     if (polygonError) {
//       console.error("Polygon save error:", polygonError);
//       return res.status(500).json({ error: "Failed to save polygon" });
//     }

//     // Step 2: Insert side lengths associated with the polygon ID
//     const sideLengthInserts = sideLengths.map((side) => ({
//       polygon_id: polygon.id,
//       length: side.length,
//       midpoint: side.midpoint,
//     }));

//     const { error: sideLengthError } = await supabase
//       .from('side_lengths')
//       .insert(sideLengthInserts);

//     if (sideLengthError) {
//       console.error("Side length save error:", sideLengthError);
//       return res.status(500).json({ error: "Failed to save side lengths" });
//     }

//     // Step 3: Insert tree data (if any) with the polygon ID
//     if (trees.length > 0) {
//       const treeInserts = trees.map((tree) => ({
//         polygon_id: polygon.id,
//         lng: tree.lng,
//         lat: tree.lat,
//       }));

//       const { error: treeError } = await supabase
//         .from('trees')
//         .insert(treeInserts);

//       if (treeError) {
//         console.error("Tree save error:", treeError);
//         return res.status(500).json({ error: "Failed to save trees" });
//       }
//     }

//     res.status(201).json({ message: 'Polygon saved successfully', polygonId: polygon.id });
//   } catch (error) {
//     console.error("Unexpected server error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;
