const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "skip",
    aliases: ["스킵", "tmzlq"],
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.react('❌');
        const player = client.musicMgr.queue.get(message.guild.id);
        if (!player) return message.react('❌');

        if (!player.playing) player.playing = true;

        player.skip();
        message.react('⏩');
    }
}