import convertPosition from "../functions/convertPosition";
import boardArray from "../helpers/boardArray";
import { DataObject } from "../helpers/interfaces";

const updateBoard = (data: DataObject):string[][] =>{
    const names = Object.keys(data)
    const coordinates = Object.values(data).map((piece)=> convertPosition(piece.position))

    const newBoard = boardArray.map((row) => [...row]);

    names.forEach((name,index)=>{
        const {x,y} = coordinates[index]
        newBoard[y][x] = name
    })

    return newBoard
}

export default updateBoard