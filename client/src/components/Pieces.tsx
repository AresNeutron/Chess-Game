import { useChessContext } from "../context/ChessContext";
import convertPosition from "../functions/convertPosition";
import { clearString, pieceImages } from "../helpers/dataReferences";

function Pieces() {
  const {
    whitesTurn,
    data,
    lastMove,
    selectedPiece,
    setSelectedPiece,
    lighted,
    handleLightState,
    handleAttackState,
  } = useChessContext();
  const imageWidth = 64; //width set to the images

  return (
    <div className="pieceContainer">
      <div className='innerPieceContainer'>
        {/* Adding the pieces*/}
        {Object.values(data).map((piece) => {
          const isWhite = piece.name.includes("white");
          const coordinates = convertPosition(piece.position);
          const { x, y } = coordinates;

          //Nothing to correct here, this is working fine
          const captureConditions = [
            lighted[y][x] == "red",
            selectedPiece,
            isWhite
              ? selectedPiece.includes("black")
              : selectedPiece.includes("white"),
          ];
          const captureAllowed = captureConditions.every((con) => con);

          const image = clearString(piece.name);
          return (
            <div
              onClick={() => {
                if (captureAllowed) {
                  handleAttackState(selectedPiece, piece.name);
                } else {
                  if ((whitesTurn && isWhite) || (!whitesTurn && !isWhite)) {
                    handleLightState(piece, lastMove);
                    setSelectedPiece(piece.name);
                  } else {
                    // Optionally, provide feedback for invalid selection
                    alert("It's not your turn!");
                  }
                }
              }}
              key={piece.id}
              className="piece"
              style={{
                top: `${y * (imageWidth - 1)}px`,
                left: `${x * imageWidth - 1}px`,
              }}
            >
              <img src={pieceImages[image]} alt={`${piece.name}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Pieces;
