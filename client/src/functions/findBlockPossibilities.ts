import convertPosition, { Position } from "./convertPosition";

const findBlockPossibilities = (attackPosition: string, kingPosition: string) => {
  //First, convert both positions to Position Objects
  const attackingPos: Position = convertPosition(attackPosition);
  const kingPos: Position = convertPosition(kingPosition);

  const blockPossibilities: Position[] = [];
  //if they are in the same column, attack is vertical
  if (attackingPos.x === kingPos.x) {
    const highestPos = Math.max(attackingPos.y, kingPos.y);
    const lowestPos = Math.min(attackingPos.y, kingPos.y);

    //fill the escape array, not including the two pieces' positions
    for (let i = lowestPos + 1; i < highestPos; i++) {
      blockPossibilities.push({ x: attackingPos.x, y: i });
    }
    return blockPossibilities;
  } else if (attackingPos.y === kingPos.y) {
    const highestPos = Math.max(attackingPos.x, kingPos.x);
    const lowestPos = Math.min(attackingPos.x, kingPos.x);

    //fill the escape array, not including the two pieces' positions
    for (let i = lowestPos + 1; i < highestPos; i++) {
      blockPossibilities.push({ x: i, y: attackingPos.y });
    }
    return blockPossibilities;
  } // Check if they are on the same diagonal (diagonal attack)
  else if (
    Math.abs(attackingPos.x - kingPos.x) ===
    Math.abs(attackingPos.y - kingPos.y)
  ) {
    const xDirection = Math.sign(kingPos.x - attackingPos.x); // +1 or -1
    const yDirection = Math.sign(kingPos.y - attackingPos.y); // +1 or -1

    let currentX = attackingPos.x + xDirection;
    let currentY = attackingPos.y + yDirection;

    // Iterate diagonally until reaching the king
    while (currentX !== kingPos.x && currentY !== kingPos.y) {
      blockPossibilities.push({ x: currentX, y: currentY });
      currentX += xDirection;
      currentY += yDirection;
    }

    return blockPossibilities;
  }
  
  return blockPossibilities
};

export default findBlockPossibilities;
