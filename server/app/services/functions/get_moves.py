from typing import List, Dict
from ..functions.convertions import convert_position, convert_coordinates
from ..algorithms.pawn import pawn_moves
from ..algorithms.king_and_knight import king_moves, knight_moves
from ..algorithms.bishop_rook_queen import linear_moves
from ..functions.filter_moves import filter_moves

def get_moves(name: str, position: str, board: List[List[str]]):
    coor = convert_position(position)
    x_pos, y_pos = coor['x'], coor['y']
    is_white = 'white' in name

    piece_type = name.split('-')[1]

    # Dictionary mapping piece types to movement logic using lambdas (lazy evaluation)
    move_functions_map = {
        'pawn': lambda: pawn_moves(x_pos, y_pos, is_white, board),
        'king': lambda: king_moves(x_pos, y_pos),
        'knight': lambda: knight_moves(x_pos, y_pos),
        'bishop': lambda: linear_moves(x_pos, y_pos, board, True),
        'rook': lambda: linear_moves(x_pos, y_pos, board, False),
        'queen': lambda: linear_moves(x_pos, y_pos, board, True) + linear_moves(x_pos, y_pos, board, False),
    }

    # Safely get the moves for the piece type, default to an empty list if not found
    raw_moves = move_functions_map.get(piece_type, lambda: [])()

    # Filter the safe allowed movements
    filtered_moves = filter_moves(raw_moves, name, board)

    # Convert to a list of position strings
    positions = list(map(convert_coordinates, filtered_moves))

    print(f"Piece {name} at {position} has possible moves: {positions}")  # Debug output

    return positions
