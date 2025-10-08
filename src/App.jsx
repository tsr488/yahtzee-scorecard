import { useState, useEffect, useCallback } from 'react'

// Yahtzee categories in order
const YAHTZEE_CATEGORIES = [
  // Upper Section
  { id: 'ones', name: 'Ones', section: 'upper' },
  { id: 'twos', name: 'Twos', section: 'upper' },
  { id: 'threes', name: 'Threes', section: 'upper' },
  { id: 'fours', name: 'Fours', section: 'upper' },
  { id: 'fives', name: 'Fives', section: 'upper' },
  { id: 'sixes', name: 'Sixes', section: 'upper' },
  // Lower Section
  { id: 'threeOfKind', name: '3 of a Kind', section: 'lower' },
  { id: 'fourOfKind', name: '4 of a Kind', section: 'lower' },
  { id: 'fullHouse', name: 'Full House (25)', section: 'lower' },
  { id: 'smallStraight', name: 'Sm. Straight (30)', section: 'lower' },
  { id: 'largeStraight', name: 'Lg. Straight (40)', section: 'lower' },
  { id: 'yahtzee', name: 'Yahtzee (50)', section: 'lower' },
  { id: 'chance', name: 'Chance', section: 'lower' }
]

// Helper function to check if all players have filled a score for a category
const isRowComplete = (players, scores, categoryId) => {
  return players.every(player => 
    scores[player] && scores[player][categoryId] !== null && scores[player][categoryId] !== undefined
  )
}

