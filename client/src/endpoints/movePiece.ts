const movePiece = async (id: number, position: string) => {
  try {
    if(!id.toString()){
      alert("Fail in the movePiece function .ID is null or undefined")
      return 
    }
    const res = await fetch(`http://127.0.0.1:8000/move/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ "position": position }),
    });
    if (!res.ok) {
      console.error("Error in the move function");
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export default movePiece;
