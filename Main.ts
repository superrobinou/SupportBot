import "reflect-metadata";
import path, { dirname } from "path";
import {Client} from 'discordx';
import { Intents, Message } from 'discord.js';
import level from "level";
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
import { importx } from "@discordx/importer";

export const client=new Client({
    simpleCommand: {
        prefix: "s!",
    },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
    silent: false
});
client.once("ready", async () => {
    // to create/update/delete discord application commands
    await client.guilds.fetch();
    await client.initApplicationCommands({ global: { log: true }, guild: { log: true } });
    await client.initApplicationPermissions(true);
    console.log("Bot started");
});
client.on('interactionCreate', async interaction => {
    console.log(interaction);
    client.executeInteraction(interaction);
});
client.on("messageCreate", (message: Message) => {
    client.executeCommand(message);
});
async function start(){
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const folder = path.resolve(__dirname, '..');
    dotenv.config({ path: folder + '/globals.env' });
    console.log('chargement de configuration: ' + folder);
    var BOT_TOKEN = process.env.BOT_TOKEN;
    console.log(BOT_TOKEN);
    await importx(__dirname + "/commands/*.{ts,js}");
    client.login(BOT_TOKEN);
}

start();