// Setup Screen Component (moved outside to prevent recreation)
const SetupScreen = ({ 
  roomName, 
  playerName, 
  handlePlayerNameChange, 
  handlePlayerNameKeyPress, 
  addPlayer, 
  players, 
  removePlayer, 
  startGame 
}) => (
  <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
    <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: 30 }}>🎲 {roomName}</h1>
    
    <div style={{ marginBottom: 30 }}>
      <h3>Add Player:</h3>
      <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
        <input
          type="text"
          value={playerName}
          onChange={handlePlayerNameChange}
          onKeyPress={handlePlayerNameKeyPress}
          placeholder="Enter player name"
          style={{ 
            flex: 1, 
            padding: 12, 
            border: '2px solid #ddd', 
            borderRadius: 8,
            fontSize: 18
          }}
        />
        <button
          onClick={addPlayer}
          style={{
            padding: '12px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>

      {players.length > 0 && (
        <div>
          <h3>Players ({players.length}):</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {players.map(player => (
              <li key={player} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: 10,
                backgroundColor: '#f8f9fa',
                marginBottom: 5,
                borderRadius: 5
              }}>
                <span style={{ fontSize: 18 }}>{player}</span>
                <button
                  onClick={() => removePlayer(player)}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    padding: '10px 10px',
                    cursor: 'pointer',
                    fontSize: 16
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    <button
      onClick={startGame}
      disabled={players.length === 0}
      style={{
        width: '100%',
        padding: 18,
        backgroundColor: players.length > 0 ? '#27ae60' : '#bdc3c7',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        fontSize: 20,
        fontWeight: 'bold',
        cursor: players.length > 0 ? 'pointer' : 'not-allowed'
      }}
    >
      Start Game
    </button>
  </div>
)

// Scorecard Component (moved outside to prevent recreation)
const Scorecard = ({
  players, 
  scores, 
  updateScore, 
  calculateUpperTotal,
  calculateLowerTotal, 
  calculateGrandTotal,
  handleClearGame,
  handleScoreInput,
  handleScoreKeyPress,
  getPointsNeededForBonus,
  hasEarnedBonus
}) => (
  <div style={{ padding: '8px' }}>
    <div style={{ overflowX: 'auto', marginBottom: 20 }}>
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        border: '2px solid #ddd',
        fontSize: '16px'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#34495e', color: 'white' }}>
            <th style={{ 
              padding: '8px 4px', 
              textAlign: 'center', 
              border: '1px solid #ddd',
              minWidth: 150
            }}></th>
            {players.map(player => (
              <th key={player} style={{ 
                padding: '8px 4px', 
                textAlign: 'center', 
                border: '1px solid #ddd',
                minWidth: 60
              }}>
                {player}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Upper Section */}
          <tr style={{ backgroundColor: '#ecf0f1' }}>
            <td colSpan={players.length + 1} style={{ 
              padding: 4, 
              fontWeight: 'bold', 
              textAlign: 'center'
            }}>
              UPPER SECTION
            </td>
          </tr>
          {YAHTZEE_CATEGORIES.filter(cat => cat.section === 'upper').map(category => {
            const rowComplete = isRowComplete(players, scores, category.id)
            return (
            <tr key={category.id} style={{ 
              backgroundColor: rowComplete ? '#e8e8e8' : 'transparent',
              opacity: rowComplete ? 0.7 : 1 
            }}>
              <td style={{ 
                padding: '6px 4px', 
                border: '1px solid #ddd', 
                fontWeight: 'bold'
              }}>
                {category.name}
              </td>
              {players.map(player => (
                <td key={player} style={{ padding: 2, border: '1px solid #ddd', textAlign: 'center' }}>
                  <input
                    type="number"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    value={scores[player]?.[category.id] !== null ? scores[player][category.id] : ''}
                    onChange={(e) => updateScore(player, category.id, e.target.value)}
                    onKeyPress={handleScoreKeyPress}
                    onInput={handleScoreInput}
                    data-player={player}
                    data-category={category.id}
                    style={{
                      width: '100%',
                      maxWidth: '60px',
                      padding: 6,
                      border: '1px solid #ccc',
                      borderRadius: 4,
                      textAlign: 'center',
                      minHeight: 36,
                      boxSizing: 'border-box'
                    }}
                    min="0"
                    max="30"
                  />
                </td>
              ))}
            </tr>
          )})}
          
          {/* Upper Section Totals */}
          <tr style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold' }}>
            <td style={{ 
              padding: '6px 4px', 
              border: '1px solid #ddd'
            }}>➜ Upper Total</td>
            {players.map(player => {
              const earned = hasEarnedBonus(scores[player] || {})
              return (
                <td key={player} style={{ 
                  padding: '6px 4px', 
                  border: '1px solid #ddd', 
                  textAlign: 'center',
                  backgroundColor: earned ? '#d4edda' : '#f8f9fa',
                  color: earned ? '#155724' : 'inherit'
                }}>
                  {calculateUpperTotal(scores[player] || {})}
                </td>
              )
            })}
          </tr>
          
          {/* Points needed for bonus row */}
          <tr style={{ backgroundColor: '#fff3cd', fontSize: '13px', fontStyle: 'italic' }}>
            <td style={{ 
              padding: '4px', 
              border: '1px solid #ddd'
            }}>pts needed for bonus:</td>
            {players.map(player => {
              const pointsNeeded = getPointsNeededForBonus(scores[player] || {})
              const earned = hasEarnedBonus(scores[player] || {})
              return (
                <td key={player} style={{ 
                  padding: '4px', 
                  border: '1px solid #ddd', 
                  textAlign: 'center',
                  color: earned ? '#28a745' : pointsNeeded <= 10 ? '#fd7e14' : '#4a4e52ff'
                }}>
                  {earned ? '✓ Earned!' : pointsNeeded}
                </td>
              )
            })}
          </tr>

          {/* Lower Section */}
          <tr style={{ backgroundColor: '#ecf0f1' }}>
            <td colSpan={players.length + 1} style={{ 
              padding: 4, 
              fontWeight: 'bold', 
              textAlign: 'center'
            }}>
              LOWER SECTION
            </td>
          </tr>
          {YAHTZEE_CATEGORIES.filter(cat => cat.section === 'lower').map(category => {
            const rowComplete = isRowComplete(players, scores, category.id)
            return (
            <tr key={category.id} style={{ 
              backgroundColor: rowComplete ? '#e8e8e8' : 'transparent',
              opacity: rowComplete ? 0.7 : 1 
            }}>
              <td style={{ 
                padding: '6px 4px', 
                border: '1px solid #ddd', 
                fontWeight: 'bold'
              }}>
                {category.name}
              </td>
              {players.map(player => (
                <td key={player} style={{ padding: 2, border: '1px solid #ddd', textAlign: 'center' }}>
                  <input
                    type="number"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    value={scores[player]?.[category.id] !== null ? scores[player][category.id] : ''}
                    onChange={(e) => updateScore(player, category.id, e.target.value)}
                    onKeyPress={handleScoreKeyPress}
                    onInput={handleScoreInput}
                    data-player={player}
                    data-category={category.id}
                    style={{
                      width: '100%',
                      maxWidth: '60px',
                      padding: 6,
                      border: '1px solid #ccc',
                      borderRadius: 4,
                      textAlign: 'center',
                      minHeight: 36,
                      boxSizing: 'border-box'
                    }}
                    min="0"
                    max="150"
                  />
                </td>
              ))}
            </tr>
          )})}

          {/* Lower Section Total */}
          <tr style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold' }}>
            <td style={{ 
              padding: '6px 4px', 
              border: '1px solid #ddd'
            }}>➜ Lower Total</td>
            {players.map(player => (
              <td key={player} style={{ 
                padding: '6px 4px', 
                border: '1px solid #ddd', 
                textAlign: 'center'
              }}>
                {calculateLowerTotal(scores[player] || {})}
              </td>
            ))}
          </tr>

          {/* Grand Total */}
          <tr style={{ backgroundColor: '#2c3e50', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
            <td style={{ 
              padding: '8px 4px', 
              border: '1px solid #ddd'
            }}>GRAND TOTAL</td>
            {players.map(player => (
              <td key={player} style={{ 
                padding: '8px 4px', 
                border: '1px solid #ddd', 
                textAlign: 'center'
              }}>
                {calculateGrandTotal(scores[player] || {})}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>

    {/* Clear Game Button */}
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <button
        onClick={handleClearGame}
        style={{
          padding: '10px 20px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer',
          fontSize: 14,
          minHeight: 44
        }}
      >
        Clear Game & Start Over
      </button>
    </div>
  </div>
)

export default function App() {
  const [gameState, setGameState] = useState('setup') // 'setup' or 'playing'
  const [roomName, setRoomName] = useState('Dice Guy By Trogan')
  const [playerName, setPlayerName] = useState('')
  const [players, setPlayers] = useState([])
  const [scores, setScores] = useState({})

  // Load game state from localStorage on component mount
  useEffect(() => {
    const savedGameState = localStorage.getItem('yahtzee-game-state')
    const savedPlayers = localStorage.getItem('yahtzee-players')
    const savedScores = localStorage.getItem('yahtzee-scores')
    const savedRoomName = localStorage.getItem('yahtzee-room-name')

    if (savedGameState) setGameState(savedGameState)
    if (savedPlayers) setPlayers(JSON.parse(savedPlayers))
    if (savedScores) setScores(JSON.parse(savedScores))
    if (savedRoomName) setRoomName(savedRoomName)
  }, [])

  // Save to localStorage whenever game state changes
  useEffect(() => {
    localStorage.setItem('yahtzee-game-state', gameState)
    localStorage.setItem('yahtzee-players', JSON.stringify(players))
    localStorage.setItem('yahtzee-scores', JSON.stringify(scores))
    localStorage.setItem('yahtzee-room-name', roomName)
  }, [gameState, players, scores, roomName])

  // Initialize scores for players and categories
  const initializeScores = (playerList) => {
    const newScores = {}
    playerList.forEach(player => {
      newScores[player] = {}
      YAHTZEE_CATEGORIES.forEach(category => {
        newScores[player][category.id] = null
      })
    })
    return newScores
  }

  // Calculate upper section total for a player
  const calculateUpperTotal = useCallback((playerScores) => {
    const upperCategories = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes']
    return upperCategories.reduce((sum, category) => {
      return sum + (playerScores[category] || 0)
    }, 0)
  }, [])

  // Calculate upper section bonus (35 points if >= 63)
  const calculateUpperBonus = useCallback((playerScores) => {
    return calculateUpperTotal(playerScores) >= 63 ? 35 : 0
  }, [calculateUpperTotal])

  // Calculate how many points needed for upper bonus
  const getPointsNeededForBonus = useCallback((playerScores) => {
    const currentTotal = calculateUpperTotal(playerScores)
    return currentTotal >= 63 ? 0 : 63 - currentTotal
  }, [calculateUpperTotal])

  // Check if player has earned the bonus
  const hasEarnedBonus = useCallback((playerScores) => {
    return calculateUpperTotal(playerScores) >= 63
  }, [calculateUpperTotal])

  // Calculate lower section total for a player
  const calculateLowerTotal = useCallback((playerScores) => {
    const lowerCategories = ['threeOfKind', 'fourOfKind', 'fullHouse', 'smallStraight', 'largeStraight', 'yahtzee', 'chance']
    return lowerCategories.reduce((sum, category) => {
      return sum + (playerScores[category] || 0)
    }, 0)
  }, [])

  // Calculate grand total for a player
  const calculateGrandTotal = useCallback((playerScores) => {
    return calculateUpperTotal(playerScores) + calculateUpperBonus(playerScores) + calculateLowerTotal(playerScores)
  }, [calculateUpperTotal, calculateUpperBonus, calculateLowerTotal])

  // Add a new player
  const addPlayer = useCallback(() => {
    if (playerName.trim() && !players.includes(playerName.trim())) {
      const newPlayers = [...players, playerName.trim()]
      setPlayers(newPlayers)
      setPlayerName('')
    }
  }, [playerName, players])

  // Remove a player
  const removePlayer = useCallback((playerToRemove) => {
    const newPlayers = players.filter(player => player !== playerToRemove)
    setPlayers(newPlayers)
  }, [players])

  // Start the game
  const startGame = useCallback(() => {
    if (players.length > 0) {
      setScores(initializeScores(players))
      setGameState('playing')
    }
  }, [players])

  // Update a score with validation
  const updateScore = useCallback((player, category, value) => {
    // Allow empty string for clearing
    if (value === '') {
      setScores(prev => ({
        ...prev,
        [player]: {
          ...prev[player],
          [category]: null
        }
      }))
      return
    }

    // Validate input: only allow non-negative integers
    const numValue = parseInt(value, 10)
    if (isNaN(numValue) || numValue < 0) {
      return // Reject invalid input
    }

    // Set reasonable maximum limits based on category
    let maxValue = 150 // Default max for lower section
    if (['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'].includes(category)) {
      maxValue = 30 // Upper section max
    }
    
    if (numValue > maxValue) {
      return // Reject values that are too high
    }

    setScores(prev => {
      return {
        ...prev,
        [player]: {
          ...prev[player],
          [category]: numValue
        }
      }
    })
  }, [])

  // Handle key press to prevent invalid characters
  const handleScoreKeyPress = useCallback((e) => {
    // Allow: backspace, delete, tab, escape, enter, arrow keys
    if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab' || 
        e.key === 'Escape' || e.key === 'Enter' || e.key === 'ArrowLeft' || 
        e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      return
    }
    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
    if (e.ctrlKey && (e.key === 'a' || e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'z')) {
      return
    }
    // Only allow digits 0-9
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault()
    }
  }, [])

  // Handle input validation for pasted content and other edge cases
  const handleScoreInput = useCallback((e) => {
    // Remove any non-numeric characters except for empty string
    const value = e.target.value.replace(/[^0-9]/g, '')
    if (value !== e.target.value) {
      e.target.value = value
      // Trigger onChange with cleaned value
      const player = e.target.getAttribute('data-player')
      const category = e.target.getAttribute('data-category')
      if (player && category) {
        updateScore(player, category, value)
      }
    }
  }, [updateScore])

  // Event handlers
  const handlePlayerNameChange = useCallback((e) => {
    setPlayerName(e.target.value)
  }, [])

  const handlePlayerNameKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      addPlayer()
    }
  }, [addPlayer])

  // Clear game handler
  const handleClearGame = useCallback(() => {
    if (confirm('Are you sure you want to clear all data and start over?')) {
      localStorage.clear()
      setGameState('setup')
      setPlayers([])
      setScores({})
      setRoomName('Dice Guy By Trogan')
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <style>
        {`
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}
      </style>
      {gameState === 'setup' ? (
        <SetupScreen 
          roomName={roomName}
          playerName={playerName}
          handlePlayerNameChange={handlePlayerNameChange}
          handlePlayerNameKeyPress={handlePlayerNameKeyPress}
          addPlayer={addPlayer}
          players={players}
          removePlayer={removePlayer}
          startGame={startGame}
        />
      ) : (
        <Scorecard 
          players={players}
          scores={scores}
          updateScore={updateScore}
          calculateUpperTotal={calculateUpperTotal}
          calculateLowerTotal={calculateLowerTotal}
          calculateGrandTotal={calculateGrandTotal}
          handleClearGame={handleClearGame}
          handleScoreInput={handleScoreInput}
          handleScoreKeyPress={handleScoreKeyPress}
          getPointsNeededForBonus={getPointsNeededForBonus}
          hasEarnedBonus={hasEarnedBonus}
        />
      )}
    </div>
  )
}