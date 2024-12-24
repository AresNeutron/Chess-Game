from ..data.functions_data import find_position, check_boundaries
from .is_protector import is_protector
from typing import List, Dict

def sign(x: int) -> int:
    """Returns the sign of a number."""
    return (x > 0) - (x < 0)

def filter_moves(raw_moves: List[Dict[str, int]], piece_name: str, board: List[List[str]]):
    """
    Filters valid moves for a chess piece based on board limits and threat alignment.
    
    Args:
        raw_moves (List[Dict[str, int]]): List of raw move positions with 'x' and 'y'.
        piece_name (str): Name of the chess piece.
        board (List[List[str]]): 2D chess board representation.
        
    Returns:
        List[Dict[str, int]]: List of filtered move positions.
    """
    # Filter the movements inside the limits of the board
    filtered_moves = [move for move in raw_moves if check_boundaries(move['x']) and
                    check_boundaries(move['y'])]
    
    if 'king' in piece_name:
        # King moves are not filtered further, as it has no protector logic.
        return filtered_moves

    # Check if the piece is a protector    
    protector = is_protector(piece_name, board)
    if not protector['is_protector']:
        return filtered_moves

    # Filter moves based on the threat alignment
    y_vel, x_vel = protector['direction']['y'], protector['direction']['x']
    piece_pos = find_position(piece_name, board)
    y_pos, x_pos = piece_pos['y'], piece_pos['x']

    def filter_threat(move: dict):
        # Ensure the move aligns with the direction of the threat and doesn't exceed its range.
        delta_y = move['y'] - y_pos
        delta_x = move['x'] - x_pos

        aligns_with_threat = (
            (y_vel == 0 and delta_y == 0) or  # Horizontal alignment
            (x_vel == 0 and delta_x == 0) or  # Vertical alignment
            (y_vel != 0 and x_vel != 0 and delta_y / y_vel == delta_x / x_vel)  # Diagonal alignment    
            # Same vertical and horizontal direction
            ) and sign(delta_y) == sign(y_vel) and sign(delta_x) == sign(x_vel)
                
        return aligns_with_threat
            
    # return a list of safe movements
    safe_moves = [move for move in filtered_moves if filter_threat(move)]
    return safe_moves
        