module.exports = (client,msg) => {
    //Verificar se o canal que a mesagem foi recebida possui uma fila atualmente.
    const queue = client.queues.get(msg.guild.id);

    //Se n tiver uma musica na fila ele retorna uma mensagem avisando que não possui uma musica na fila.
    if (!queue) {
        return msg.reply("Não existe nem uma musica sendo reproduzida.")
    }

    const volume = Number(msg.content.replace('.vol ', ''));
    if (isNaN(volume) || volume < 0 || volume >10)  {
        return msg.reply("Mano volume só de 0 a 10 namoral!")
    }
    queue.dispatcher.setVolume(volume / 10);
    queue.volume = volume;
    client.queues.set(msg.guild.id, queue);

}