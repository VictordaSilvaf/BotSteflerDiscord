module.exports = (client,msg) => {
// .sair = Bot sai do canal de voz
        if (msg.member.voice.channel) {
            msg.member.voice.channel.leave();
        } else {
            msg.channel.send('Você precisa estar conectado a um Canal de Voz!');
        }
}