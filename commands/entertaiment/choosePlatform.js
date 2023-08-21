const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Client } = require('discord.js');

const client = new Client({ intents: 3276799})

const platformLogos = [
  { name: 'Netflix', value: 'netflix', logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/2048px-Netflix_icon.svg.png" },
  { name: 'Hulu', value: 'hulu', logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/hulu-icon.png" },
	{ name: 'Apple', value: 'apple', logo: "https://1000marcas.net/wp-content/uploads/2022/02/Apple-TV-macOS-logo.png" },
  { name: 'HBO', value: 'hbo', logo: "https://static.wikia.nocookie.net/logopedia/images/7/78/HBO_Max_square_social_logo.jpg/revision/latest/scale-to-width-down/250?cb=20230212165250"},
	{ name: 'iPlayer', value: 'iplayer', logo: "https://www.increasebroadbandspeed.co.uk/wp-content/uploads/2020/01/BBC-iPlayer-Logo.png" },
	{ name: 'Paramount', value: 'paramount', logo: "https://logodownload.org/wp-content/uploads/2021/03/paramount-plus-logo-1.png" },
	{ name: 'Prime', value: 'prime', logo: "https://static.vecteezy.com/system/resources/previews/019/040/292/non_2x/amazon-prime-video-logo-editorial-free-vector.jpg" },
  { name: 'Disney+', value: 'disney', logo: "https://seeklogo.com/images/D/disney-logo-575AED0F1D-seeklogo.com.png" },
]

const createEmbed = (response, logo) => {

  const exampleEmbed = new EmbedBuilder()
  .setColor(0x0099FF)
	.setTitle(response.title  || "No disponible")
	.setDescription('Movie info')
	.setThumbnail(logo  || "No disponible")
	.addFields(
		{ name: 'YouTube Trailer', value: `${response.youtubeTrailerVideoLink || "No disponible"}`, inline: true },
		{ name: 'IMBD Rating', value: `${response.imdbRating  || "No disponible"}`, inline: true },
    { name: 'Overview', value: `${response.overview  || "No disponible"}`, inline: false },
	)
  .setImage(response.posterURLs.original  || "No disponible");
  return exampleEmbed;
};

const genreList = [
  { name: 'Biography', value: 'biography', id: '1' },
  { name: 'Musical', value: 'musical', id: '4' },
  { name: 'sport', value: 'sport', id: '5' },
  { name: 'Short', value: 'short', id: '6' },
  { name: 'Adventure', value: 'adventure', id: '12' },
  { name: 'Fantasy', value: 'fantasy', id: '14' },
  { name: 'Animation', value: 'animation', id: '16' },
  { name: 'Drama', value: 'drama', id: '18' },
  { name: 'Horror', value: 'horror', id: '27' },
  { name: 'Action', value: 'action', id: '28' },
  { name: 'Comedy', value: 'comedy', id: '35' },
  { name: 'History', value: 'history', id: '36' },
  { name: 'Thriller', value: 'thriller', id: '53' },
  { name: 'Crime', value: 'crime', id: '80' },
  { name: 'Documentary', value: 'documentary', id: '99' },
  { name: 'Science Fiction', value: 'science-fiction', id: '878' },
  { name: 'Mistery', value: 'mistery', id: '9648' },
  { name: 'Romance', value: 'romance', id: '10749' },
  { name: 'Family', value: 'family', id: '10752' },
  { name: 'War', value: 'war', id: '10763' },
]


module.exports = {
    data: new SlashCommandBuilder()
    .setName('choose-platform')
    .setDescription('Choose your streaming platform for today! :)')
    .addStringOption(option =>
			option.setName('platform')
				.setDescription('Available platforms')
				.setRequired(true)
				.addChoices(
					{ name: 'Netflix', value: 'netflix' },
					{ name: 'Hulu', value: 'hulu' },
					{ name: 'Apple', value: 'apple' },
          { name: 'HBO', value: 'hbo' },
					{ name: 'iPlayer', value: 'iplayer' },
					{ name: 'Paramount', value: 'paramount' },
					{ name: 'Prime', value: 'prime' },
          { name: 'Disney+', value: 'disney' },
				))
        .addStringOption(option =>
          option.setName('genre')
            .setDescription('What do you feel like watching ;)')
            .setRequired(true)
            .addChoices(
              { name: 'Biography', value: 'biography', id: '1' },
              { name: 'Musical', value: 'musical', id: '4' },
              { name: 'sport', value: 'sport', id: '5' },
              { name: 'Short', value: 'short', id: '6' },
              { name: 'Adventure', value: 'adventure', id: '12' },
              { name: 'Fantasy', value: 'fantasy', id: '14' },
              { name: 'Animation', value: 'animation', id: '16' },
              { name: 'Drama', value: 'drama', id: '18' },
              { name: 'Horror', value: 'horror', id: '27' },
              { name: 'Action', value: 'action', id: '28' },
              { name: 'Comedy', value: 'comedy', id: '35' },
              { name: 'History', value: 'history', id: '36' },
              { name: 'Thriller', value: 'thriller', id: '53' },
              { name: 'Crime', value: 'crime', id: '80' },
              { name: 'Documentary', value: 'documentary', id: '99' },
              { name: 'Science Fiction', value: 'science-fiction', id: '878' },
              { name: 'Mistery', value: 'mistery', id: '9648' },
              { name: 'Romance', value: 'romance', id: '10749' },
              { name: 'Family', value: 'family', id: '10752' },
              { name: 'War', value: 'war', id: '10763' },
            )),
        
    async execute(interaction) {

      const platform = interaction.options.getString('platform');
      const genre = interaction.options.getString('genre');

      const findGenre = genreList.find(d => d.value === genre)
      const genreId = findGenre.id;

      const findPlatfromLogo = platformLogos.find(p => p.value === platform)
      const platformLogoResult = findPlatfromLogo.logo;

      const axios = require('axios');

      const movies = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/v2/search/basic',
      params: {
        country: 'us',
        services: `${platform}`,
        output_language: 'en',
        show_type: 'movie',
        genre: `${genreId}`,
        show_original_language: 'en'
      },
      headers: {
        'X-RapidAPI-Key': '4e647966b8mshc4a4c5d9949fa7cp1409e5jsndc6b5c1ba594',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
          };

      try {
        const response = await axios.request(movies);
        await interaction.reply ("Here are your results");

        for (const data of response.data.result) { 
          const embed = createEmbed(data, platformLogoResult);
          const button = new ButtonBuilder()
            .setCustomId('add')
            .setLabel('Add to your list')
            .setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder()
            .addComponents(button);
          await interaction.followUp ({embeds: [embed]})   
          
          // console.log(button);
          console.log(embed.data.fields);
          
        }
      
       }
     catch (error) {
        console.error(error);
      }
        
      },
      };