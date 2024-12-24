import { useChessContext } from "../context/ChessContext";
import rookAfterCastling from "../functions/rookAfterCastling";
import { DataObject } from "../helpers/interfaces";
import handleAttack from "../stateFunctions/handleAttack";

interface PropsInterface {
  position: string;
  blue?: boolean;
  yellow?: boolean;
  red?: boolean;
  violet?: boolean;
}

//This component only renders if its position is lighted
function Square({
  position,
  blue = false,
  yellow = false,
  red = false,
  violet = false,
}: PropsInterface) {
  const { selectedPiece, handleMoveState, data, lastMove } = useChessContext();

  const handleClick = async (
    piece: string,
    position: string,
    data: DataObject,
    violet: boolean
  ) => {
    if (violet == true && piece.includes("king")) {
      //handle castling movement
      const rookPiece = rookAfterCastling(position);
      const { position: rookPos, rook: rookName } = rookPiece;

      //handles the movement for rook during castling
      handleMoveState(rookName, rookPos, data);
      handleMoveState(piece, position, data);

    } else if (piece.includes("pawn") && red == true) {
      //handle the movement for en-passant
      const enemyPawn = lastMove.piece;
      const dataWithoutCaptured = await handleAttack(enemyPawn, data);
      handleMoveState(piece, position, dataWithoutCaptured);
      
    } else {
      handleMoveState(piece, position, data);
    }
  };

  return (
    <div
      onClick={() => {
        handleClick(selectedPiece, position, data, violet);
      }}
      className={`square ${blue && "blue"} ${violet && "violet"} ${
        red && "red"
      } ${yellow && "yellow"}`}
    ></div>
  );
}

export default Square;
