import { Position } from "./convertPosition";

const convertCoordinates = (coordinate: Position)=>{
    const letters = ['A','B','C','D','E','F','G','H']
    
    if (coordinate.x < 0 || coordinate.x > 7 || coordinate.y < 0 || coordinate.y > 7) {
        throw new Error(`Invalid coordinates: x=${coordinate.x}, y=${coordinate.y}`);
    }

    const column = letters[coordinate.x]
    const row = (8 - coordinate.y).toString(); // Reverse axis back to chess notation
    
    const position = `${column}${row}`
    return position
}

export default convertCoordinates