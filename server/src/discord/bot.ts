import {Client, GatewayIntentBits, Message} from 'discord.js'
import config from './../settings/config.json'

export class Bot {
    DiscordClient: Client;

    constructor() {
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