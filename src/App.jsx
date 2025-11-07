import { useState, useEffect } from 'react'

// Hawaiian-themed word list
const WORD_LIST = [
  'ALOHA', 'BEACH', 'OCEAN', 'WAVES', 'PALMS', 'CORAL', 'TROPI', 'SUNNY',
  'HAPPY', 'CHILL', 'RELAX', 'SMILE', 'DANCE', 'MUSIC', 'PEACE', 'GROVE',
  'SHORE', 'FRUIT', 'MANGO', 'PLANT', 'FLORA', 'BLOOM', 'PETAL', 'HEART',
  'WHALE', 'SHARK', 'SHELL', 'PEARL', 'AQUA', 'BREEZ', 'CLOUD', 'BIRDS'
]

const WORD_LENGTH = 5
const MAX_GUESSES = 6

function App() {
  const [targetWord, setTargetWord] = useState('')
  const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(''))
  const [currentGuess, setCurrentGuess] = useState('')
  const [currentRow, setCurrentRow] = useState(0)
  const [gameStatus, setGameStatus] = useState('playing') // playing, won, lost
  const [shakeRow, setShakeRow] = useState(-1)
  const [revealingRow, setRevealingRow] = useState(-1)
  const [letterStatus, setLetterStatus] = useState({})

  // Initialize game
  useEffect(() => {
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    setTargetWord(randomWord)
  }, [])

  // Handle keyboard input
  useEffect(() => {
    if (gameStatus !== 'playing') return

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSubmit()
      } else if (e.key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1))
      } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess(prev => (prev + e.key.toUpperCase()))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentGuess, gameStatus, currentRow])

  const handleSubmit = () => {
    if (currentGuess.length !== WORD_LENGTH) {
      setShakeRow(currentRow)
      setTimeout(() => setShakeRow(-1), 500)
      return
    }

    // Update guesses
    const newGuesses = [...guesses]
    newGuesses[currentRow] = currentGuess
    setGuesses(newGuesses)

    // Trigger reveal animation
    setRevealingRow(currentRow)
    setTimeout(() => setRevealingRow(-1), 2000)

    // Update letter statuses
    updateLetterStatus(currentGuess)

    // Check win condition
    if (currentGuess === targetWord) {
      setTimeout(() => setGameStatus('won'), 2000)
    } else if (currentRow === MAX_GUESSES - 1) {
      setTimeout(() => setGameStatus('lost'), 2000)
    } else {
      setCurrentRow(currentRow + 1)
    }

    setCurrentGuess('')
  }

  const updateLetterStatus = (guess) => {
    const newStatus = { ...letterStatus }

    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i]
      if (targetWord[i] === letter) {
        newStatus[letter] = 'correct'
      } else if (targetWord.includes(letter) && newStatus[letter] !== 'correct') {
        newStatus[letter] = 'present'
      } else if (!newStatus[letter]) {
        newStatus[letter] = 'absent'
      }
    }

    setLetterStatus(newStatus)
  }

  const getLetterStatus = (letter, index, rowIndex) => {
    const guess = guesses[rowIndex]
    if (!guess || !guess[index]) return 'empty'

    if (rowIndex > currentRow) return 'empty'
    if (rowIndex === currentRow && gameStatus === 'playing') return 'active'

    if (targetWord[index] === letter) return 'correct'
    if (targetWord.includes(letter)) return 'present'
    return 'absent'
  }

  const handleKeyClick = (key) => {
    if (gameStatus !== 'playing') return

    if (key === 'ENTER') {
      handleSubmit()
    } else if (key === 'BACK') {
      setCurrentGuess(prev => prev.slice(0, -1))
    } else if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key)
    }
  }

  const resetGame = () => {
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    setTargetWord(randomWord)
    setGuesses(Array(MAX_GUESSES).fill(''))
    setCurrentGuess('')
    setCurrentRow(0)
    setGameStatus('playing')
    setLetterStatus({})
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-float">🌺</div>
        <div className="absolute top-20 right-20 text-5xl animate-float" style={{animationDelay: '0.5s'}}>🌴</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-float" style={{animationDelay: '1s'}}>🐚</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-float" style={{animationDelay: '1.5s'}}>🌊</div>
        <div className="absolute top-1/2 left-5 text-4xl animate-float" style={{animationDelay: '0.8s'}}>🥥</div>
        <div className="absolute top-1/3 right-10 text-4xl animate-float" style={{animationDelay: '1.2s'}}>🍍</div>
      </div>

      {/* Main container */}
      <div className="max-w-lg w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-2 drop-shadow-lg">
            🌺 Aloha Wordle 🌴
          </h1>
          <p className="text-white text-lg drop-shadow-md font-medium">
            Guess the Hawaiian-vibes word!
          </p>
        </div>

        {/* Game Board */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl mb-6">
          <div className="grid gap-2 mb-6">
            {guesses.map((guess, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid grid-cols-5 gap-2 ${shakeRow === rowIndex ? 'animate-shake' : ''}`}
              >
                {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                  const letter = rowIndex === currentRow && gameStatus === 'playing'
                    ? currentGuess[colIndex] || ''
                    : guess[colIndex] || ''

                  const status = getLetterStatus(letter, colIndex, rowIndex)
                  const isRevealing = revealingRow === rowIndex

                  return (
                    <TileCell
                      key={colIndex}
                      letter={letter}
                      status={status}
                      isRevealing={isRevealing}
                      delay={colIndex * 100}
                    />
                  )
                })}
              </div>
            ))}
          </div>

          {/* Virtual Keyboard */}
          <Keyboard onKeyClick={handleKeyClick} letterStatus={letterStatus} />
        </div>

        {/* Game Over Modal */}
        {gameStatus !== 'playing' && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-gradient-to-br from-tropical-pink via-tropical-orange to-tropical-yellow p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 transform animate-bounce-subtle">
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {gameStatus === 'won' ? '🎉' : '🌴'}
                </div>
                <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {gameStatus === 'won' ? 'Mahalo! 🌺' : 'Aloha! 🏝️'}
                </h2>
                <p className="text-white text-xl mb-4 drop-shadow-md">
                  {gameStatus === 'won'
                    ? `You found the word in ${currentRow + 1} ${currentRow + 1 === 1 ? 'try' : 'tries'}!`
                    : `The word was: ${targetWord}`}
                </p>
                <button
                  onClick={resetGame}
                  className="bg-white text-tropical-pink font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  🌊 Play Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-white/80 text-sm">
        <p>Made with 🤍 and tropical vibes</p>
      </div>
    </div>
  )
}

function TileCell({ letter, status, isRevealing, delay }) {
  const getBackgroundColor = () => {
    switch (status) {
      case 'correct':
        return 'bg-gradient-to-br from-green-400 to-green-600'
      case 'present':
        return 'bg-gradient-to-br from-tropical-yellow to-tropical-orange'
      case 'absent':
        return 'bg-gradient-to-br from-gray-400 to-gray-600'
      case 'active':
        return 'bg-white border-4 border-tropical-pink'
      default:
        return 'bg-white border-2 border-gray-300'
    }
  }

  const textColor = status === 'empty' || status === 'active' ? 'text-gray-800' : 'text-white'

  return (
    <div
      className={`
        aspect-square flex items-center justify-center text-3xl font-bold rounded-xl
        ${getBackgroundColor()} ${textColor}
        transform transition-all duration-300
        ${letter ? 'scale-105' : 'scale-100'}
        ${isRevealing ? 'animate-flip' : ''}
        shadow-lg
      `}
      style={isRevealing ? { animationDelay: `${delay}ms` } : {}}
    >
      {letter}
    </div>
  )
}

function Keyboard({ onKeyClick, letterStatus }) {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
  ]

  const getKeyColor = (key) => {
    if (key === 'ENTER' || key === 'BACK') {
      return 'bg-gradient-to-br from-tropical-pink to-tropical-purple text-white'
    }

    const status = letterStatus[key]
    switch (status) {
      case 'correct':
        return 'bg-gradient-to-br from-green-400 to-green-600 text-white'
      case 'present':
        return 'bg-gradient-to-br from-tropical-yellow to-tropical-orange text-white'
      case 'absent':
        return 'bg-gradient-to-br from-gray-400 to-gray-600 text-white'
      default:
        return 'bg-gradient-to-br from-white to-sand-light text-gray-800 border-2 border-gray-300'
    }
  }

  return (
    <div className="space-y-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyClick(key)}
              className={`
                ${getKeyColor(key)}
                ${key === 'ENTER' || key === 'BACK' ? 'px-4 text-xs' : 'w-10'}
                h-14 rounded-lg font-bold
                hover:scale-105 active:scale-95
                transform transition-all duration-150
                shadow-md hover:shadow-lg
              `}
            >
              {key === 'BACK' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default App
