// import "./info.css";
import "./App.css";
import Board from "./components/Board";
import { useChessContext } from "./context/ChessContext";
import resetGame from "./endpoints/resetGame";
import Promote from "./components/Promote";

function App() {
  const handleReset = async () => {
    if (window.confirm("Are you sure you want to reset the game?")) {
      await resetGame();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const { whitesTurn, check, lastMove, isPromoting} = useChessContext();
  const isWhitePromotion = lastMove.piece.includes('white')

  return (
    <div className="App">
      <div className="info">
        <h1>Welcome to my awesome Chess Titans Clone</h1>
        <div>
          {check.isMate ? (
            <h2>
              {check.king.includes("white") ? "Black Wins" : "White Wins"}
            </h2>
          ) : (
            <h2>{whitesTurn ? "White" : "Black"}'s Turn</h2>
          )}
          
          <button className="resetButton" onClick={handleReset}>
            Restart
          </button>
        </div>
      </div>
      {isPromoting && <Promote isWhite={isWhitePromotion}/>}
      <Board />
    </div>
  );
}

export default App;
