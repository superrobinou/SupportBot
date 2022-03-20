import "reflect-metadata";
import {Client, On} from 'discordx';
import { Intents } from 'discord.js';
import level from "level";
import ChannnelAddRemove from "./commands/channeladdremove.js";
import ChannnelName from './commands/channelname.js';
import ChannelClose from './commands/channelclose.js';
import ChannnelPanel from './commands/channelpanel.js';
import OnSupportOpen from './commands/onsupportopen.js';
async function start(){
    const client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MEMBERS,
        ],
        silent: false
    });

    client.once("ready", async () => {
        console.log(">> Bot started");

        // to create/update/delete discord application commands
        await client.initApplicationCommands({ global: { log: true }, guild: { log: true } });
        await client.initApplicationPermissions(true);
    });

    client.on('interactionCreate', async interaction => {
        client.executeInteraction(interaction);
    });
    new ChannnelAddRemove();
    new ChannnelName();
    new ChannelClose();
    new ChannnelPanel();
    new OnSupportOpen();
    client.login('BOT_TOKEN');
}
export var DB = level("jambon");
start();