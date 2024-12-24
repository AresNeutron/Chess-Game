import capturePiece from "../endpoints/capturePiece";
import { DataObject, PieceInterface } from "../helpers/interfaces";

const handleAttack = async (capturedName: string, data: DataObject): Promise<DataObject>=>{
    const capturedPiece: PieceInterface = data[capturedName]
    const {id, name } = capturedPiece

    if (id) {
        await capturePiece(id);
      } else {
        alert("ID is null or undefined");
        return data;
      }
    
    //Creating a copy of data without the captured piece, this can guide to an error
    const newData: DataObject = {}

    for(const piece of Object.values(data)){
        if(piece.name == name) continue
        newData[piece.name] = {...piece}
    }

    return newData
}

export default handleAttack