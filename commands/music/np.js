const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "np",
    aliases: ["현재곡", "ㅞ", "nowplaying", "now-playing", "nowplay", "ㅜㅐ제ㅣ묘ㅑㅜㅎ", "현재음악", "현재노래", "guswodmadkr", "guswoshfo", "지금곡", "wlrmarhr", "지금음악", "지금노래", "wlrmadmadkr", "wlrmashfo", "현재노래", "guswoshfo"],
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.react('❌');
        const player = client.musicMgr.queue.get(message.guild.id);
        if (!player) return message.react('❌');

        const song = player.songs[0];

        message.channel.send(new MessageEmbed()
        .setThumbnail(`https://img.youtube.com/vi/${song.info.identifier}/maxresdefault.jpg`)
        .setTitle(song.info.title + ` | ${player.playing ? "▶ 재생 중" : "⏸ 일시정지"}`)
        .setURL(song.info.uri)
        .setDescription(`\`${player.duration(player.player.state.position)}\` ${player.songProgress(message)} \`${player.duration(song.info.length)}\``)
        .setColor("#2F3136"))
    }
}