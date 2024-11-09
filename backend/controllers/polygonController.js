// // backend/controllers/polygonController.js
// const { supabase } = require('../config/supabaseClient');

// const savePolygon = async (req, res) => {
//   try {
//     const { coordinates, area, sideLengths, trees } = req.body;

//     // Insert polygon data
//     const { data: polygon, error: polygonError } = await supabase
//       .from('polygons')
//       .insert([
//         { coordinates, area }
//       ])
//       .single();

//     if (polygonError) {
//       console.error('Polygon Insert Error:', polygonError);
//       return res.status(500).json({ error: 'Failed to save polygon' });
//     }

//     // Insert side lengths data
//     const sideLengthData = sideLengths.map(length => ({
//       polygon_id: polygon.id,
//       length: length.length,
//       midpoint: length.midpoint
//     }));

//     const { error: sideLengthError } = await supabase
//       .from('side_lengths')
//       .insert(sideLengthData);

//     if (sideLengthError) {
//       console.error('Side Lengths Insert Error:', sideLengthError);
//       return res.status(500).json({ error: 'Failed to save side lengths' });
//     }

//     // Insert tree data if available
//     if (trees && trees.length > 0) {
//       const { error: treeError } = await supabase
//         .from('trees')
//         .insert(trees.map(tree => ({
//           ...tree,
//           polygon_id: polygon.id // Associate tree with the polygon
//         })));

//       if (treeError) {
//         console.error('Tree Insert Error:', treeError);
//         return res.status(500).json({ error: 'Failed to save trees' });
//       }
//     }

//     // Respond with success
//     res.status(200).json({ message: 'Polygon saved successfully' });

//   } catch (error) {
//     console.error('Unexpected Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = { savePolygon };
