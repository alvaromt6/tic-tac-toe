import { WINNER_COMBOS } from "../constants"

export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return {
        winner: boardToCheck[a],
        winningCombo: combo
      }
    }
  }
  return null
}

export const checkEndGame = (newBoard) => {
  // si todas las casillas están ocupadas y no hay ganador, es empate
  return newBoard.every((square) => square !== null)
}
