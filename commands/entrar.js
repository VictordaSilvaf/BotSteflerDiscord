module.exports = (client,msg) => {

    let connection;
    if (msg.content === '.entrar') {
        if (msg.member.voice.channel) {
            connection = msg.member.voice.channel.join();
        } else {
            msg.channel.send('Você precisa estar conectado a um Canal de Voz!');
        }
    }
}