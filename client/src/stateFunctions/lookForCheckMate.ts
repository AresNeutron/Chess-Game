import convertCoordinates from "../functions/convertCoordinates";
import convertPosition from "../functions/convertPosition";
import findBlockPossibilities from "../functions/findBlockPossibilities";
import findPosition from "../helpers/findPosition";
import { CheckState, DataObject } from "../helpers/interfaces";
import getAvailableCells from "./getAvailableCells";

const lookForCheckMate = (
  check: CheckState,
  data: DataObject,
  board: string[][]
) => {
  const { king, attacking } = check;
  const isWhite = king.includes("white");

  // Validate inputs
  if (!king || !attacking || !data[king] || !data[attacking]) {
    console.warn("Invalid check state or data provided.");
    return { checkMate: false };
  }

  // Step 1: Check if the king can move to a safe cell
  const kingMoves = getAvailableCells(data[king], data).filter((move) => {
    const { x, y } = convertPosition(move);
    return !board[y][x].includes(`${isWhite ? "white" : "black"}`); // Exclude cells occupied by allies
  });

  // Step 2: Check if an ally can capture the attacking piece
  const allyPiecesData = Object.fromEntries(
    Object.entries(data).filter(([key]) =>
      key.startsWith(`${isWhite ? "white" : "black"}`)
    )
  );

  const allyMoves = new Set(
    Object.values(allyPiecesData)
      .filter((piece) => !piece.name.includes("king")) // Exclude kings
      .flatMap((piece) => piece.moves) // Map moves
  );

  //Now there is an issue here
  const canCaptureAttacker = allyMoves.has(data[attacking].position);

  // Step 3: Check if an ally can block the attack
  const attackPos = convertCoordinates(findPosition(attacking, board));
  const kingPos = convertCoordinates(findPosition(king, board));
  const blockPossibilities = findBlockPossibilities(attackPos, kingPos);
  const blockPosArray = blockPossibilities.map((coordinate) =>
    convertCoordinates(coordinate)
  );

  const canBlockAttack = blockPosArray.some((pos) => allyMoves.has(pos));

  const conditionsForMate =
    !canCaptureAttacker && //Cannot capture attacking piece
    !canBlockAttack && //Cannot put an ally piece in between
    kingMoves.length == 0; //Cannot move the king to safe cell
  if (conditionsForMate) {
    alert("CHECK MATE!");
    return true;
  }
  return false;
};

export default lookForCheckMate;
