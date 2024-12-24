import { DataObject, PieceInterface } from "../helpers/interfaces";

const fetchPieces = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/get-pieces/");
      if (!res.ok) {
        console.error("Fetch Function failed");
        return {};
      }

      const response = await res.json();
      const data: PieceInterface[] = response;
      const newData: DataObject = {};

      if (!Array.isArray(data)) {
        console.error("Unexpected data format");
        return {};
      }

      //this can throw an error
      for (let i = 0; i < 32; i++) {
        const piece = data[i];
        if (piece) {
          newData[piece?.name] = {
            id: piece.id,
            name: piece.name,
            position: piece.position,
            has_moved: piece.has_moved,
            moves: piece.moves,
          };
        }
      }

      return newData;
    } catch (err) {
      console.error(err);
      return {};
    }
  };

export default fetchPieces