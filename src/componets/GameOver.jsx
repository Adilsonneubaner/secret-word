import './GameOver.css'

const GameOver = ({novoJogo, pontuacao}) => {
  return (
    <div id='game-over'>
      <h1>Game Over</h1>
      <p>Sua pontuação foi de <span id='pontuacao'>{pontuacao}</span> pontos</p>
      <button onClick={novoJogo}>Jogar de novo</button>
    </div>
  )
}

export default GameOver