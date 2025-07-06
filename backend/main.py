from models.PipelineData import PipelineData
from fastapi import FastAPI, Form,HTTPException
import networkx as nx
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.get('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    return {'status': 'parsed'}
    





@app.post("/pipelines/parse")
async def parse_pipeline(data: PipelineData):
    if not data.nodes and not data.edges:
        raise HTTPException(status_code=400, detail="Nodes are required.")
    try: 
        print(data)
        G = nx.DiGraph()

        for node in data.nodes:
            G.add_node(node.id)

        for edge in data.edges:
            G.add_edge(edge.source, edge.target)

        is_dag = nx.is_directed_acyclic_graph(G)

        return {
            "num_nodes": len(data.nodes),
            "num_edges": len(data.edges),
            "is_dag": is_dag,
        }
    except Exception as error:
        raise HTTPException(status_code=500, detail=f"Pipeline parsing failed: {str(error)}")