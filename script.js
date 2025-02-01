



document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('bingo-board');
    const boardCharlie = document.getElementById('bingo-board-charlie');
    const newGameButton = document.getElementById('new-game-button');
    const startGameButton = document.getElementById('start-game-button');
    const sorteioNumeros = document.getElementById('sorteio-numeros');
    const numerosSorteados = document.getElementById('numeros-sorteados');

    let numeros = [];
    let cartela = [];
    let cartelaCharlie = [];

    function gerarNumeroAleatorio(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function createBoard() {
        board.innerHTML = '';
        boardCharlie.innerHTML = '';
        numeros = [];
        cartela = [];
        cartelaCharlie = [];

        // Gerar 10 números aleatórios entre 0 e 50 para a cartela do jogador
        while (cartela.length < 10) {
            let numero = gerarNumeroAleatorio(50);
            if (!cartela.includes(numero)) {
                cartela.push(numero);
            }
        }

        // Gerar 10 números aleatórios entre 0 e 50 para a cartela do Charlie
        while (cartelaCharlie.length < 10) {
            let numero = gerarNumeroAleatorio(50);
            if (!cartelaCharlie.includes(numero)) {
                cartelaCharlie.push(numero);
            }
        }

        cartela.forEach(num => {
            const cell = document.createElement('div');
            cell.classList.add('bingo-cell');
            cell.textContent = num;
            cell.addEventListener('click', () => cell.classList.toggle('selected'));
            board.appendChild(cell);
        });

        cartelaCharlie.forEach(num => {
            const cell = document.createElement('div');
            cell.classList.add('bingo-cell');
            cell.textContent = num;
            boardCharlie.appendChild(cell);
        });

        console.log('Cartela do jogador:', cartela);
        console.log('Cartela do Charlie:', cartelaCharlie);
    }

    function sortearNumero() {
        if (numeros.length >= 50) return;
        const numero = gerarNumeroAleatorio(50);
        if (!numeros.includes(numero)) {
            numeros.push(numero);
            sorteioNumeros.textContent = numero;
            numerosSorteados.textContent = 'Números Sorteados: ' + numeros.join(', ');

            // Marcar o número sorteado na cartela do Charlie
            const cellsCharlie = Array.from(boardCharlie.getElementsByClassName('bingo-cell'));
            cellsCharlie.forEach(cell => {
                if (parseInt(cell.textContent) === numero) {
                    cell.classList.add('selected');
                }
            });

            // Verificar se o Charlie ganhou
            const numerosCharlieSelecionados = cellsCharlie.filter(cell => cell.classList.contains('selected')).map(cell => parseInt(cell.textContent));
            if (numerosCharlieSelecionados.length === 10) {
                alert('Charlie ganhou!');
                return;
            }

            setTimeout(sortearNumero, 6000); // 6 segundos até o próximo sorteio
        } else {
            sortearNumero();
        }
    }

    newGameButton.addEventListener('click', createBoard);
    startGameButton.addEventListener('click', () => {
        numeros = [];
        numerosSorteados.textContent = '';
        sortearNumero();
    });

    createBoard();
});

