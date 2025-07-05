from pydantic import BaseModel
from typing import List

from models.Node import Node
from models.Edge import Edge

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]
