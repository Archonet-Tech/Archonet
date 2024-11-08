// const express = require('express');
// const router = express.Router();
// const supabase = require('../services/supabaseClient');

// // Save Polygon Route
// router.post('/polygon', async (req, res) => {
//   const { coordinates, area, sideLengths, trees } = req.body;

//   // Basic validation
//   if (!coordinates || !area || !sideLengths || !trees) {
//     return res.status(400).json({ error: 'Missing required fields: coordinates, area, sideLengths or trees' });
//   }

//   try {
//     // Insert the polygon into the 'polygons' table
//     const { data: polygon, error: polygonError } = await supabase
//       .from('polygons')
//       .insert([{ coordinates, area }])
//       .single();

//     if (polygonError) {
//       console.error('Error inserting polygon:', polygonError); // Log the detailed error
//       return res.status(500).json({ error: polygonError.message });
//     }

//     // Insert side lengths data into the 'side_lengths' table
//     const sideLengthData = sideLengths.map(length => ({
//       polygon_id: polygon.id,
//       length: length.length,
//       midpoint: length.midpoint
//     }));

//     const { error: sideLengthsError } = await supabase
//       .from('side_lengths')
//       .insert(sideLengthData);

//     if (sideLengthsError) {
//       console.error('Error inserting side lengths:', sideLengthsError); // Log the detailed error
//       return res.status(500).json({ error: sideLengthsError.message });
//     }

//     // Insert trees data into the 'trees' table
//     const treeData = trees.map(tree => ({
//       polygon_id: polygon.id,
//       lng: tree.lng,
//       lat: tree.lat
//     }));

//     const { error: treeError } = await supabase
//       .from('trees')
//       .insert(treeData);

//     if (treeError) {
//       console.error('Error inserting trees:', treeError); // Log the detailed error
//       return res.status(500).json({ error: treeError.message });
//     }

//     // Success response
//     res.json({
//       message: 'Polygon, side lengths, and trees saved successfully!',
//       polygon: polygon,
//       sideLengths: sideLengthData,
//       trees: treeData
//     });
//   } catch (error) {
//     console.error('Error saving polygon, side lengths, or trees:', error); // Log the complete error message
//     res.status(500).json({ error: 'An error occurred while saving the polygon, side lengths, or trees.' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const supabase = require('../services/supabaseClient');

// Save Polygon Route
router.post('/polygon', async (req, res) => {
  const { coordinates, area, sideLengths, trees = [] } = req.body;

  // Basic validation
  if (!coordinates || !area || !sideLengths) {
    return res.status(400).json({ error: 'Missing required fields: coordinates, area, or sideLengths' });
  }

  console.log('Received polygon data:', { coordinates, area, sideLengths, trees });

  try {
    // Insert the polygon into the 'polygons' table
    const { data: polygon, error: polygonError } = await supabase
      .from('polygons')
      .insert([{ coordinates, area }])
      .single();

    if (polygonError) {
      console.error('Error inserting polygon:', polygonError); // Log the detailed error
      return res.status(500).json({ error: polygonError.message });
    }

    console.log('Polygon saved successfully:', polygon);

    // Insert side lengths data into the 'side_lengths' table
    const sideLengthData = sideLengths.map(length => ({
      polygon_id: polygon.id,
      length: length.length,
      midpoint: length.midpoint
    }));

    const { error: sideLengthsError } = await supabase
      .from('side_lengths')
      .insert(sideLengthData);

    if (sideLengthsError) {
      console.error('Error inserting side lengths:', sideLengthsError); // Log the detailed error
      return res.status(500).json({ error: sideLengthsError.message });
    }

    console.log('Side lengths saved successfully:', sideLengthData);

    // Insert trees data into the 'trees' table
    const treeData = trees.map(tree => ({
      polygon_id: polygon.id,
      lng: tree.lng,
      lat: tree.lat
    }));

    const { error: treeError } = await supabase
      .from('trees')
      .insert(treeData);

    if (treeError) {
      console.error('Error inserting trees:', treeError); // Log the detailed error
      return res.status(500).json({ error: treeError.message });
    }

    console.log('Trees saved successfully:', treeData);

    return res.status(200).json({ message: 'Polygon, side lengths, and trees saved successfully!', polygon });
  } catch (error) {
    console.error('Error saving data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
