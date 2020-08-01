module.exports = (client,msg) =>{
    var frases = [
        'Você se fudeu, mas eu também.',
        'Acaricie meu saco que vai brotar um milkshake.',
        'Aperta meu saco e vê se sai milkshake.',
        'A mulher cuja qual não tive relações sexuais q se manifeste agora!',
        'Pensa em uma mulher gostosa!!! Poisé, o Stifler ja comeu!!!',
        '"Você quis dizer: Chuck Norris?" - Google sobre Steve Stifler',
        'Deixa eu te dar uma ideia porquê você não pega uma colher pra comer a minha bunda',
        'Ótimo, você achou as lesbicas',
        'Aperta meu Pau e ve se sai Chantily',
        'NASA? Núcleo de Admiradores de Sexo Anal?',
        'Haha, isso não é lançamento de perfume não, eu já usei tanto essa revista que tá toda melecada.',
        'Lindos sapatos! Quer transar?',
        'O presente de hoje é pernas... porque não vamos pro meu quarto e você abre o presente?!'
    ];
    let numAleatorio = Math.floor(Math.random(frases.length)*10);

    msg.reply(frases[numAleatorio]);
    console.log(numAleatorio)
}