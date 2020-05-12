const { Collection, MessageEmbed } = require("discord.js");
const { Manager } = require("@lavacord/discord.js");
const { Rest } = require("lavacord");
const Queue = require("./Queue");

/**
 * @class MusicMgr
 */
module.exports = class MusicMgr {
    /**
     * @param {import("./MusicClient")} client
     */
    constructor(client) {
        this.client = client;
        this.manager = new Manager(client, [{ id: process.env.LAVA_ID, host: process.env.LAVA_HOST, port: process.env.LAVA_PORT, password: process.env.LAVA_PASSWORD }], {
            user: client.user.id,
            shards: client.shard ? client.shard.count : 0
        });
        this.manager.connect().then(() => console.log("[LAVALINK] Lavalink has Connected."));

        this.queue = new Collection();
    }

    async handleVideo(message, voiceChannel, song) {
        const serverQueue = this.queue.get(message.guild.id);
        song.requestedBy = message.author;

        if (!serverQueue) {
            const queue = new Queue(this.client, {
                textChannel: message.channel,
                voiceChannel
            });
            queue.songs.push(song);
            this.queue.set(message.guild.id, queue);

            try {
                const player = await this.manager.join({
                    channel: voiceChannel.id,
                    guild: message.guild.id,
                    node: "default"
                });

                queue.setPlayer(player);
                this.play(message.guild, song);
            } catch (err) {
                console.error;

                this.queue.delete(message.guild.id);
                this.manager.leave(message.guild.id);
                message.reply(`<a:no:707786855143309370> 음성채널에 접속할 수 없어요!\n\`\`\`js\n${err}\n\`\`\``)
            }
        } else {
            serverQueue.songs.push(song);
            message.channel.send(new MessageEmbed().setColor("#2F3136").setTitle(song.info.title).setURL(song.info.uri).setDescription(`<a:yes:707786803414958100> **\`${song.info.title}\`** 를(을) 재생목록에 추가했습니다.`).setThumbnail(`https://img.youtube.com/vi/${song.info.identifier}/maxresdefault.jpg`))
        } // new MessageEmbed().setColor("#2F3136").setTitle(song.info.title).setURL(song.info.uri).setDescription(`<a:yes:707786803414958100> **\`${song.info.title} - ${song.info.author}\`** 를(을) 재생합니다.`).setThumbnail(`https://img.youtube.com/vi/${song.info.identifier}/maxresdefault.jpg`)
    } // ${song.info.title}

    play(guild, song) {
        const serverQueue = this.queue.get(guild.id);

        if (!song) {
            this.manager.leave(guild.id);
            this.queue.delete(guild.id);
        } else {
            serverQueue.player.play(song.track);
            serverQueue.player
                .once("error", console.error)
                .once("end", data => {
                    if (data.reason === "REPLACED") return;

                    const shiffed = serverQueue.songs.shift();
                    if (serverQueue.loop) {
                        serverQueue.songs.push(shiffed);
                    }

                    this.play(guild, serverQueue.songs[0]);
                });
            serverQueue.player.volume(serverQueue.volume);
            serverQueue.textChannel.send(new MessageEmbed().setColor("#2F3136").setTitle(song.info.title).setURL(song.info.uri).setDescription(`<a:yes:707786803414958100> **\`${song.info.title}\`** 를(을) 재생합니다.`).setThumbnail(`https://img.youtube.com/vi/${song.info.identifier}/maxresdefault.jpg`))
        }
    }

    async getSongs(query) {
        const node = this.manager.nodes.get("default");
        const result = await Rest.load(node, query);

        switch(result.loadType) {
            case "TRACK_LOADED": {
                return result.tracks
            }

            case "SEARCH_RESULT": {
                return result.tracks
            }
        }
    }
}