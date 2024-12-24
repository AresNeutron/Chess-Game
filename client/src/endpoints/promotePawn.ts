const promotePawn = async (id: number, newPiece: string) => {
    try {
      if(!id.toString()){
        alert("Fail in the promotePawn function .ID is null or undefined")
        return 
      }
      const res = await fetch(`http://127.0.0.1:8000/promote/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ "name": newPiece }),
      });
      if (!res.ok) {
        console.error("Error in the move function");
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  export default promotePawn;