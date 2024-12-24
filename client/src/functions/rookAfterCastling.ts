// Type definition for the return object
type CastlingPosition = {
    // yPos: number;
    // xPos: number;
    position: string;
    rook: string;
  };
  
  const rookAfterCastling = (position: string): CastlingPosition => {
    // This returns the position of the rook after castling
    if (position == 'B1') return { position: "C1", rook: "white-rook-1" };
    if (position == 'G1') return { position: "F1", rook: "white-rook-2" };
  
    if (position == 'B8') return { position: "C8", rook: "black-rook-1" };
    if (position == 'G8') return { position: "F8", rook: "black-rook-2" };
  
    return { position: 'C1', rook: "white-rook-1" }; // This may cause some errors
  };
  
  export default rookAfterCastling;
  