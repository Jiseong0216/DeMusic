const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "pause",
    aliases: ["일시정지", "ㅔ면ㄷ", "dlftlwjdwl"],
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.react('❌');
        const player = client.musicMgr.queue.get(message.guild.id);
        if (!player) return message.react('❌');

        if (!player.playing) return message.react('❌');

        player.pause();
        message.react('▶️');
    }
}