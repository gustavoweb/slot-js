// Defina os símbolos do caça-níquel
const simbolos = ["cereja", "limao", "laranja", "morango", "uva"];

// Obtenha referências aos elementos HTML
const resultadoElement = document.getElementById("resultado");
const botaoJogar = document.getElementById("jogar");

// Adicione um evento de clique ao botão de jogar
botaoJogar.addEventListener("click", jogar);

// Variável para armazenar a pontuação inicial
let pontuacao = 100;

// Obtenha a referência à pontuação no HTML
const pontuacaoElement = document.getElementById("valorPontuacao");

// Função para girar o caça-níquel
function girarCacaNiquel() {
    const resultado = [];

    for (let i = 0; i < 3; i++) {
        const simboloAleatorio = simbolos[Math.floor(Math.random() * simbolos.length)];
        resultado.push(simboloAleatorio);
    }

    return resultado;
}

// Função para atualizar o resultado e a pontuação
function atualizarResultado() {
    const simbolos = document.querySelectorAll('.simbolo');
    const resultadoGirado = girarCacaNiquel();

    // Mapeie os resultados para as imagens correspondentes
    const imagens = resultadoGirado.map((simbolo, index) => {
        return `src/img/${simbolo}.jpg`;
    });

    // Atualize as imagens dos símbolos
    simbolos.forEach((simbolo, index) => {
        simbolo.src = imagens[index];
    });

    if (resultadoGirado[0] === resultadoGirado[1] && resultadoGirado[1] === resultadoGirado[2]) {
        // Três frutas iguais - Ganhe 15 pontos
        pontuacao += 15;
        resultadoElement.textContent = `${resultadoGirado} + 15`;
    } else if (resultadoGirado[0] === resultadoGirado[1] || resultadoGirado[1] === resultadoGirado[2] || resultadoGirado[0] === resultadoGirado[2]) {
        // Duas frutas iguais - Ganhe 2 pontos
        pontuacao += 2;
        resultadoElement.textContent = `${resultadoGirado} + 2`;
    } else {
        // Três frutas diferentes - Perca 5 pontos
        pontuacao -= 5;
        resultadoElement.textContent = `${resultadoGirado} - 5`;
    }

    // Atualize e exiba a pontuação no HTML
    pontuacaoElement.textContent = pontuacao;

    if (pontuacao <= 0) {
        resultadoElement.textContent += " - Você perdeu! Recomece.";
        pontuacao = 100; // Reinicie a pontuação
    }


    setTimeout(() => {
        // Restaure os placeholders após 500ms
        simbolos.forEach((simbolo, index) => {
            simbolo.src = "src/img/slot.jpg";
            botaoJogar.style.display = 'block';
            resultadoElement.textContent = "";
        });

        
    }, 3500);
}


// Função para iniciar o jogo
function jogar() {
    botaoJogar.style.display = 'none';
    resultadoElement.textContent = "Rodando...";

    setTimeout(() => {
    atualizarResultado();
        
    }, 500);
}