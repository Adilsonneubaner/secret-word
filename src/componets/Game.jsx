import { useState, useRef } from "react"
import "./Game.css"

const Game = ({
  verificarLetra, 
  categoria, 
  palavra, 
  letras, 
  letrasAdivinhadas, 
  letrasUsadas, 
  chances, 
  pontuacao
}) => {
  //set para pegar a letra do input
  const [letraEscolhida, setLetraEscolhida] = useState('')
  //Hook para focar no input após digitar uma letra
  const focarInput = useRef(null)
  //Função para enviar essa letra para a função de verificar
  const handleSubmit = (e) => {
    e.preventDefault()
    verificarLetra(letraEscolhida, focarInput, setLetraEscolhida)
  }
  return (
    <div className="game">
        <p className="pontos">
          <span>Pontuação: {pontuacao}</span>
        </p>
        <h1>Adivinhe a palavra</h1>
        <h2 className="dica">Dica sobra a palavra: <span>{categoria}</span></h2>
        <p id="tentativas">Você tem {chances} tentativa(s)</p>
        <div className="container-palavra">
          {/* Adicionando letras adivinhadas */}
          {letras.map((letras, i) => (
            letrasAdivinhadas.includes(letras) ? (
              <span key={i} className="letter">{letras}</span>
            ) : (
              <span key={i} className="blank"></span>
            )
          ))}
        </div>
        <div className="container-letra">
          <p>Tente adivinhar uma letra da palavra</p>
          <form onSubmit={handleSubmit} autoComplete="off">
            <input type="text" name="letra" id="" maxLength={1} required onChange={(e) => setLetraEscolhida(e.target.value)} value={letraEscolhida} ref={focarInput}/>
            <button>Jogar!</button>
          </form>
        </div>
        <div className="letras-utilizadas">
          <p>Letras já utilizadas:</p>
          {/*Adicionando letras usadas*/}
          {letrasUsadas.map((letrasUsadas, i) =>(
            <span key={i}>{letrasUsadas}, </span>
          ))}
        </div>
    </div>
  )
}

export default Game