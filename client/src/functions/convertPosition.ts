export type Position = { y: number; x: number };

const convertPosition = (position: string)=>{
    const letters = ['A','B','C','D','E','F','G','H']
    const xPos = letters.indexOf(position[0]);

    // Check if xPos is valid
    if (xPos === -1) {
        throw new Error(`Invalid column letter: ${position[0]}`);
    }

    //Convert to number, and reverse the axis
    const yPos = 8 - parseInt(position[1], 10); // Reverse axis from chess notation
    const piecePosition: Position = {x: xPos, y: yPos}
    return piecePosition
}

export default convertPosition