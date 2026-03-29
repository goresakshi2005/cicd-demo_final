def test_register_user(client):
    response = client.post("/api/auth/register", json={
        "email": "test@example.com",
        "username": "testuser",
        "password": "secret"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["username"] == "testuser"
    assert "id" in data

def test_login(client):
    # First register
    client.post("/api/auth/register", json={"email": "login@example.com", "username": "loginuser", "password": "pass"})
    response = client.post("/api/auth/login", data={"username": "loginuser", "password": "pass"})
    assert response.status_code == 200
    assert "access_token" in response.json()