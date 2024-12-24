import convertCoordinates from "../functions/convertCoordinates";
import findPosition from "../helpers/findPosition";
import { CheckState, DataObject } from "../helpers/interfaces";
import lookForCheckMate from "./lookForCheckMate";

const lookForCheck = (
  isWhite: boolean,
  board: string[][],
  data: DataObject
): CheckState => {
  //Find the king's coordinates and convert them to position string
  const kingCoordinates = findPosition(
    `${isWhite ? "white" : "black"}-king-1`,
    board
  );
  const kingPos = convertCoordinates(kingCoordinates)
  const kingName = board[kingCoordinates.y][kingCoordinates.x]

  //Extracts from the data the enemy pieces only
  const enemyPiecesData = Object.fromEntries(
    Object.entries(data).filter(([key]) =>
      key.startsWith(`${isWhite ? "black" : "white"}`)
    )
  );

  const enemyPiecesMatrix =
    Object.values(enemyPiecesData)

  for(const piece of enemyPiecesMatrix){
    for(const move of piece.moves){
      if(move == kingPos){
        alert(`CHECK`);
        const check = { isCheck: true, king: kingName, attacking: piece.name }
        const isCheckMate = lookForCheckMate(check, data,board)
        return isCheckMate ? {...check, isMate: true} : check
      }
    }
  }

  return { isCheck: false, king: "", attacking: "" };
};

export default lookForCheck;
