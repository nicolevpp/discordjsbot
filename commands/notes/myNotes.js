const { SlashCommandBuilder, codeBlock } = require('discord.js');
const db = require('../../db');
const { AlignmentEnum, AsciiTable3 } = require('ascii-table3');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('my-notes')
    .setDescription('Chequea tus notas!'),
  async execute(interaction) {
    try {
        const id = interaction.user.id;

        const notes = db
        .prepare(`
            SELECT * FROM notes
            WHERE discord_id = ?
        `).all(id);

        const formatedNotes = notes.map(note => [note.title, note?.description || '']);


        const table = 
        new AsciiTable3('Mis notas')
        .setHeading('titulo', 'descripcion')
        .setAlignCenter(2, AlignmentEnum.CENTER)
        .addRowMatrix(formatedNotes);

        await interaction.reply(`Notas `)
        await interaction.reply(codeBlock(table));

    } catch (error) {
        console.log(error);
        await interaction.reply('Ha habido un error!');
    }
  },
};