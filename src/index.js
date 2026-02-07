const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRALIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRALIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};
// função rolar dado
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}
async function getRollGift(){
    let random = Math.random()
    let gift = {}

    if(random < 0.5) {
        gift.name = "CASCO"
        gift.value = -1
    } else {
        gift.name = "BOMBA"
        gift.value = -2
    }
    return gift
}


async function getRandomBlock(){
    let random = Math.random()
    let result

    switch(true) {
        case random < 0.33:
            result = "RETA"
            break;
            case random < 0.66:
                result = "CURVA";
                break;
                default:
                    result = "CONFRONTO"
    }
    return result
}

async function logRollResult(characterName, block, diceResult, attribute)
{
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++) {
        console.log(`🏁Rodada ${round}`);
    
        //sortear bloco
      let block = await getRandomBlock()
      console.log(`Bloco: ${block}`)
    
      //sortear gift
    let giftResult1 = await getRollGift();
    let giftResult2 = await getRollGift();

    //rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if(block === "RETA"){
        totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
        totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
    
        await logRollResult( character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE);
        await logRollResult(
            character2.NOME,
            "velocidade",
            diceResult2,
            character2.VELOCIDADE
        );
    }
    if(block === "CURVA"){
        totalTestSkill1 = diceResult1 + character1.MANOBRALIDADE;
        totalTestSkill2 = diceResult2 + character2.MANOBRALIDADE;
        
        await logRollResult(
            character1.NOME,
            "manobralidade",
            diceResult1,
            character1.MANOBRALIDADE
        );
        await logRollResult(
            character2.NOME,
            "manobralidade",
            diceResult2,
            character2.MANOBRALIDADE
        );
    }
    if(block === "CONFRONTO"){
        let powerResult1 = diceResult1 + character1.PODER + giftResult2.value
        let powerResult2 = diceResult2 + character2.PODER + giftResult1.value
    console.log(`${character1.NOME} 🎁 sorteou ${giftResult1.name} (${giftResult1.value}) confrontou ${character2.NOME} 🎁 sorteou ${giftResult2.name} (${giftResult2.value}) 🥊`);
    
    await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
    );

    await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
    );
    
    if (powerResult1 > powerResult2) {
        console.log(`${character1.NOME} venceu o confronto! Ganhou um TURBO 🏁 +1 ponto`);
        character1.PONTOS++;
    } else if (powerResult2 > powerResult1) {
        console.log(`${character2.NOME} venceu o confronto! Ganhou um TURBO 🏁 +1 ponto`);
        character2.PONTOS++;
    } else {
        console.log("Confronto empatado! Nenhum ponto foi ganhado ou perdido");
    }




}
    //verificando o vencedor
    
    if(totalTestSkill1 > totalTestSkill2){
        console.log(`${character1.NOME} marcou um ponto!`);
        character1.PONTOS++;
    }else if(totalTestSkill2 > totalTestSkill1){
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;  
    }
console.log("___________________________");

}
}

async function declareWinner(character1, character2){
    console.log("Resultado final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆️`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆️`);
    }else{
        console.log("A corrida terminou em empate");
    }
}

(async function main() {
    console.log(`🏁🚨Corrida entre ${player1.NOME} e ${player2.NOME} começando ...\n`);
    
  await  playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();


  
