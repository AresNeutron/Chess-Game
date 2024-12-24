import movePiece from "../endpoints/movePiece";
import { DataObject, LastMove, MoveData } from "../helpers/interfaces";

//this handles the movement and returns the updated data object
const handleMove = async (
  pieceName: string,
  data: DataObject,
  targetPos: string
): Promise<MoveData> => {
  const movingPiece = data[pieceName];
  const { id, name, position } = movingPiece;

  if (id?.toString()) {
    await movePiece(id, targetPos);
  } else {
    alert("ID is null or undefined");
    return { data: data, lastMove: { piece: "", prevPos: "", newPos: "", isPromoting: false } };
  }

  //Check for promotions
  const isWhitePromotion =
    name.includes("white") && position[0] == targetPos[0] && targetPos[1] == "8";
  const isBlackPromotion =
    name.includes("black") && position[0] == targetPos[0] && targetPos[1] == "1";

  const lastMove: LastMove = {
    piece: name,
    prevPos: position,
    newPos: targetPos,
    isPromoting: (isBlackPromotion || isWhitePromotion) ? true : false
  };

  const newData: DataObject = { ...data };
  newData[name] = {
    ...movingPiece,
    position: targetPos,
    has_moved: true,
  };

  return { data: newData, lastMove: lastMove };
};

export default handleMove;
