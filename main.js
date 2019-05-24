const fs = require('fs');
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const mysql = require('mysql');
const env = process.env.NODE_ENV || 'production';
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

var sequelize = new Sequelize("database", "username", "password", {
	host: "your host name",
	port: 3306,
	dialect: 'mysql',
	operatorsAliases: false,
	pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 1000000000
  }
});

client.once('ready', () => {
	sequelize.authenticate();
	Systems.sync();
	console.log('Ready!');
});

const Systems = sequelize.define('systems', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	scout: Sequelize.INTEGER,
	cyclops: Sequelize.INTEGER,
	basilisk: Sequelize.INTEGER,
	medusa: Sequelize.INTEGER,
	hydra: Sequelize.INTEGER,
	combat_zone: Sequelize.INTEGER,
	bond: Sequelize.BIGINT,
	mission: Sequelize.INTEGER
});

client.on('message', message => {
	if (message.content.startsWith(prefix)) {
		// slices the prefix off of the message, then splits it into an array of space-separated words
		const input = message.content.slice(prefix.length).split(' ');
		const inString = message.content.toString();
		// returns the first word of the array, which is the command
		const command = input.shift();
		const commandArgs = input.join(' ');
		const splitArgs = commandArgs.split(' ');
		console.log(inString);

		// command to log alien kills to the db based on user input
		if (command === 'kills') {
			// scout settings
			if (inString.match(/[Ss]cout:\s([\d]+)/g) != null) {
				const scoutReg = inString.match(/[Ss]cout:\s([\d]+)/g);
				var scoutNum = scoutReg.toString().substring(6);
				console.log(scoutNum);
			} else {
				scoutNum = 0;
			}

			if (inString.match(/[Ss]couts:\s([\d]+)/g) != null) {
				const scoutsReg = inString.match(/[Ss]couts:\s([\d]+)/g);
				var scoutsNum = scoutsReg.toString().substring(7);
				console.log(scoutsNum);
			} else {
				scoutsNum = 0;
			}

			// cyclops settings
			if (inString.match(/[Cc]yclops:\s([\d]+)/g) != null) {
				const cyclopsReg = inString.match(/[Cc]yclops:\s([\d]+)/g);
				var cyclopsNum = cyclopsReg.toString().substring(8);
			} else {
				cyclopsNum = 0;
			}

			// basilisk settings
			if (inString.match(/[Bb]asilisk:\s([\d]+)/g) != null) {
				const basiliskReg = inString.match(/[Bb]asilisk:\s([\d]+)/g);
				var basiliskNum = basiliskReg.toString().substring(9);
			} else {
				basiliskNum = 0;
			}

			// medusa settings
			if (inString.match(/[Mm]edusa:\s([\d]+)/g) != null) {
				const medusaReg = inString.match(/[Mm]edusa:\s([\d]+)/g);
				var medusaNum = medusaReg.toString().substring(7);
			} else {
				medusaNum = 0;
			}

			// hydra settings
			if (inString.match(/[Hh]ydra:\s([\d]+)/g) != null) {
				const hydraReg = inString.match(/[Hh]ydra:\s([\d]+)/g);
				var hydraNum = hydraReg.toString().substring(6);
			} else {
				hydraNum = 0;
			}

			// combat zone settings
			if (inString.match(/[Cc][Zz]:\s([\d]+)/g) != null) {
				const czReg = inString.match(/[Cc][Zz]:\s([\d]+)/g);
				var czNum = czReg.toString().substring(3);
			} else {
				czNum = 0;
			}

			// bond settings
			if (inString.match(/[Bb]ond:\s([\d]+)/g) != null) {
				const bondReg = inString.match(/[Bb]ond:\s([\d]+)/g);
				var bondNum = bondReg.toString().substring(5);
			} else {
				bondNum = 0;
			}

			// bonds settings
			if (inString.match(/[Bb]onds:\s([\d]+)/g) != null) {
				const bondsReg = inString.match(/[Bb]onds:\s([\d]+)/g);
				var bondsNum = bondsReg.toString().substring(6);
			} else {
				bondsNum = 0;
			}

			// mission settings
			if (inString.match(/[Mm]ission:\s([\d]+)/g) != null) {
				const missionReg = inString.match(/[Mm]ission:\s([\d]+)/g);
				var missionNum = missionReg.toString().substring(8);
			} else {
				missionNum = 0;
			}

			// missions settings
			if (inString.match(/[Mm]issions:\s([\d]+)/g) != null) {
				const missionsReg = inString.match(/[Mm]issions:\s([\d]+)/g);
				var missionsNum = missionsReg.toString().substring(9);
			} else {
				missionsNum = 0;
			}

			const systemName = splitArgs[0];
			const sco = parseInt(scoutNum) + parseInt(scoutsNum);
			const cyc = cyclopsNum;
			const bas = basiliskNum;
			const med = medusaNum;
			const hyd = hydraNum;
			const cz = czNum;
			const bon = parseInt(bondNum) + parseInt(bondsNum);
			const mis = parseInt(missionNum) + parseInt(missionsNum);

			try {
				Systems.sync().then(function() {
					Systems.findOne({ where: {name: systemName} }).then(function(system) {
						if(!system) {
							const system = Systems.create({
								name: systemName,
								scout: sco,
								cyclops: cyc,
								basilisk: bas,
								medusa: med,
								hydra: hyd,
								combat_zone: cz,
								bond: bon,
								mission: mis,
							}).then(function() {
								return message.reply('New system: ' + systemName + ' detected. Adding information......done!');
							});
						} else {
							const system = Systems.increment({
								scout: sco,
								cyclops: cyc,
								basilisk: bas,
								medusa: med,
								hydra: hyd,
								combat_zone: cz,
								bond: bon,
								mission: mis,
							}, {
								where: { name: systemName }
							}).then(function() {
								return message.reply('Information added to the ' + systemName + ' log!');
							});
						}
					});
				})
			}
			catch(error) {
				if (error) {
					return message.reply('Something went wrong with adding your information :(');
				}
			}
		}
		// command to print out the current status of the system
		else if (command === 'status') {
			const systemName = splitArgs[0];

			Systems.findOne({ where: { name: systemName } }).then(function(system) {
				if(!system) {
					return message.reply('Could not find system: ' + systemName);
				} else {
					return message.reply('Current Status for the ' + systemName.toUpperCase() + ' system: \`\`\`INFESTATION COUNTS: \n------------------- \nScout Kills = ' + system.scout + '\nCyclops Kills = ' + system.cyclops + '\nBasilisk Kills = ' + system.basilisk + '\nMedusa Kills = ' + system.medusa + '\nHydra Kills = ' + system.hydra + '\n\nINCURSION COUNTS: \n----------------- \nCZ\'s Cleared = ' + system.combat_zone + '\nBonds Handed In = ' + system.bond + '\n\nMISSION COUNTS: \n--------------- \nMission\'s Complete = ' + system.mission + '\`\`\`');
				}
			});
		}
		// command to clear a system's entry in the DB
		else if (command === 'clear') {
		const systemName = splitArgs[0];
			const rowCount = Systems.destroy({ where: { name: systemName } });
			if (!rowCount) return message.reply('That system did not exist.');

			return message.reply(systemName + ' system cleared.');
		}
	};
});

client.login('your client secret here');
