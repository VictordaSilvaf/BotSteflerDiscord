const config = require("../config.json");
const commands = require("../scripts/commandsReader")(config.prefix);

const descriptions = {
    ".ajuda":   "Use esse comando para ver os comandos disponiveis",
    ".aviso":   "Avise as pessoas do server",
    ".limpar":  "Limpe o chat",
    ".ping":    "Pingue o bot",
    ".stifler": "Gera uma das minha famosas frases"
};

module.exports = async (client,msg) =>{
    var texto = 'Comandos: \n';
    Object.keys(commands).forEach(command =>{
        texto += `\n ${command}: ${descriptions[command] ? descriptions[command] : 'Você não sabe? Nem eu!'}`
    });
    msg.reply(texto)
}