import boardArray from "../helpers/boardArray";
import {
  CheckState,
  DataObject,
  LastMove,
  PieceInterface,
} from "../helpers/interfaces";
import convertPosition from "../functions/convertPosition";
import getAvailableCells from "./getAvailableCells";
import findPosition from "../helpers/findPosition";
import findBlockPossibilities from "../functions/findBlockPossibilities";
import convertCoordinates from "../functions/convertCoordinates";
import {
  canCastleKingSide,
  canCastleQueenSide,
} from "../functions/canKingCastle";
import canEnPassant from "../functions/canEnPassant";

const lightSquares = (
  piece: PieceInterface,
  board: string[][],
  data: DataObject,
  check: CheckState,
  lastMove: LastMove
): string[][] => {
  const { name, position } = piece;

  const isWhite = name.includes("white");
  const pos = convertPosition(position);

  let availableMoves = getAvailableCells(piece, data);

  //If this color is in check, filter the moves to only those which are safe
  if (check.isCheck) {
    availableMoves = filterForCheck(check, availableMoves, board, isWhite);
  }

  //Convert to coordinates and filter the ally pieces' cells
  const availableCoordinates = availableMoves
    .map((move) => convertPosition(move))
    .filter(
      ({ x, y }) => !board[y][x].includes(`${isWhite ? "white" : "black"}`)
    );

  const newBoard = boardArray.map((row) => [...row]);

  newBoard[pos.y][pos.x] = "yellow";

  availableCoordinates.forEach(({ x, y }) => {
    const isEnemy: boolean = board[y][x].includes(
      `${isWhite ? "black" : "white"}`
    );
    newBoard[y][x] = isEnemy ? "red" : "blue";

    //For special movements: castling, promotion and en-passant
    if (name.includes("king")) {
      // Castling logic
      const canCastleInQueenSide = canCastleQueenSide(name, board, data, check);
      const canCastleInKingSide = canCastleKingSide(name, board, data, check);

      if (canCastleInKingSide) {
        newBoard[pos.y][pos.x + 2] = "violet"; // Mark king-side castling move
      }
      if (canCastleInQueenSide) {
        newBoard[pos.y][pos.x - 3] = "violet"; // Mark queen-side castling move
      }
    } else if (name.includes("pawn")) {
      //Conditions for Promotion
      const isWhitePromotion =
        isWhite &&
        availableCoordinates.some(({ x, y }) => y === 0 && x === pos.x);
      const isBlackPromotion =
        !isWhite &&
        availableCoordinates.some(({ x, y }) => y === 7 && x === pos.x);
      if (isWhitePromotion || isBlackPromotion) newBoard[y][pos.x] = "violet";

      //Conditions for en-passant
      const canCaptureEnPassant = canEnPassant(name, pos, lastMove);
      if (canCaptureEnPassant) {
        const direction = isWhite ? -1 : 1; // Direction of movement for the capturing pawn
        const { x: xEnemy } = convertPosition(lastMove.newPos); 
        newBoard[pos.y + direction][xEnemy] = 'red'
      }
    }
  });

  return newBoard;
};

export default lightSquares;

const filterForCheck = (
  check: CheckState,
  availableMoves: string[],
  board: string[][],
  isWhite: boolean
) => {
  if (
    (check.king.includes("white") && isWhite) ||
    (check.king.includes("black") && !isWhite)
  ) {
    const attackPos = convertCoordinates(findPosition(check.attacking, board));
    const kingPos = convertCoordinates(findPosition(check.king, board));

    const blockPosSet = new Set(
      findBlockPossibilities(attackPos, kingPos).map((coordinate) =>
        convertCoordinates(coordinate)
      )
    );
    return availableMoves.filter(
      (move) => move == attackPos || blockPosSet.has(move)
    );
  } else return availableMoves;
};
