const mongoose = require('mongoose');

const pitchSchema = new mongoose.Schema({
  game_date: String,
  pitch_type: String,
  pitch_name: String,
  release_speed: Number,
  release_pos_x: Number,
  release_pos_z: Number,
  pfx_x: Number,
  pfx_z: Number,
  plate_x: Number,
  plate_z: Number,
  vx0: Number,
  vy0: Number,
  vz0: Number,
  ax: Number,
  ay: Number,
  az: Number,
  sz_top: Number,
  sz_bot: Number,
  effective_speed: Number,
  release_spin_rate: Number,
  release_extension: Number,
  release_pos_y: Number,
  spin_axis: Number,
  zone: Number
});

module.exports = mongoose.model('Pitch', pitchSchema);