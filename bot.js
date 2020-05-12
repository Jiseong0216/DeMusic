require("dotenv").config();

const { Client, Collection } = require("discord.js");
const client = new Client();
const { readdirSync } = require("fs");

client.commands = new Collection();
client.aliases = new Collection();
client.musicMgr = null;

const table = (new(require("ascii-table"))).setHeading("Commands", "Status");

readdirSync("./commands").forEach(dir => {
    for (let file of readdirSync(`./commands/${dir}`).filter(f => f.endsWith(".js"))) {
        let pull = require(`./commands/${dir}/${file}`);

        if (pull.name) {
            client.commands.set(pull.name, pull);
            table.addRow(file, "✅");
        } else {
            table.addRow(file, "❌");
            continue;
        }

        pull.aliases.forEach(alias => {
            client.aliases.set(alias, pull.name)
        });
    }
});

console.log(table.toString());
client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
    console.log(`==================\nLogged in as ${client.user.tag}(${client.user.id})\n==================`)

    const MusicMgr = require('./structures/MusicMgr');
    client.musicMgr = new MusicMgr(client);

    client.user.setActivity("\"mu.도움\" 명령어로 도움말 알아보기")
})
.on("message", async message => {
    if (message.author.bot || message.system || !message.content.startsWith(process.env.PREFIX)) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    try {
        let ops = {
            ownerID: process.env.OWNER_ID,
            prefix: process.env.PREFIX
        };

        if (command) {
            command.run(client, message, args, ops);
        }
    } catch (e) {
        console.log(e.stack)
        message.channel.send(new MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`에러가 발생했습니다.\n\`\`\`js\n${e.message}\n\`\`\``)
        .setColor("RED"));
    }
});