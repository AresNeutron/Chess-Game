import { DataObject } from "../helpers/interfaces"

const updateMoves = async (data: DataObject, board: string[][])=>{
    try{
        const res = await fetch('http://127.0.0.1:8000/update-moves/', {
            method: "PUT",
            headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ "board": board, "data": data }),
        });
        if(!res.ok){
            console.log("Error in the updateMoves function")
            console.log(res)
            return
        }
    }catch(err){
        console.error(err)
    }
}

export default updateMoves