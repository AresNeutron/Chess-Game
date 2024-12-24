export interface PieceInterface {
  id?: number;
  name: string;
  position: string;
  has_moved: boolean;
  moves: string[];
}

export interface ContextInterface {
  whitesTurn: boolean;
  data: DataObject;
  isPromoting: boolean;
  setIsPromoting: React.Dispatch<React.SetStateAction<boolean>>;
  lastMove: LastMove;
  setLastMove: React.Dispatch<React.SetStateAction<LastMove>>;
  setData: React.Dispatch<React.SetStateAction<DataObject>>;
  // board: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
  lighted: string[][];
  // setLighted: React.Dispatch<React.SetStateAction<string[][]>>;
  handleLightState: (piece: PieceInterface, lastMove: LastMove)=>void;
  selectedPiece: string;
  setSelectedPiece: React.Dispatch<React.SetStateAction<string>>;
  handleMoveState: (pieceName: string, targetPos: string, data: DataObject) => void;
  handleAttackState: (attackingName: string, capturedName: string) => void;
  check:CheckState;
  initializeData: ()=>void
}

export interface CheckState {
  isCheck: boolean;
  king: string;
  attacking: string;
  isMate? :boolean;
}

export type DataObject = {
    [key in string]: PieceInterface;
  };
  
export interface windowSize{
  width: number;
  height: number;
}

export interface LastMove{
  piece: string;
  prevPos: string;
  newPos: string;
  isPromoting: boolean;
}

export type MoveData={
  data: DataObject;
  lastMove: LastMove;
}