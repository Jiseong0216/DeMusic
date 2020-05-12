const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    aliases: ["q", "벼뎓", "대기열", "wotodahrfhr", "eorlduf", "que", "queu"],
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.react('❌');
        const player = client.musicMgr.queue.get(message.guild.id);
        if (!player) return message.react('❌');

        let i = 0;

        message.reply(new MessageEmbed()
        .setAuthor(`${message.guild.name}의 재생목록`)
        .addField(`현재 재생 중`, `[${player.songs[0].info.title}](${player.songs[0].info.uri})`)
        .setThumbnail(`https://img.youtube.com/vi/${player.songs[0].info.identifier}/maxresdefault.jpg`)
        .setColor("#2F3136")
        .addField(`예약된 노래`, `\`\`\`md\n${player.songs[1] ? `${player.songs.map((songs) => `${i++}. ${songs.info.title} - ${player.duration(songs.info.length)}`).splice(1, 10).join("\n\n")}${player.songs.length > 11 ? `${player.songs.length - 11} More..` : ""}` : "# 대기열 없음"}\n\`\`\``));
    }
}