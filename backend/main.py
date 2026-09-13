from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.brain.planner import ask_ai


app = FastAPI(title="3DBRAIN Brain API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class BrainRequest(BaseModel):
    prompt: str


@app.get("/")
def root():
    return {
        "name": "3DBRAIN Brain API",
        "status": "online",
        "brain": "AI"
    }


@app.post("/api/brain")
def brain(request: BrainRequest):

    if not request.prompt.strip():
        return {
            "error": "Prompt cannot be empty."
        }

    result = ask_ai(request.prompt)

    return result