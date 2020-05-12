const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "loopqueue",
    aliases: ["lq", "l", "루프", "반복", "대기열반복", "재생목록반복", "목록반복", "q", "ㅂ", "ㅣㅂ"],
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.react('❌');
        const player = client.musicMgr.queue.get(message.guild.id);
        if (!player) return message.react('❌');

        player.loop = !player.loop;
        message.reply(new MessageEmbed().setColor("#2F3136").setDescription(`${player.loop ? "🔄  재생목록을 반복합니다" : "⏹  재생목록 반복을 중지합니다"}`));
    }
}