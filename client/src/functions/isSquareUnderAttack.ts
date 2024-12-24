import { DataObject } from "../helpers/interfaces";

const isSquareUnderAttack = (
  position: string,
  isWhite: boolean,
  data: DataObject
) => {
    //Extracts from the data the enemy pieces only
    const enemyPiecesData = Object.fromEntries(
        Object.entries(data).filter(([key]) => key.startsWith(`${isWhite ? "black" : "white"}`))
      );
    
    //Convert the object to an array, and then to a set
    const enemyCells = new Set(
        Object.values(enemyPiecesData).flatMap((piece) => piece.moves)
      );
    
    return enemyCells.has(position)
};

export default isSquareUnderAttack