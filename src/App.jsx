//CSS
import './App.css'
//React
import { useCallback, useEffect, useState } from 'react'
//data
import {wordsList} from "./data/words"
//Components
import StartScreen from './componets/StartScreen'
import Game from './componets/Game'
import GameOver from './componets/GameOver'

const stages = [
  {id:1, name: 'start'},
  {id:2, name: 'game'},
  {id:3, name: 'end'}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList) //palavras para o projeto
  const [palavra, setPalavra] = useState('') //palavras aleatórias
  const [categoria, setCategoria] = useState('') //categorias aleatórias
  const [letras, setLetras] = useState('') //letras aleatórias
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([])
  const [letrasUsadas, setLetrasUsadas] = useState([])
  const [chances, setChances] = useState(3)
  const [pontuacao, setPontuacao] = useState(0)

  //Função para selecionar uma categoria aleatória
  const PalavrasCategorias = useCallback(() => {
    const categorias = Object.keys(words)
    const categoriaAleatoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)]

    const palavraAleatoria = words[categoriaAleatoria][Math.floor(Math.random() * words[categoriaAleatoria].length)
    ]
    
    return {categoriaAleatoria, palavraAleatoria}
  }, [words])
  
  //Função para iniciar o game
  const startGame = useCallback(() =>{
    //Limpar dados iniciais
    limparDados()

    const {categoriaAleatoria, palavraAleatoria} = PalavrasCategorias()

    //Separando as letras das palavras
    let sequenciaLetras = palavraAleatoria.split('')
    sequenciaLetras = sequenciaLetras.map((l) => l.toLowerCase())

    //Passando os valores para o useState
    setCategoria(categoriaAleatoria)
    setPalavra(palavraAleatoria)
    setLetras(sequenciaLetras)
    
    console.log(categoria, palavra, letras)
    setGameStage(stages[1].name)
  }, [PalavrasCategorias])
  
  //Fução para verificar a letra
  const verificarLetra = (letraEscolhida) =>{
    //Colocar todas as letras que chegarem em minusculo, para processar os dados
    const normalizarLetra = letraEscolhida.toLowerCase()

    //Checar se a letra ja foi utilizada
    if(letrasUsadas.includes(normalizarLetra)){
      window.alert(`[ERRO] Você já utlizou a letra "${normalizarLetra}"! Use outra letra para continuar.`)
      return
    }

    //Verificar se a palavra contém a letra ou não
    if(letras.includes(normalizarLetra)){
      setLetrasAdivinhadas((atualLetrasAdivinhadas) =>[
        ...atualLetrasAdivinhadas, normalizarLetra
      ])
      setLetrasUsadas((atualLetrasUsadas) => [
        ...atualLetrasUsadas, normalizarLetra
      ])
    } else{
      setLetrasUsadas((atualLetrasUsadas) => [
        ...atualLetrasUsadas, normalizarLetra
      ])
      setChances((chances) => chances - 1)
    }
    
  }

  //Hook para monitorar a quantidade de chances
  useEffect(() => {
    if(chances <= 0){
      setGameStage(stages[2].name)
    }
  }, [chances])

  //Hook para monitorar condição de vitória
  useEffect(() => {
    const letrasUnicas = [... new Set(letras)/*Esse set vai criar um array de letras únicas*/]

  //Condição de vitoria
  if(letrasAdivinhadas.length === letrasUnicas.length){
    setPontuacao((atualPontuacao) => (atualPontuacao += 100))
    startGame()
  }
  }, [letrasAdivinhadas, letras, startGame]) 

  //Função para limpar dados ao fim do jogo
  const limparDados = () => {
    setLetrasAdivinhadas([])
    setLetrasUsadas([])
  }

  //Função para novo jogo
  const novoJogo = () =>{
    limparDados()

    setChances(3)

    setPontuacao(0)

    setGameStage(stages[0].name)
  }

  return (
    <div className='App'>
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game 
        verificarLetra={verificarLetra}
        categoria={categoria}
        palavra={palavra}
        letras={letras}
        letrasAdivinhadas={letrasAdivinhadas} 
        letrasUsadas={letrasUsadas} 
        chances={chances} 
        pontuacao={pontuacao}/>}
      {gameStage === 'end' && <GameOver novoJogo={novoJogo} pontuacao={pontuacao}/>}
    </div>
  )
}

export default App
