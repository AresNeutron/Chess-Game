import { createContext, useContext, useEffect, useState } from "react";
import boardArray from "../helpers/boardArray";
import {
  CheckState,
  ContextInterface,
  DataObject,
  LastMove,
  PieceInterface,
} from "../helpers/interfaces";
import fetchPieces from "../endpoints/fetchData";
import lightSquares from "../stateFunctions/lightSquares";
import updateBoard from "../stateFunctions/updateBoard";
import handleMove from "../stateFunctions/handleMove";
import updateMoves from "../endpoints/updateMoves";
import handleAttack from "../stateFunctions/handleAttack";
import lookForCheck from "../stateFunctions/lookForCheck";

const ChessContext = createContext<ContextInterface | undefined>(undefined);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPromoting, setIsPromoting] = useState<boolean>(false);
  const [whitesTurn, setWhitesTurn] = useState<boolean>(true);
  const [data, setData] = useState<DataObject>({} as DataObject);
  const [board, setBoard] = useState<string[][]>(boardArray);
  const [lighted, setLighted] = useState<string[][]>(boardArray);
  const [selectedPiece, setSelectedPiece] = useState<string>("");
  const [check, setCheck] = useState<CheckState>({
    isCheck: false,
    king: "",
    attacking: "",
  });
  const [lastMove, setLastMove] = useState<LastMove>({
    piece: "",
    prevPos: "",
    newPos: "",
    isPromoting: false,
  });

  const handleLightState = (piece: PieceInterface, lastMove: LastMove) => {
    const newLighted = lightSquares(piece, board, data, check, lastMove);
    setLighted(newLighted);
  };

  const handleMoveState = async (
    pieceName: string,
    targetPos: string,
    data: DataObject
  ) => {
    const { data: newData, lastMove: newLastMove } = await handleMove(
      pieceName,
      data,
      targetPos
    );
    if(newLastMove.isPromoting) setIsPromoting(true)

    const updatedBoard = updateBoard(newData);
    await updateMoves(newData, updatedBoard);

    initializeData();
    setLighted(boardArray);
    setSelectedPiece("");
    setLastMove(newLastMove);
    setWhitesTurn(!whitesTurn);
  };

  const handleAttackState = async (
    attackingName: string,
    capturedName: string
  ) => {
    const targetPos = data[capturedName].position;
    const dataWithoutCaptured = await handleAttack(capturedName, data);
    await handleMoveState(attackingName, targetPos, dataWithoutCaptured);
  };

  const initializeData = async () => {
    const pieces = await fetchPieces();
    setData(pieces);
    const newBoard = updateBoard(pieces);
    setBoard(newBoard);
  };

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    const currentCheck = lookForCheck(whitesTurn, board, data);
    setCheck(currentCheck);
    if (currentCheck.isCheck) {
      console.log(currentCheck);
      if (check.isMate) {
        alert("Game Over");
      }
    }
  }, [board, data, whitesTurn]);

  return (
    <ChessContext.Provider
      value={{
        whitesTurn,
        data,
        setData,
        isPromoting,
        setIsPromoting,
        setBoard,
        lighted,
        handleLightState,
        selectedPiece,
        setSelectedPiece,
        handleMoveState,
        handleAttackState,
        check,
        lastMove,
        setLastMove,
        initializeData
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};

export default ContextProvider;

export const useChessContext = () => {
  const context = useContext<ContextInterface | undefined>(ChessContext);
  if (!context) {
    throw new Error("Must be used within a AppContext Provider");
  }
  return context;
};
