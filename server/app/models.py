from tortoise import fields
from tortoise.models import Model

# This is similar to DRF
class ChessPiece(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=50)
    position = fields.CharField(max_length=2)
    has_moved = fields.BooleanField(default=False)
    moves = fields.JSONField(default=list)  # Store valid moves as JSON
