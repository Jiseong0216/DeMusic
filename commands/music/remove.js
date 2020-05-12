const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "remove",
    aliases: ["r", "ㄱ", "리무브", "삭제", "노래삭제", "음악삭제", "제거", "노래제거", "음악제거"],
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.react('❌');
        const player = client.musicMgr.queue.get(message.guild.id);
        if (!player) return message.react('❌');

        if (!player.playing) player.playing = true;

        if (args[0] > player.songs.length || args[0] < 0 || isNaN(args[0]) || args[0].includes(".")) return message.react('❌');

        player.songs.splice(args[0] - 1, 1);

        message.reply(new MessageEmbed().setColor("#2F3136").setDescription(`<a:yes:707786803414958100> ${args[0]}번에 해당하는 노래를 삭제했어요!`));
    }
}