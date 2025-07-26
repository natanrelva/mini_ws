def mock_llm_response(message: str) -> str:
    return f"Eco do agente: '{message[::-1]}'"
