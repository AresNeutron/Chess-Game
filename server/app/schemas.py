from pydantic import BaseModel
from typing import List

class ChessPieceSchema(BaseModel):
    id: int
    name: str
    position: str
    has_moved: bool
    moves: List[str]

    class Config:
        orm_mode = True
