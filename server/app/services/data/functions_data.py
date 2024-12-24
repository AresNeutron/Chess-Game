from typing import List

def find_position(piece_name: str, board: List[List[str]]):
    for rowIndex in range(8):
        for colIndex in range(8):
            if board[rowIndex][colIndex] == piece_name:
                return {'y': rowIndex, 'x': colIndex}

def check_boundaries(num: int):
    return 0 <= num <= 7

directions: List[dict] = [
    { 'y': 1, 'x': 0 },
    { 'y': 0, 'x': 1 },
    { 'y': -1, 'x': 0 },
    { 'y': 0, 'x': -1 },
    { 'y': 1, 'x': 1 },
    { 'y': -1, 'x': 1 },
    { 'y': -1, 'x': -1 },
    { 'y': 1, 'x': -1 },
  ]

white_threats: List[str] = [
  "white-rook-1",
  "white-bishop-1",
  "white-rook-2",
  "white-bishop-2",
  "white-queen-1",
]

black_threats: List[str] = [
  "black-rook-1",
  "black-bishop-1",
  "black-rook-2",
  "black-bishop-2",
  "black-queen-1",
]
