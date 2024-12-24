import { useEffect, useState } from "react";
import { useChessContext } from "../context/ChessContext";
import { pieceImages } from "../helpers/dataReferences";
import { DataObject, windowSize } from "../helpers/interfaces";
import promotePawn from "../endpoints/promotePawn";
import updateBoard from "../stateFunctions/updateBoard";
import updateMoves from "../endpoints/updateMoves";

interface Props {
  isWhite: boolean;
}

function Promote({ isWhite }: Props) {
  const { data, lastMove, setLastMove, initializeData, setIsPromoting } = useChessContext();

  const imagesObject = Object.fromEntries(
    Object.entries(pieceImages).filter(
      ([key]) =>
        key.startsWith(`${isWhite ? "white" : "black"}`) &&
        !key.includes("pawn") &&
        !key.includes("king")
    )
  );

  // Track window dimensions for dynamic resizing
  const [windowSize, setWindowSize] = useState<windowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const promoteWidth = 400;
  const xPos = Math.round((windowSize.width - promoteWidth) / 2);
  const yPos = Math.round(windowSize.height / 2);

  const handlePromotion = async (promotion: string) => {
    //find the pieces of same type, and then the highest identificator
    const sameTypePieces = Object.keys(data).filter((name) =>
      name.includes(promotion)
    );
    const idOfPieces = sameTypePieces.map((name) =>
      parseInt(name.split("-")[2])
    );
    const highestId = Math.max(...idOfPieces);

    const newPieceName = [
      ...promotion.split("-"),
      (highestId + 1).toString(),
    ].join("-");

    // Promote the pawn in the backend
    const idPawn = data[lastMove.piece]?.id;
    if (idPawn) await promotePawn(idPawn, newPieceName);

    setLastMove({ ...lastMove, piece: newPieceName });

     // Create a new data object with the updated piece
     const newData: DataObject = Object.entries(data).reduce(
      (acc, [key, value]) => {
        if (key === lastMove.piece) {
          acc[newPieceName] = value; // Add the new piece with the same data
        } else {
          acc[key] = value; // Copy the remaining pieces as-is
        }
        return acc;
      },
      {} as DataObject
    );

    const newBoard = updateBoard(newData);
    setIsPromoting(false)
    await updateMoves(newData, newBoard);
    initializeData()
  };

  return (
    <div
      style={{ top: `${yPos}px`, left: `${xPos}px` }}
      className="promotionContainer"
    >
      <h3 className="promotionInfo">Choose a promotion:</h3>
      <div>
        {Object.keys(imagesObject).map((image, index) => (
          <div
            key={index}
            className="promotionPiece"
            onClick={() => {
              handlePromotion(image);
            }}
          >
            <img src={imagesObject[image]} alt={image} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Promote;
