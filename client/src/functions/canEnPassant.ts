import { LastMove } from "../helpers/interfaces";
import convertPosition, { Position } from "./convertPosition";

const canEnPassant=(pawnName:string, pawnPosition: Position, lastMove: LastMove)=>{
    if (!lastMove.piece) return false;

    const isWhite = pawnName.includes('white')

    const { piece, prevPos, newPos } = lastMove;
      const { x: xEnemy } = convertPosition(newPos); //convert enemy position to coordinates

      const isLastMovedEnemyPawn = piece.includes(
        `${isWhite ? "black" : "white"}-pawn`
      ); //Check if the last enemy move was a pawn

      //Check if the pawn moved two cells from starting position
      const rightPrevPos = isWhite
        ? prevPos.includes("7")
        : prevPos.includes("2");
      const rightNewPos = isWhite ? newPos.includes("5") : newPos.includes("4");

      const enPassantRow = isWhite ? 3 : 4; // Row where en passant can occur
      
      const isPawnInRightRow = pawnPosition.y == enPassantRow;
      const isPawnInRightCol = Math.abs(pawnPosition.x - xEnemy) === 1;

      const conditionForEnPassant =
        isLastMovedEnemyPawn &&
        rightNewPos &&
        rightPrevPos &&
        isPawnInRightCol &&
        isPawnInRightRow;

    return conditionForEnPassant
}

export default canEnPassant