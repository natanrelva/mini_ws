from fastapi import FastAPI
import socketio
from agent import mock_llm_response

sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins="*")

app = FastAPI()

sio_app = socketio.ASGIApp(sio, other_asgi_app=app)


@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")


@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")


@sio.event
async def user_message(sid, data):
    print(f"[{sid}] => {data}")
    response = mock_llm_response(data["message"])
    await sio.emit("bot_response", {"reply": response}, to=sid)
