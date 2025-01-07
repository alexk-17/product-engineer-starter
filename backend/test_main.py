from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)


def test_default():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "root"}


def test_create_and_get_case():
    response = client.post("/cases")
    assert response.status_code == 200
    assert "id" in response.json()
    case_id = response.json()["id"]

    response = client.get(f"/cases/{case_id}")
    assert response.status_code == 200
    assert response.json()["id"] == case_id


def test_get_cases():
    response = client.get("/cases")
    assert response.status_code == 200
    assert len(response.json()) > 0
