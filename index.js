require("dotenv").config();

const { ShardingManager } = require("discord.js");
const config = require("./other/shard.json");

const shardMgr = new ShardingManager("./bot.js", {
    token: process.env.BOT_TOKEN,
    totalShards: config.client.shard.count,
    respawn: config.client.shard.respawn
});

shardMgr.spawn(
    config.client.shard.count === "auto" ? shardMgr.totalShards : config.client.shard.count,
    config.client.shard.delay
);

shardMgr.on("shardCreate", shard => console.log(`#${shard.id} shard has been launched.`));