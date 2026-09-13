import json
import urllib.request
import urllib.error


OLLAMA_URL = "http://localhost:11434/api/generate"

MODEL_NAME = "qwen2.5:3b"


SYSTEM_PROMPT = """
You are the 3DBRAIN AI planner.

Your job is to understand what the user wants to create in 3D.

Return ONLY valid JSON.

Use this structure:

{
  "request_type": "object",
  "category": "vehicle",
  "object": "sports car",
  "description": "realistic red sports car",
  "style": "realistic",
  "color": "red",
  "environment": null,
  "generation_strategy": "3d_object"
}

Possible request_type values:
- object
- character
- environment
- world
- unknown

Possible generation_strategy values:
- 3d_object
- character
- environment
- world
- unknown

Do not write explanations outside the JSON.
"""


def ask_ai(prompt: str) -> dict:
    full_prompt = f"""
{SYSTEM_PROMPT}

USER REQUEST:
{prompt}
"""

    data = {
        "model": MODEL_NAME,
        "prompt": full_prompt,
        "stream": False,
        "format": "json"
    }

    request = urllib.request.Request(
        OLLAMA_URL,
        data=json.dumps(data).encode("utf-8"),
        headers={
            "Content-Type": "application/json"
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            result = json.loads(response.read().decode("utf-8"))

        return json.loads(result["response"])

    except urllib.error.URLError:
        return {
            "request_type": "unknown",
            "category": "unknown",
            "object": "unknown",
            "description": prompt,
            "style": "realistic",
            "color": None,
            "environment": None,
            "generation_strategy": "unknown",
            "error": "AI model is not running."
        }

    except Exception as error:
        return {
            "request_type": "unknown",
            "category": "unknown",
            "object": "unknown",
            "description": prompt,
            "style": "realistic",
            "color": None,
            "environment": None,
            "generation_strategy": "unknown",
            "error": str(error)
        }