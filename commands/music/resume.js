
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "resume",
    aliases: ["다시재생", "ㄱㄷ녀ㅡㄷ", "ektlwotod"],
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.react('❌');
        const player = client.musicMgr.queue.get(message.guild.id);
        if (!player) return message.react('❌');

        if (player.playing) return message.react('❌');

        player.resume();
        message.react('⏸');
    }
}