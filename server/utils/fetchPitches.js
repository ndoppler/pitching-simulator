require('dotenv').config();
const fs = require("fs");
const csv = require("csv-parser");
const Pitch = require("../models/Pitch");
const db = require("../config/connection"); // Import the existing connection

const importCSV = async () => {
  try {
    const pitches = [];
    fs.createReadStream(process.env.CSV_FILE_PATH)
      .pipe(csv())
      .on("data", (row) => {      
        // Clean up keys in the row object to remove extra quotes
        const cleanedRow = Object.fromEntries(
          Object.entries(row).map(([key, value]) => [key.replace(/"/g, '').trim(), value])
        );
      
        pitches.push({
          game_date: cleanedRow.game_date,
          pitch_type: cleanedRow.pitch_type,
          pitch_name: cleanedRow.pitch_name,
          release_speed: parseFloat(cleanedRow.release_speed),
          release_pos_x: parseFloat(cleanedRow.release_pos_x),
          release_pos_z: parseFloat(cleanedRow.release_pos_z),
          pfx_x: parseFloat(cleanedRow.pfx_x),
          pfx_z: parseFloat(cleanedRow.pfx_z),
          plate_x: parseFloat(cleanedRow.plate_x),
          plate_z: parseFloat(cleanedRow.plate_z),
          vx0: parseFloat(cleanedRow.vx0),
          vy0: parseFloat(cleanedRow.vy0),
          vz0: parseFloat(cleanedRow.vz0),
          ax: parseFloat(cleanedRow.ax),
          ay: parseFloat(cleanedRow.ay),
          az: parseFloat(cleanedRow.az),
          sz_top: parseFloat(cleanedRow.sz_top),
          sz_bot: parseFloat(cleanedRow.sz_bot),
          effective_speed: isNaN(parseFloat(cleanedRow.effective_speed)) ? null : parseFloat(cleanedRow.effective_speed),
          release_spin_rate: isNaN(parseFloat(cleanedRow.release_spin_rate)) ? null : parseFloat(cleanedRow.release_spin_rate),
          release_extension: isNaN(parseFloat(cleanedRow.release_extension)) ? null : parseFloat(cleanedRow.release_extension),
          release_pos_y: parseFloat(cleanedRow.release_pos_y) || null,
          spin_axis: isNaN(parseFloat(cleanedRow.spin_axis)) ? null : parseFloat(cleanedRow.spin_axis),
          zone: parseInt(cleanedRow.zone) || null,
        });
      })
      .on("end", async () => {
        try {
          console.log("Deleting existing pitches..."); // Log the deletion step
          await Pitch.deleteMany({}); // Clear existing documents
          await Pitch.insertMany(pitches);
          console.log("Data successfully imported!");
        } catch (error) {
          console.error("Error inserting data: ", error);
        } finally {
          db.close(); // Ensure connection is closed afterward
        }
      });
  } catch (error) {
    console.error("Error importing data: ", error);
  }
};
// Start the import process after the database is connected
db.once("open", () => {
  console.log("Database connected successfully.");
  importCSV();
});
