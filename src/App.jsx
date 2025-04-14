import './App.css';
import { useState } from 'react';
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";
import { TURNS } from './constants.js';
import { WinnerModal } from './components/WinnerModal.jsx';
import { checkWinner, checkEndGame } from './logic/board.js';
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js';

function App() {
  // Estado del tablero
  const [board, setBoard] = useState(() => {
    // Obtenemos el tablero del localStorage
    // Si no existe, creamos un tablero nuevo
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });

  // Estado del turno
  const [turn, setTurn] = useState(() => {
    // Obtenemos el turno del localStorage
    // Si no existe, el turno inicial es X
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });

  // Estado del ganador (null = no hay ganador, false = empate, true = hay ganador)
  const [winner, setWinner] = useState(null);
  
  // Estado de la combinación ganadora
  const [winningCombo, setWinningCombo] = useState(null);

  // Función para reiniciar el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    setWinningCombo(null);
    resetGameStorage(); // Limpiamos el localStorage
  };

  // Función para actualizar el tablero
  const updateBoard = (index) => {
    // No permitir movimientos si la casilla está ocupada o hay un ganador
    if (board[index] || winner) return;

    // Actualizamos el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Cambiamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Guardamos en localStorage
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    });

    // Verificamos si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinningCombo(newWinner.winningCombo);
      setTimeout(() => {
        setWinner(newWinner.winner);
        confetti(); // Efecto de confeti al ganar
      }, 1000);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // Empate
    }
  };

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar juego</button>
      
      <section className='game'>
        {board.map((square, index) => (
          <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            isWinner={winningCombo?.includes(index)}
          >
            {square}
          </Square>
        ))}
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;