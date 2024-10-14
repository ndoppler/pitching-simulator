const Pitch = require('../models/Pitch');

const resolvers = {
  Query: {
    pitches: async () => {
      try {
        return await Pitch.find();
      } catch (error) {
        console.error("Error fetching pitches:", error);
        throw new Error("Failed to fetch pitches.");
      }
    },
    pitch: async (_, { id }) => {
      try {
        return await Pitch.findById(id);
      } catch (error) {
        console.error(`Error fetching pitch with id ${id}:`, error);
        throw new Error("Failed to fetch pitch.");
      }
    },
    pitchesByDate: async (_, { game_date }) => {
      try {
        return await Pitch.find({ game_date });
      } catch (error) {
        console.error(`Error fetching pitches on date ${game_date}:`, error);
        throw new Error("Failed to fetch pitches by date.");
      }
    },
    pitchesByType: async (_, { pitch_type }) => {
      try {
        return await Pitch.find({ pitch_type });
      } catch (error) {
        console.error(`Error fetching pitches of type ${pitch_type}:`, error);
        throw new Error("Failed to fetch pitches by type.");
      }
    },
  },
};

module.exports = resolvers;