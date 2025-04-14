import { Square } from "./Square";

// Le pasamos `winner` y `resetGame` como props:
// - `winner` es el ganador (o `false` si hay empate).
// - `resetGame` es la función que reinicia el juego.
export function WinnerModal({ winner, resetGame }) {
    if (winner == null) return null; // Si no hay ganador, no se muestra nada.

    const winnerText = winner === false ? 'Empate' : 'Ganó:'; // Si `winner` es `false`, es empate; si no, muestra el ganador.

    return (
        <section className='winner'>
            <div className='text'>
                <h2>{winnerText}</h2>

                <header className='win'>
                    {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                    <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
            </div>
        </section>
    );
}