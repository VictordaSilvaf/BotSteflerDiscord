module.exports = async (client,msg) =>{
    var message = msg.content.split(" ");
    message = message[0];
    msg.reply(`Comando '${message}' não existe\nDigite .ajuda para ver todos os comandos.`);
}