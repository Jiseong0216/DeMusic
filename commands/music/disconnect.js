const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "disconnect",
    aliases: ["stop", "leave", "ㅣㄷㅁㅍㄷ", "ㄴ새ㅔ", "dc", "ㅇㅊ", "얀채ㅜㅜㄷㅊㅅ", "스탑", "tmxkq", "멈춰", "정지", "wjdwl", "나가", "skrk", "ajacnj", "꺼져", "Rjwu", "연결해제"],
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.react('❌');
        const player = client.musicMgr.queue.get(message.guild.id);
        if (!player) return message.react('❌');

        player.destroy();
        message.react('👋')
    }
}