import isSquareUnderAttack from "../functions/isSquareUnderAttack";
import { DataObject, PieceInterface } from "../helpers/interfaces";

//Later we'll update this to prevent other threats movements for the king
const getAvailableCells = (piece: PieceInterface, data: DataObject): string[]=>{
    const { name, moves } = piece;

    // Then these coordinates show the cells the piece can move to and the one which protects
    let availableMoves: string[] = moves

    //For the king, filter the cells that are not protected by enemies
    if(name.includes('king')){
        const isWhite = name.includes('white')

        availableMoves = moves.filter((move)=> !isSquareUnderAttack(move, isWhite,data))
    }
    return availableMoves;
}

export default getAvailableCells