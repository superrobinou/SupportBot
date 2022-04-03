import "reflect-metadata"; //libraire pour rendre l'application fonctionelle
import path from "path"; //librairie pour le chemin des fichiers
import {Client} from 'discordx'; //librairie pour discord en typescript pour le bot
import { Intents, Message } from 'discord.js'; //librairie discord.js pour le bot
import dotenv from 'dotenv'; //librairie pour les variables d'environnement
import { importx } from "@discordx/importer"; //libraire pour l'importation automatique de toutes les commandes à enregister
import mongoose from "mongoose"; //librairie pour la base de données mongodb
//variable pour gérer les différentes interactions de discord
export const client=new Client({
    simpleCommand: {
        prefix: "s!", //peut  étre changer, aucune commande simple dans ce code
    },
    //permissions demandés par le bot
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
    botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)], //stockage des serveurs ou se trouvent le bot
    silent: false
});
//ce que fait le bot une fois prêt
client.once("ready", async () => {
    //toutes les lignes suivantes se lancent pour gérer ce que doit faire le bot au démarrage
    await client.guilds.fetch();
    await client.initApplicationCommands({ global: { log: true }, guild: { log: true } });
    await client.initApplicationPermissions(true);

    console.log("Bot démarré");
});

//gestion des interactions
client.on('interactionCreate', async interaction => {
    client.executeInteraction(interaction);
});
//gestions des messages reçus (pas utilisé pour le moment)
client.on("messageCreate", (message: Message) => {
    client.executeCommand(message);
});
async function start(){
    //connexion à la base de données
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    //récupération des variables d'environnemment
    const folder = path.resolve(__dirname, '..');
    dotenv.config({ path: folder + '/globals.env' });
    console.log('chargement de configuration: ' + folder);
    var BOT_TOKEN = process.env.BOT_TOKEN;
    //importation de toutes les commandes existantes ailleurs
    await importx(__dirname + "/commands/*.{ts,js}");
    //connexion du bot
    client.login(BOT_TOKEN);
}

start();