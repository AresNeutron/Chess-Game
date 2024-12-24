letters = ['A','B','C','D','E','F','G','H']

def convert_position(position: str):
    if len(position) != 2:
        raise ValueError("Invalid position format. Must be 2 characters long (e.g., 'E4')")
    
    # Check if the column is valid
    if position[0] not in letters:
        raise ValueError(f'Invalid column letter: {position[0]}')
    
    try:
        row_number = int(position[1])
        if not (1 <= row_number <= 8):
            raise ValueError(f'Invalid row number: {position[1]}')
    except ValueError:
        raise ValueError(f'Row must be a digit between 1 and 8: {position[1]}')
    
    x_position = letters.index(position[0])
    y_position = 8 - row_number

    return {'x': x_position, 'y': y_position}


def convert_coordinates(coor):
    if coor['x'] < 0 or coor['x'] > 7 or coor['y'] < 0 or coor['y'] > 7:
        raise ValueError(f"Invalid coordinates: x={coor['x']}, y={coor['y']}")
    
    column = letters[coor['x']]
    row = str(8 - coor['y'])
    return column + row