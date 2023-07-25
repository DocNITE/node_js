import {REST, Routes, Client, GatewayIntentBits, Message, SlashCommandBuilder} from 'discord.js'
import config from './../settings/config.json'
import fs from 'node:fs';
import path from 'node:path';

export class Bot {
    DiscordClient: Client;
    RestAPI: REST;

    constructor() {
        // Initialize commands
        const command_test = 
            {
              data: new SlashCommandBuilder()
                   .setName('ping')
                   .setDescription('Replies with Pong!'),
               async execute(interaction: any) {
                  await interaction.reply('Pong!');
              }
            };
        const commands = [];
        commands.push(command_test.data.toJSON());
        // Grab all the command files from the commands directory you created earlier
        //const foldersPath = path.join(__dirname, 'commands');
        //const commandFolders = fs.readdirSync(foldersPath);

        // Construct and prepare an instance of the REST module
        this.RestAPI = new REST().setToken(config.discord_bot_token);

        // And deploy application commands!
        this.RestAPI.put(
            Routes.applicationCommands(config.discord_client_id),
            { body: commands },
        );

        // Initialize client
        this.DiscordClient = new Client({ 
            intents: [
                GatewayIntentBits.Guilds, 
                GatewayIntentBits.GuildMessages, 
                GatewayIntentBits.DirectMessages
            ] 
          });

        // Make events
        this.DiscordClient.on("ready", this.ready);
        this.DiscordClient.on("messageCreate", this.messageCreate)

        // Login and enable
        this.DiscordClient.login(config.discord_bot_token);
    }

    private ready(client: Client) {
        if (client.user == null) return;
        console.log(client.user.tag + " was running!");
    }

    private messageCreate(message: Message<boolean>) {
        message.channel.send("Huh?");
    }
}