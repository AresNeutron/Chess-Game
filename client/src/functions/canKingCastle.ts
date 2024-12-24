import findPosition from "../helpers/findPosition";
import { CheckState, DataObject } from "../helpers/interfaces";
import isSquareUnderAttack from "./isSquareUnderAttack";

export const canCastleQueenSide = (
  kingName: string,
  board: string[][],
  data: DataObject,
  check: CheckState
) => {
  const kingPos = findPosition(kingName, board);
  const isWhite = kingName.includes("white");

  const canCastleQueenSide =
    !data[kingName].has_moved && // King hasn't moved
    !data[`${isWhite ? "white" : "black"}-rook-1`]?.has_moved && // King-side rook hasn't moved
    !board[kingPos.y][kingPos.x - 1] && // Square next to the king is empty
    !board[kingPos.y][kingPos.x - 2] && // Second square next to the king is empty
    !board[kingPos.y][kingPos.x - 3] && // Third square next to the king is empty
    !check.isCheck && // King is not in check
    !isSquareUnderAttack(isWhite ? "D1" : "D8", isWhite, data) && // Passing square not under attack
    !isSquareUnderAttack(isWhite ? "C1" : "C8", isWhite, data) && // Passing square not under attack
    !isSquareUnderAttack(isWhite ? "B1" : "B8", isWhite, data); // Destination not under attack

  return canCastleQueenSide;
};

export const canCastleKingSide = (
  kingName: string,
  board: string[][],
  data: DataObject,
  check: CheckState
) => {
  const kingPos = findPosition(kingName, board);
  const isWhite = kingName.includes("white");

  const canCastleKingSide =
    !data[kingName].has_moved && // King hasn't moved
    !data[`${isWhite ? "white" : "black"}-rook-2`]?.has_moved && // King-side rook hasn't moved
    !board[kingPos.y][kingPos.x + 1] && // Square next to the king is empty
    !board[kingPos.y][kingPos.x + 2] && // Second square next to the king is empty
    !check.isCheck && // King is not in check
    !isSquareUnderAttack(isWhite ? "F1" : "F8", isWhite, data) && // Passing square not under attack
    !isSquareUnderAttack(isWhite ? "G1" : "G8", isWhite, data); // Destination not under attack

  return canCastleKingSide;
};
