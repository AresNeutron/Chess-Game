import { useChessContext } from "../context/ChessContext";
import convertCoordinates from "../functions/convertCoordinates";
import boardArray from "../helpers/boardArray";
import Pieces from "./Pieces";
import Square from "./Square";

function Board() {
  const { lighted } = useChessContext();

  return (
    <div className="board">
      {/*Adding the 64 squares. Since this won't change we can use boardArray */}
      {boardArray.flatMap((row, rowIndex) => {
        return row.map((col, colIndex) => {
          const isBlack = (rowIndex + colIndex) % 2 === 1; // Alternate color
          const isBlue: boolean = lighted[rowIndex][colIndex] === "blue";
          const isRed: boolean = lighted[rowIndex][colIndex] === "red";
          const isYellow: boolean = lighted[rowIndex][colIndex] === "yellow";
          const isViolet: boolean = lighted[rowIndex][colIndex] === "violet";
          return (
            <div
              key={8 * rowIndex + colIndex}
              className="boardCell"
              style={{
                backgroundColor: isBlack ? "#7b4b24" : "#e5c28a", // Chessboard colors
              }}
            >
              {col}
              {lighted[rowIndex][colIndex] && (
                <Square
                  position = {convertCoordinates({y: rowIndex, x:colIndex})}
                  blue={isBlue}
                  yellow={isYellow}
                  red={isRed}
                  violet={isViolet}
                />
              )}
            </div>
          );
        });
      })}
      <Pieces/>
    </div>
  );
}

export default Board;
