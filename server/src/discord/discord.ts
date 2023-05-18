import { Bot } from "./bot";
import config from '../settings/config.json'

export namespace Discord {
    let bot: Bot;
    // Initialize discord bot/integration bruh
    export function initialize() {
        if (!config.discord_bot) 
            console.log("Discord bot was disabled from 'config.json'");
        else
            bot = new Bot();
    }
}