const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "skipto",
    aliases: ["스킵투", "나ㅑㅔ새", "tmzlqxn"],
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.react('❌');
        const player = client.musicMgr.queue.get(message.guild.id);
        if (!player) return message.react('❌');

        if (!player.playing) player.playing = true;

        if (!args[0]) return message.react('<a:no:707786855143309370>');
        if (args[0] > player.songs.length || args[0] < 0 || isNaN(args[0]) || args[0].includes(".")) return message.react('❌')

        player.songs.splice(0, parseInt(args[0] - 1));
        player.skip();

        message.react('⏩');
    }
}