const tmi = require('tmi.js');

// Define configuration options
const opts = {
	identity: {
		username: '[BOT_USERNAME]',
		password: '[PASSWORD]'
	},
	channels: [
		'[CHANNEL_NAME]'
	]
};

// Variables
var delay = 5; // Time (in seconds) the bot is not able to answer after a previous asnwer
var lastFired = (Date.now() - (delay * 1000));

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect().catch(console.error);

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
	if (self) { return; } // Ignore messages from the bot

	const commandName = msg.trim();
	console.log(`${context.username}: ${commandName}`);	// Shows in console the message with the user that sent it
	console.log((Date.now() - (delay * 1000)) > lastFired);	// Shows in console if teh bot can answer or not

	if((Date.now() - (delay * 1000)) > lastFired){
		var str = commandName;
		var words = str.split(" ");

		for (var i = 0; i < words.length; i++) {
			var strToComp = words[i]; 	// Use this variable to compare for emotes
			var strToCompLower = words[i].toLowerCase();	// Use this variable to compare for general words

			//  Example for answering to a word
			// Answers to the word 'bot' with 'Am I a bot?'
			if (strToCompLower === 'bot') {
				client.say(target, `Am I a bot?`);
				console.log(`* Executed ${strToComp} command`);
				lastFired = Date.now();
			}

			// Example for answering to an emote
			// Answers to the emote 'PogO' with 'Hi, PogO u'
			if (strToComp === 'PogO') {
				client.say(target, `Hi, PogO u`);
				console.log(`* Executed ${strToComp} command`);
				lastFired = Date.now();
			}
		}
	}
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}