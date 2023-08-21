const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const db = require('../../db');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('create-note')
    .setDescription('Crea una nota!')
    .addStringOption(option =>
        option
            .setName('title')
            .setDescription('El titulo de tu nota')
            .setRequired(true)
        )
    .addStringOption(option =>
            option
                .setName('description')
                .setDescription('La descripcion de tu nota'),
            ),
  async execute(interaction) {
    try {
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const id = interaction.user.id;

        db.prepare(`
            INSERT INTO notes (title, description, discord_id)
            VALUES (?, ?, ?)
        `).run(title, description, id);

        const button = new ButtonBuilder()
        .setCustomId('primary')
        .setLabel('Primary')
        .setStyle(ButtonStyle.Primary)
        // .setEmoji('123456789012345678');

        const row = new ActionRowBuilder()
			.addComponents(button);

        await interaction.reply({
            content:`Nota creada para <@${id}>`,
            components: [row],
        });

        const collectorFilter = i => i.user.id === interaction.user.id;
try {
	const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: time });

	if (confirmation.customId === 'primary') {
        console.log('click');
	}
} catch (e) {
	await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
}


    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
            return await interaction.reply('El usuario no existe! crea un usuario para poder crear notas');
        };
    
        console.log(error);
        await interaction.reply('Ha habido un error!');
    }
  },
};