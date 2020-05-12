module.exports = {
    name: "play",
    aliases: ["플레이", "재생", "ㅔㅣ묘", "p", "ㅔ", "wotod", "vmffpdl", "pla", "pl"],
    run: async (client, message, args) => {
        if (!message.guild.me.hasPermission("CONNECT")) return message.react('❌');
        if (!message.guild.me.hasPermission("SPEAK")) return message.react('❌');
        if (!message.member.voice.channel) return message.react('❌');
        if (!args.join(" ")) return message.react('❌');

        let song = await client.musicMgr.getSongs(args.join(" ")) || await client.musicMgr.getSongs(`ytsearch: ${args.join(" ")}`) || await client.musicMgr.getSongs(`scsearch: ${args.join(" ")}`);
        if (!song[0]) return message.react('❌');

        client.musicMgr.handleVideo(message, message.member.voice.channel, song[0]);
    }
}