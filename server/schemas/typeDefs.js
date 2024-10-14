// schemas/typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Pitch {
    id: ID!
    game_date: String
    pitch_type: String
    pitch_name: String
    release_speed: Float
    release_pos_x: Float
    release_pos_z: Float
    pfx_x: Float
    pfx_z: Float
    plate_x: Float
    plate_z: Float
    vx0: Float
    vy0: Float
    vz0: Float
    ax: Float
    ay: Float
    az: Float
    sz_top: Float
    sz_bot: Float
    effective_speed: Float
    release_spin_rate: Float
    release_extension: Float
    release_pos_y: Float
    spin_axis: Float
    zone: Int
  }

  type Query {
    pitches: [Pitch]
    pitch(id: ID!): Pitch
    pitchesByDate(game_date: String!): [Pitch]
    pitchesByType(pitch_type: String!): [Pitch]
  }
`;

module.exports = typeDefs;
