const playSong = require("./tocar");

module.exports = (client,msg) => {
    // Seta a fila em uma variavel local.
    const queue = client.queues.get(msg.guild.id);

    // Se n tiver uma musica na fila ele retorna uma mensagem avisando que não possui uma musica na fila.
    console.log(queue)
    if (!queue) {
        return msg.reply("Não existe nem uma musica sendo reproduzida.")
    }

    // Remove a primeira musica da fila, e em seguida seta a fila atualizada.
    queue.songs.shift();
    client.queues.set(msg.guild.id, queue);
    playSong(client,msg, queue.songs[0]);
}