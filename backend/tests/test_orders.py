def test_create_order(client):
    # Setup: register, login, create product
    client.post("/api/auth/register", json={"email": "order@example.com", "username": "orderuser", "password": "pass"})
    login_res = client.post("/api/auth/login", data={"username": "orderuser", "password": "pass"})
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    product_res = client.post("/api/products/", json={"name": "Phone", "description": "Smartphone", "price": 500, "stock": 10}, headers=headers)
    prod_id = product_res.json()["id"]
    # Create order
    order = {"items": [{"product_id": prod_id, "quantity": 2}]}
    resp = client.post("/api/orders/", json=order, headers=headers)
    assert resp.status_code == 201
    data = resp.json()
    assert data["status"] == "pending"
    assert len(data["items"]) == 1
    assert data["items"][0]["quantity"] == 2