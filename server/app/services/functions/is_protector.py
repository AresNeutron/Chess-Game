from ..data.functions_data import find_position, directions, check_boundaries
from typing import List, Dict

BOARD_SIZE = 8

def is_threatening_piece(cell: str, is_white: bool) -> bool:
    """
    Checks if the given cell contains a threatening piece for the current player.
    """
    opposing_color = 'black' if is_white else 'white'
    return any(
        piece in cell for piece in [
            f'{opposing_color}-queen',
            f'{opposing_color}-bishop', 
            f'{opposing_color}-rook'
            ]
    )


def get_direction(piece_name: str, king_position: Dict[str, int], board: List[List[str]]) -> dict:
    """
    Determines the direction of movement from the king to the piece.
    Returns a dictionary with 'x' and 'y' components. Defaults to {'x': 0, 'y': 0}.
    """
    x_king, y_king = king_position['x'], king_position['y']

    for direction in directions:
        for i in range(1, BOARD_SIZE):
            new_y = y_king + direction['y'] * i
            new_x = x_king + direction['x'] * i

            # Boundary check
            if not check_boundaries(new_x) or not check_boundaries(new_y):
                break

            if board[new_y][new_x] == piece_name:
                return direction
            # Stop if there is any piece blocking the path
            if board[new_y][new_x]:
                break
    
    return {'x': 0, 'y': 0}


def is_protector(piece_name: str, board: List[List[str]]):
    """
    Determines if a piece is protecting its king by blocking a potential attack.
    Returns a dictionary indicating whether the piece is a protector and its direction.
    """
    piece_position = find_position(piece_name, board)
    is_white = 'white' in piece_name 
    king_position = find_position(f"{'white' if is_white else 'black'}-king-1", board)


    direction = get_direction(piece_name, king_position, board)
    x_vel, y_vel = direction['x'], direction['y']
    x_position, y_position = piece_position['x'], piece_position['y']

    for i in range(1, BOARD_SIZE):
        new_y = y_position + y_vel * i
        new_x = x_position + x_vel * i

        # Boundary check
        if new_x < 0 or new_x >= BOARD_SIZE or new_y < 0 or new_y >= BOARD_SIZE:
            break

        current_cell = board[new_y][new_x]
        if is_threatening_piece(current_cell, is_white):
            return {'is_protector': True, 'direction': direction}

        # Stop if any blocking piece is found
        if current_cell:
            break
    
    return {'is_protector': False, 'direction': None}
