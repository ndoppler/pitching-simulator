const db = require("../config/connection");
const { Player } = require("../models");
const cleanDB = require("./cleanDB");

const playerData = require("./playerData.json");

db.once("open", async () => {
  await cleanDB("Player", "players");

  await Player.create(playerData);

  console.log("all done!");
  process.exit(0);
});
