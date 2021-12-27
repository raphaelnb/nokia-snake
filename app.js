document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0
    let appleIndex = 0
    let currentSnake = [2,1,0] /* toda div com valor 2 é a cabeça e toda div com valor 0 é a cauda */

    // agora o corpo
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    // começar e restartar o jogo
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    // função para todos resultados da cobrinha
    function moveOutcomes() {

        // se a cobrinha bater na linha ou em si mesma
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || // se a cobrinha bater na linha de baixo
            (currentSnake[0] % width === width -1 && direction === 1) || // se a cobrinha bater na linha da direita
            (currentSnake[0] % width === 0 && direction === -1) || // se a cobrinha bater na linha da esquerda
            (currentSnake[0] - width < 0 && direction === -width) || // linha de cima
            squares[currentSnake[0] + direction].classList.contains('snake') // se a cobrinha bater em si mesmo
        ) {
            return clearInterval(interval) // limpa o interval se qualquer caso acima ocorrer
        }

        const tail = currentSnake.pop() // remove o último item da array e o mostra
        squares[tail].classList.remove('snake') // remove a class 'snake' da cauda
        currentSnake.unshift(currentSnake[0] + direction) // direciona o cabeça da array

        // quando a cobrinha pega a maçã
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')

    }

    // gerar nova maçã
    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }

    // funções usando keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake') /* remover a class 'snake' em cada movimento */

        if (e.keyCode === 39) {
            direction = 1 /* se apertar a seta direita, a cobra vira para direita */
        } else if (e.keyCode === 38) {
            direction = -width /* se apertar a seta pra cima, a cobra vira para cima */
        } else if (e.keyCode === 37) {
            direction = -1 /* seta da esquerda, a cobra vira para a esquerda */
        } else if (e.keyCode === 40) {
            direction = +width /* seta para baixo, a cobra aparece 10 divs para baixo da atual */
            
        }
        
    }

    document.addEventListener('keyup', control) 
    startBtn.addEventListener('click', startGame)

})