module.exports = (client,msg,args) => {
    //Verificar se o canal que a mesagem foi recebida possui uma fila atualmente.
    const queue = client.queues.get(msg.guild.id);

    //Se n tiver uma musica na fila ele retorna uma mensagem avisando que não possui uma musica na fila.
    if (!queue) {
        return msg.reply("Não existe nem uma musica sendo reproduzida.")
    }

    //"pause()" pausa a musica.
    queue.dispatcher.pause();
}