const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "volume",
    aliases: ["vol", "v", "불륨", "사운드", "소리", "setVol", "setVolume", "thfl", "tkdnsem", "qnffba", "음량", "dmafid", "음량설정", "dmafidtjfwjd"],
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.react('❌');
        const player = client.musicMgr.queue.get(message.guild.id);
        if (!player) return message.react('❌');

        if (!args[0]) return message.reply(`🔊  현재 음량은 **${player.volume}%** 입니다!`);

        if (isNaN(args[0]) || args[0].includes(".") || parseInt(args[0]) <= 0 || parseInt(args[0]) > 100) return message.react('❌');

        player.setVolume(parseInt(args[0].replace("%", "")));
        message.reply(new MessageEmbed().setColor("#2F3136").setDescription(`🔊 소리를 ${parseInt(args[0])}% 로 조정했습니다.`));
    } // new MessageEmbed().setColor("#2F3136").setTitle(song.info.title).setURL(song.info.uri).setDescription(`<a:yes:707786803414958100> **\`${song.info.title} - ${song.info.author}\`** 를(을) 재생합니다.`).setThumbnail(`https://img.youtube.com/vi/${song.info.identifier}/maxresdefault.jpg`)
} // ${parseInt(args[0])}% 🔊 블륨을 **** (으)로 설정했어요!