const capturePiece = async (id: number) => {
    try {
      if(!id.toString()){
        alert("Fail in the capturePiece function .ID is null or undefined")
        return 
      }
      const res = await fetch(`http://127.0.0.1:8000/delete/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) {
        console.error("Error in the move function");
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  export default capturePiece;
  