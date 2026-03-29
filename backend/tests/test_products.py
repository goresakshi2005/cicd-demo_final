def test_create_and_get_product(client):
    # Register and login
    client.post("/api/auth/register", json={"email": "prod@example.com", "username": "produser", "password": "pass"})
    login_res = client.post("/api/auth/login", data={"username": "produser", "password": "pass"})
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    # Create
    product = {"name": "Laptop", "description": "Gaming laptop", "price": 1200.0, "stock": 5}
    resp = client.post("/api/products/", json=product, headers=headers)
    assert resp.status_code == 201
    prod_id = resp.json()["id"]
    # Get
    resp = client.get(f"/api/products/{prod_id}")
    assert resp.status_code == 200
    assert resp.json()["name"] == "Laptop"