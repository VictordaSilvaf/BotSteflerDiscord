const Discord = require("discord.js");
const client  = new Discord.Client();

const config = require("./config.json");
const commands = require("./scripts/commandsReader")(config.prefix);

const unknowCommand = require("./scripts/unknowCommand");

client.queues = new Map();

client.on('ready', () => {
    console.log(`Estou conectado ${client.user.tag}, com ${client.users.size} usuarios.`);
});

client.on("message",(msg)=>{
    if(!msg.author.bot && msg.guild){
        if(config.debug) console.log(`${msg.author.username}: ${msg.content}`);
        const args = msg.content.split(" ");
        if(commands[args[0]]) commands[args[0]](client,msg);
        else if(args[0].split("")[0] == config.prefix) unknowCommand(client,msg);
    }
});

//Mensagem de boas vindas no canal
client.on ("guildMemberAdd" , (member) =>{
    const boasVindasChannel = member.guild.channels.cache.find(channel=>channel.id == config.avisosChannelId);
    boasVindasChannel.send(`${member.displayName} acabou de entrar em nosso servidor!`);
    member.send("Bem vindo ao nosso servidor!")
})
//Mensagem de boas vindas no privado
client.on ("guildMemberRemove" , (member) =>{
    const boasVindasChannel = member.guild.channels.cache.find(channel=>channel.id == config.avisosChannelId);
    boasVindasChannel.send(`${member.displayName} acabou de sair de nosso servidor!`);
})

client.login(config.token);