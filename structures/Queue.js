const { ms, s, m, h } = require("./time-convert");

/**
 * @class Queue
 */
module.exports = class Queue {
    /**
     * @param {import("./MusicClient")} client
     * @param {Object} data
     * @param {import("discord.js").TextChannel} data.textChannel
     * @param {import("discord.js").VoiceChannel} data.voiceChannel
     */
    constructor(client, data = {}) {
        this.client = client;
        this.textChannel = data.textChannel;
        this.voiceChannel = data.voiceChannel;
        this.player = null;
        this.songs = [];
        this.volume = 100;
        this.playing = true;
        this.loop = false;
    }

    /**
     * @param {import("lavacord").Player} player
     */
    setPlayer(player) {
        this.player = player;
    }

    async pause() {
        if (!this.playing) return false;
        await this.player.pause(true);
        this.playing = false;
        return true;
    }

    async resume() {
        if (this.playing) return false;
        await this.player.pause(false);
        this.playing = true;
        return true;
    }

    async skip() {
        return await this.player.stop();
    }

    async setVolume(value) {
        if (!value || isNaN(value)) return false;
        await this.player.volume(value);
        this.volume = parseInt(value);
        return true;
    }

    async destroy() {
        this.client.musicMgr.queue.delete(this.textChannel.guild.id);
        await this.client.musicMgr.manager.leave(this.textChannel.guild.id);
    }

    songProgress(message, count = 20) {
        const res = new Array(count).fill("─");
        res[Math.floor((this.client.musicMgr.queue.get(message.guild.id).player.state.position / this.client.musicMgr.queue.get(message.guild.id).songs[0].info.length) * count)] = "⚫️"
        return res.join("")
    }

    format(s, m, h) {
        if (isNaN(s) || isNaN(m) || isNaN(h)) return "00:00:00"
        s = s < 10 ? `0${s}` : s
        m = m < 10 ? `0${m}` : m
        h = h < 10 ? `0${h}` : h
        return `${h}:${m}:${s}`
    }

    duration(time) {
        const [hour, min, sec] = ms.to(h, m, s)(time)
        return this.format(sec, min, hour)
    }

    percent(message) {
        return ((this.client.musicMgr.queue.get(message.guild.id).player.state.position / this.client.musicMgr.queue.get(message.guild.id).songs[0].info.length) * 100).toFixed(1)
    }
}