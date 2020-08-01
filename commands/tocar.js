const search = require("yt-search")
const ytdl = require("ytdl-core-discord")

module.exports = (client,msg,args) =>{
    //Remove a parte do comando ".tocar", e so deixa a parte que esta sendo pesquisada.
    let oQueTocar = msg.content.replace('.tocar ', '');

    try {
        //Pesquisa oque o usuario mandou no youtube, e retorna uma mesagem para o usuario se nao for encontrado nada.
        search(oQueTocar, (err,result)=>{
            if(err) {
                throw err;
            } else if(result && result.videos.length > 0) {
                const song = result.videos[0];
                const queue = client.queues.get(client,msg,song);
                if (queue) {
                    queue.songs.push(song);
                    client.queues.set(msg.guild.id, queue);
                } else playSong(client,msg,song);
            } else {
                return msg.reply("Não encontrei oque você procurou.")
            }
        })
    } catch (e) {
        console.log(e);
    }

}

const playSong = async (client,msg,song) => {
    //Define a fila do servidor dentro de uma variavel.
    let queue = client.queues.get(msg.member.guild.id)

    //Se nao tiver uma musica na fila o bot se desconecta do canal.
    if (!song) {
        if (queue) {
            queue.connection.disconnect();
            return client.queues.delete(msg.member.guild.id)
        }
    }

    //Se o usuario eviar um comando de fora de um canal, o bot sinaliza que ele nao esta em um canal.
    if (!msg.member.voice.channel) {
        return msg.reply("Você precisa estar em um canal de voz para isso.");
    }

    if (!queue) {
        //Conecta o bot no canal do usuario que enviou o comando.
        const connection =await msg.member.voice.channel.join();
        queue = {
            volume: 10,
            connection: connection,
            dispatcher: null,
            songs: [song]
        }

        //Reproducao do audio do video escolhido pelo usuario.
        queue.dispatcher = await queue.connection.play(await ytdl(song.url, {highWaterMark: 1 << 25, filter: "audioonly",}), {
            type: "opus",
        });

        console.log(song)
        msg.reply("Tocando: "+song.title+" | "+song.timestamp+" minutos\n"+song.url)

        //organizando a passagem entre musicas
        queue.dispatcher.on("finish", () =>{
            //Excluir a musica atual e tocar a proxima.
            queue.songs.shift();
            playSong(client,msg,queue.songs[0]);
        })
        client.queues.set(msg.member.guild.id, queue);
    } else {
        queue.songs.push(song);
        client.queues.set(msg.member.guild.id)
    }
}