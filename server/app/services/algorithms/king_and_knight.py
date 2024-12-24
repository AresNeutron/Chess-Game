def king_moves(x_pos: int, y_pos: int):
    moves = [
        { 'y': y_pos + 1, 'x': x_pos },
        { 'y': y_pos + 1, 'x': x_pos + 1 },
        { 'y': y_pos, 'x': x_pos + 1 },
        { 'y': y_pos - 1, 'x': x_pos + 1 },
        { 'y': y_pos - 1, 'x': x_pos },
        { 'y': y_pos - 1, 'x': x_pos - 1 },
        { 'y': y_pos, 'x': x_pos - 1 },
        { 'y': y_pos + 1, 'x': x_pos - 1 },
    ]
    return moves


def knight_moves(x_pos: int, y_pos: int):
    moves = [
    { 'y': y_pos + 2, 'x': x_pos + 1 },
    { 'y': y_pos + 1, 'x': x_pos + 2 },
    { 'y': y_pos + 2, 'x': x_pos - 1 },
    { 'y': y_pos + 1, 'x': x_pos - 2 },
    { 'y': y_pos - 2, 'x': x_pos - 1 },
    { 'y': y_pos - 1, 'x': x_pos - 2 },
    { 'y': y_pos - 2, 'x': x_pos + 1 },
    { 'y': y_pos - 1, 'x': x_pos + 2 },
    ]
    return moves
    