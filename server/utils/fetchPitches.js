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
        pitches.push({
            game_date: row.game_date,
            pitch_type: row.pitch_type,
            pitch_name: row.pitch_name,
            release_speed: parseFloat(row.release_speed),
            release_pos_x: parseFloat(row.release_pos_x),
            release_pos_z: parseFloat(row.release_pos_z),
            pfx_x: parseFloat(row.pfx_x),
            pfx_z: parseFloat(row.pfx_z),
            plate_x: parseFloat(row.plate_x),
            plate_z: parseFloat(row.plate_z),
            vx0: parseFloat(row.vx0),
            vy0: parseFloat(row.vy0),
            vz0: parseFloat(row.vz0),
            ax: parseFloat(row.ax),
            ay: parseFloat(row.ay),
            az: parseFloat(row.az),
            sz_top: parseFloat(row.sz_top),
            sz_bot: parseFloat(row.sz_bot),
            effective_speed: isNaN(parseFloat(row.effective_speed)) ? null : parseFloat(row.effective_speed),
            release_spin_rate: isNaN(parseFloat(row.release_spin_rate)) ? null : parseFloat(row.release_spin_rate),
            release_extension: isNaN(parseFloat(row.release_extension)) ? null : parseFloat(row.release_extension),
            release_pos_y: parseFloat(row.release_pos_y) || null,
            spin_axis: isNaN(parseFloat(row.spin_axis)) ? null : parseFloat(row.spin_axis),
            zone: parseInt(row.zone) || null,
        });
      })
      .on("end", async () => {
        try {
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

db.once("open", () => {
  importCSV();
});
