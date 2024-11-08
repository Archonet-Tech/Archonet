// const { createClient } = require('@supabase/supabase-js');

// // Get environment variables
// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;

// console.log('Supabase URL:', supabaseUrl);  // Log for debugging
// console.log('Supabase Key:', supabaseKey);  // Log for debugging

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error('Supabase URL and key are required');
// }

// const supabase = createClient(supabaseUrl, supabaseKey);

// module.exports = supabase;


// services/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL; // Add to .env
const supabaseKey = process.env.SUPABASE_KEY; // Add to .env
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
