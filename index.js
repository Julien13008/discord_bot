const express = require('express');
const app = express();
const port = 3000; // You can change this port number if needed

// Define a route for the root URL
const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require("dotenv");

dotenv.config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
    }
});

client.login(process.env.DISCORD_TOKEN).then(r => console.log('Logged in!'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
