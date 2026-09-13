from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


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


class BrainResponse(BaseModel):
    request_type: str
    entity: str
    model: str
    confidence: float
    reason: str


def understand(prompt: str) -> BrainResponse:
    text = prompt.lower().strip()

    if not text:
        return BrainResponse(
            request_type="unknown",
            entity="unknown",
            model="helmet",
            confidence=0.0,
            reason="No prompt was provided.",
        )

    if (
        "ball" in text
        or "sphere" in text
        or "apple" in text
    ):
        return BrainResponse(
            request_type="object",
            entity="sphere",
            model="sphere",
            confidence=0.95,
            reason="The request appears to describe a round object.",
        )

    if (
        "cube" in text
        or "box" in text
        or "square" in text
    ):
        return BrainResponse(
            request_type="object",
            entity="cube",
            model="cube",
            confidence=0.95,
            reason="The request appears to describe a cube-shaped object.",
        )

    if (
        "helmet" in text
        or "robot" in text
        or "head" in text
    ):
        return BrainResponse(
            request_type="object",
            entity="helmet",
            model="helmet",
            confidence=0.90,
            reason="The request appears to describe a helmet or character-related object.",
        )

    return BrainResponse(
        request_type="unknown",
        entity="unknown",
        model="helmet",
        confidence=0.20,
        reason="The brain does not know this object yet.",
    )


@app.get("/")
def root():
    return {
        "name": "3DBRAIN Brain API",
        "status": "online",
    }


@app.post("/api/brain", response_model=BrainResponse)
def brain(request: BrainRequest):
    return understand(request.prompt)