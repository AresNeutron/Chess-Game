import httpx
import asyncio
from ..data.inilitializing_data import (
    starting_board,
    white_starting_pos,
    black_starting_pos,
    black_pieces,
    white_pieces
)
from ..functions.get_moves import get_moves

async def add_piece_to_database(piece_data, client: httpx.AsyncClient):
    try:
        response = await client.post('http://127.0.0.1:8000/create/', json=piece_data)
        response.raise_for_status()  # Ensures the request is successful
        print("Piece added")
    except httpx.RequestError as err:
        print("Error calling the add_piece function:", err)


async def fill_database():
    try:
        async with httpx.AsyncClient() as client:
            white_tasks = [
                asyncio.create_task(add_piece_to_database({
                    "id": index + 1,
                    "name": piece,
                    "position": white_starting_pos[index],
                    "has_moved": False,
                    "moves": get_moves(piece, white_starting_pos[index], starting_board),
                }, client)) for index, piece in enumerate(white_pieces)
            ]

            black_tasks = [
                asyncio.create_task(add_piece_to_database({
                    "id": index + 17,
                    "name": piece,
                    "position": black_starting_pos[index],
                    "has_moved": False,
                    "moves": get_moves(piece, black_starting_pos[index], starting_board),
                }, client)) for index, piece in enumerate(black_pieces)
            ]

            await asyncio.gather(*white_tasks, *black_tasks)

        print("All pieces added successfully!")
    except Exception as error:
        print("Error filling database:", error)
