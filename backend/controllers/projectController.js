// // /controllers/projectController.js
// const supabase = require('../services/supabaseClient');

// const createProject = async (req, res) => {
//   const { project_title, about } = req.body;
//   const user_id = req.user.id; // Ensure user is authenticated and their ID is available

//   if (!project_title) {
//     return res.status(400).json({ message: "Project title is required" });
//   }

//   try {
//     const { data, error } = await supabase
//       .from("projects")
//       .insert([{ project_title, about, user_id }])
//       .select();

//     if (error) {
//       console.error("Supabase insert error:", error);
//       return res.status(400).json({ message: "Project creation failed", error });
//     }

//     if (!data || data.length === 0) {
//       console.error("No data returned from Supabase insert.");
//       return res.status(500).json({ message: "Project creation failed. No data returned." });
//     }

//     return res.status(201).json({ message: "Project created successfully", project: data[0] });
//   } catch (err) {
//     console.error("Server error:", err.message || err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = { createProject };


// const supabase = require('../services/supabaseClient');

// // Function to create a project
// const createProject = async (req, res) => {
//   const { project_title, about } = req.body;
//   const user_id = req.user.id; // Ensure user is authenticated and their ID is available

//   if (!project_title) {
//     return res.status(400).json({ message: "Project title is required" });
//   }

//   try {
//     const { data, error } = await supabase
//       .from("projects")
//       .insert([{ project_title, about, user_id }])
//       .select();

//     if (error) {
//       console.error("Supabase insert error:", error);
//       return res.status(400).json({ message: "Project creation failed", error });
//     }

//     if (!data || data.length === 0) {
//       console.error("No data returned from Supabase insert.");
//       return res.status(500).json({ message: "Project creation failed. No data returned." });
//     }

//     return res.status(201).json({ message: "Project created successfully", project: data[0] });
//   } catch (err) {
//     console.error("Server error:", err.message || err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Function to get all projects
// const getProjects = async (req, res) => {
//   try {
//     const { data, error } = await supabase
//       .from("projects")
//       .select("id, project_title, about, created_at")
//       .order("created_at", { ascending: false }); // You can order by the creation date

//     if (error) {
//       console.error("Supabase fetch error:", error);
//       return res.status(400).json({ message: "Failed to fetch projects", error });
//     }

//     return res.status(200).json(data); // Return the projects data as response
//   } catch (err) {
//     console.error("Server error:", err.message || err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = { createProject, getProjects };


const supabase = require('../services/supabaseClient');

// Function to create a project
const createProject = async (req, res) => {
  const { project_title, about } = req.body;
  const user_id = req.user.id; // Ensure user is authenticated and their ID is available

  if (!project_title) {
    return res.status(400).json({ message: "Project title is required" });
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .insert([{ project_title, about, user_id }])
      .select(); // You might not need the `.select()` here, but it's okay for now

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(400).json({ message: "Project creation failed", error });
    }

    if (!data || data.length === 0) {
      console.error("No data returned from Supabase insert.");
      return res.status(500).json({ message: "Project creation failed. No data returned." });
    }

    return res.status(201).json({ message: "Project created successfully", project: data[0] });
  } catch (err) {
    console.error("Server error:", err.message || err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get all projects
const getProjects = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("project_id, project_title, about, created_at") // Correct column names
      .order("created_at", { ascending: false }); // Order projects by created_at

    if (error) {
      console.error("Supabase fetch error:", error);
      return res.status(400).json({ message: "Failed to fetch projects", error });
    }

    return res.status(200).json(data); // Return the projects data as response
  } catch (err) {
    console.error("Server error:", err.message || err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createProject, getProjects };
