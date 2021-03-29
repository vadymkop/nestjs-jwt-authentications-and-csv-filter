Simple project with REST API endpoints and JWT authentication.
It also provides endpoints for csv file filtration.

## Installation

```bash
$ npm install
```

## Setup database using Docker
```bash
# load database image
$ docker pull postgres

# run database
$ docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=products -d -p 5435:5432 postgres
```

## Running the app

```bash
$ npm run start
```

## Test API
```bash
# Sign in
$ curl -X POST http://localhost:3000/auth/sign-in -d '{"username": "maria", "password": "secret", "firstName": "Maria", "lastName": "North"}' -H "Content-Type: application/json"
# Login
$ curl -X POST http://localhost:3000/auth/login -d '{"username": "maria", "password": "secret"}' -H "Content-Type: application/json"
# Change password
$ curl -X POST http://localhost:3000/auth/change-password -d '{"username": "maria", "password": "secret", "newPassword": "newsecret"}' -H "Content-Type: application/json"


# Replace <Token ID> by real token from login endpoint in lines below:
# Find all products
$ curl -X GET http://localhost:3000/products -H "Authorization: Bearer <Token ID>"
# Add new product
$ curl -X POST http://localhost:3000/products -d '{"name": "product", "price": "100.00"}' -H "Content-Type: application/json" -H "Authorization: Bearer <Token ID>"
# Find product by id
$ curl -X GET http://localhost:3000/products/1 -H "Authorization: Bearer <Token ID>"
# Edit product
$ curl -X PUT http://localhost:3000/products -d '{"productId": 1, "name": "product", "price": "10.25"}' -H "Content-Type: application/json" -H "Authorization: Bearer <Token ID>"


# Filter csv file with emails
$ curl -X POST http://localhost:3000/upload --data-binary @./sources/100-contacts-homework.csv -H "Content-Type:application/octet-stream" --output ./filtered-contracts.csv
# Show filtered file
$ cat ./filtered-contracts.csv
```
