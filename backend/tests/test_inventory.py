def test_insufficient_stock(client):
    client.post("/api/auth/register", json={"email": "stock@example.com", "username": "stockuser", "password": "pass"})
    login_res = client.post("/api/auth/login", data={"username": "stockuser", "password": "pass"})
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    # Create product with stock=1
    prod_res = client.post("/api/products/", json={"name": "Mouse", "description": "Wireless", "price": 25, "stock": 1}, headers=headers)
    prod_id = prod_res.json()["id"]
    # Order quantity 2 -> should fail
    order = {"items": [{"product_id": prod_id, "quantity": 2}]}
    resp = client.post("/api/orders/", json=order, headers=headers)
    assert resp.status_code == 400
    assert "Insufficient stock" in resp.text