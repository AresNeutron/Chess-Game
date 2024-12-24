from typing import List, Dict

def pawn_moves(
        x_pos: int,
        y_pos: int, 
        is_white: bool, 
        board: List[List[str]]
    ) ->List[Dict[str,int]]:

    direction = -1 if is_white else 1
    enemy_color = 'black' if is_white else 'white'
    moves: List[Dict[str, int]] = []

    # Calculate left and right attack positions
    left_attack = board[y_pos + direction][x_pos - 1] if x_pos - 1 >= 0 else None
    right_attack = board[y_pos + direction][x_pos + 1] if x_pos + 1 <= 7 else None

    # Check if there's an enemy piece on the left
    if left_attack and enemy_color in left_attack:
        moves.append({ 'y' : y_pos + direction, 'x' : x_pos - 1})

    # Same way in the right
    if right_attack and enemy_color in right_attack:
        moves.append({ 'y' : y_pos + direction, 'x' : x_pos + 1})

    # cells to move
    one_step_cell = board[y_pos + direction][x_pos]
    two_steps_cell = board[y_pos + direction * 2][x_pos]

    # Standard one-step forward move
    if not one_step_cell:
        moves.append({ 'y': y_pos + direction, 'x': x_pos })

    # Two-step move if the pawn is in its starting position
    if is_white and y_pos == 6 or not is_white and y_pos == 1:
        if not one_step_cell and not two_steps_cell:
            moves.append({ 'y': y_pos + direction * 2, 'x': x_pos })

    return moves