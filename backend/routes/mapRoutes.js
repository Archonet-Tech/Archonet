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
// const express = require('express');
// const router = express.Router();
// const supabase = require('../services/supabaseClient');

// // Save Polygon Route
// router.post('/polygon', async (req, res) => {
//   const { coordinates, area, sideLengths, trees = [] } = req.body;

//   // Basic validation
//   if (!coordinates || !area || !sideLengths) {
//     return res.status(400).json({ error: 'Missing required fields: coordinates, area, or sideLengths' });
//   }

//   console.log('Received polygon data:', { coordinates, area, sideLengths, trees });

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

//     console.log('Polygon saved successfully:', polygon);

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

//     console.log('Side lengths saved successfully:', sideLengthData);

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

//     console.log('Trees saved successfully:', treeData);

//     return res.status(200).json({ message: 'Polygon, side lengths, and trees saved successfully!', polygon });
//   } catch (error) {
//     console.error('Error saving data:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const supabase = require('../services/supabaseClient');

// Save polygon route
router.post('/polygon', async (req, res) => {
  const { coordinates, area, sideLengths, trees = [] } = req.body;

  // Check for required fields
  if (!coordinates || !area || !sideLengths) {
    return res.status(400).json({ error: 'Missing required fields: coordinates, area, or sideLengths' });
  }

  try {
    // Insert the polygon data
    const { data: polygon, error: polygonError } = await supabase
      .from('polygons')
      .insert([{ coordinates, area }])
      .select()
      .single();

    if (polygonError || !polygon) {
      console.error('Polygon insertion error:', polygonError || 'No polygon returned');
      return res.status(500).json({ error: 'Failed to save polygon' });
    }
    console.log('Polygon inserted:', polygon);

    // Insert side lengths
    const sideLengthData = sideLengths.map(length => ({
      polygon_id: polygon.id,
      length: length.length,
      midpoint: length.midpoint
    }));

    const { error: sideLengthsError } = await supabase
      .from('side_lengths')
      .insert(sideLengthData);

    if (sideLengthsError) {
      console.error('Side lengths insertion error:', sideLengthsError);
      return res.status(500).json({ error: 'Failed to save side lengths' });
    }

    // Insert trees if provided
    if (trees.length > 0) {
      const treeData = trees.map(tree => ({
        polygon_id: polygon.id,
        lng: tree.lng,
        lat: tree.lat
      }));

      const { error: treeError } = await supabase
        .from('trees')
        .insert(treeData);

      if (treeError) {
        console.error('Tree insertion error:', treeError);
        return res.status(500).json({ error: 'Failed to save trees' });
      }
    }

    res.status(200).json({
      message: 'Polygon data saved successfully',
      polygon
    });
  } catch (error) {
    console.error('Error saving polygon data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save search location route
router.post('/search-location', async (req, res) => {
  const { query, place_name, lng, lat } = req.body;

  // Validate required fields
  if (!query || !lng || !lat) {
    return res.status(400).json({ error: 'Missing required fields: query, lng, or lat' });
  }

  try {
    const { data, error } = await supabase
      .from('search_locations')
      .insert([{
        query,
        place_name,
        coordinates: { lng, lat }
      }])
      .select()
      .single();

    if (error || !data) {
      console.error('Search location insertion error:', error || 'No data returned');
      return res.status(500).json({ error: 'Failed to save search location' });
    }

    res.status(200).json({
      message: 'Location search saved successfully',
      location: data
    });
  } catch (error) {
    console.error('Error saving search location:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add tree route
router.post('/tree', async (req, res) => {
  const { polygonId, lng, lat } = req.body;

  // Validate required fields
  if (!polygonId || !lng || !lat) {
    return res.status(400).json({ error: 'Missing required fields: polygonId, lng, or lat' });
  }

  try {
    const { data, error } = await supabase
      .from('trees')
      .insert([{
        polygon_id: polygonId,
        lng,
        lat
      }])
      .select()
      .single();

    if (error || !data) {
      console.error('Tree insertion error:', error || 'No data returned');
      return res.status(500).json({ error: 'Failed to add tree' });
    }

    res.status(200).json({
      message: 'Tree added successfully',
      tree: data
    });
  } catch (error) {
    console.error('Error adding tree:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
