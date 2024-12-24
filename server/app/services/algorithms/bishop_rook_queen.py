from typing import List, Dict
from ..data.functions_data import check_boundaries, directions

"""
Function to get all available movements for pieces that move straight
"""
def linear_moves(x_pos: int, y_pos: int, board: List[List[str]], diagonal: bool) -> List[Dict[str, int]]:
    #Slice the list to use the diagonal or linear directions
    new_directions = directions[4:] if diagonal else directions[:4]

    moves :List[Dict[str, int]] = []
    for dir in new_directions:
        x_dir, y_dir = dir['x'], dir['y']

        for i in range(1,8):
            new_x = x_pos + x_dir * i
            new_y = y_pos + y_dir * i

            if not check_boundaries(new_x) or not check_boundaries(new_y):
                break

            moves.append({ 'y': new_y, 'x': new_x })
            if board[new_y][new_x]:  # Stop adding moves if a piece blocks further movement
                break

    return moves
