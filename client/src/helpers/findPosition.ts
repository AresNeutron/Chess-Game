import { Position } from "../functions/convertPosition"

const findPosition = (pieceName: string, board: string[][]): Position=>{
    for(let rowIndex = 0; rowIndex< 8; rowIndex++){
        for(let colIndex = 0; colIndex < 8; colIndex++){
            if(board[rowIndex][colIndex] == pieceName){
                return {y: rowIndex, x: colIndex}
            }
        }
    }
    return {y: 0, x: 0}
}

export default findPosition