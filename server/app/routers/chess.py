from ..models import ChessPiece
from ..schemas import ChessPieceSchema
from fastapi import APIRouter, HTTPException, Request
from tortoise.exceptions import IntegrityError
from typing import List, Dict
from ..services.scripts.script import fill_database
from tortoise.exceptions import DoesNotExist
from ..services.functions.get_moves import get_moves
import asyncio

# This is like creating a route in express
router = APIRouter()

@router.get("/get-pieces/", response_model=List[ChessPieceSchema])
async def get_pieces():
    try:
        # Fetch all chess pieces from the database
        pieces = await ChessPiece.all()
        return pieces
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

@router.post("/create/", response_model=ChessPieceSchema)
async def create_piece(piece: ChessPieceSchema):
    try:
        new_piece = await ChessPiece.create(**piece.model_dump())
        return new_piece
    except IntegrityError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/reset/", response_model=dict)
async def reset_game():
    try:
        await ChessPiece.all().delete()
        # Step 2: Refill the database
        await fill_database()
        return {"message": "Game reset successfully"}
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

@router.delete("/delete/{id}")
async def delete_piece(id: int):
    try:
        deleted_piece = await ChessPiece.get(id=id)
        piece_name = deleted_piece.name
        await deleted_piece.delete()
        return {"deleted_piece_name": piece_name}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Piece not found")
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))
    
@router.put("/move/{id}")
async def move_piece(id: int, request: Request):
    try:
        body = await request.json()
        position = body.get("position")
        if not position:
            raise HTTPException(status_code=400, detail="Position is required")
        
        piece = await ChessPiece.get(id=id)
        piece.position = position
        await piece.save()
        return { "message": "Position Updated",
            "piece": {
                "name": piece.name,
                "position": piece.position,
                },
            }
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Piece not found")
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))

@router.put('/promote/{id}')
async def promote_pawn(id: int, request: Request):
    try:
        body = await request.json()
        new_piece_name = body.get('name')
        if not new_piece_name:
            raise HTTPException(status_code=400, detail="Promotion Name is required")

        pawn = await ChessPiece.get(id=id)
        pawn.name = new_piece_name
        await pawn.save()

        return {"message":"Promotion successful", "piece": pawn}
    
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Piece not found")
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))
    
@router.put("/update-moves")
async def update_moves(request: Request):
    try:
        body: Dict   = await request.json()
        board = body.get("board")
        data: Dict = body.get("data")

        if not board or not data:
            raise HTTPException(status_code=400, detail="Data and Board are required")

        # Helper function to calculate and update moves for each piece
        async def calc_moves(piece: Dict):
            piece_id, name, position = piece.get('id'), piece.get('name'), piece.get('position')

            if not piece_id:
                raise ValueError(f"Piece with name {name} has an invalid ID")
            
            new_moves = get_moves(name, position, board)

            # Update piece in database
            piece_in_database = await ChessPiece.get(id=piece_id)
            piece_in_database.moves = new_moves
            await piece_in_database.save()

        # Create and run async tasks for all pieces
        tasks = [asyncio.create_task(calc_moves(piece)) for piece in data.values()]
        await asyncio.gather(*tasks)

        return {"message": "All moves updated"}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="One or more pieces not found")
    except ValueError as err:
        raise HTTPException(status_code=400, detail=str(err))
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))