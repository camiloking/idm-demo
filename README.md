# Identity Management Demo

## Run Keycloak With Docker
```
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin \
quay.io/keycloak/keycloak:17.0.0 start-dev
```

## Setup
* Navigate to `http://localhost:8080/`
* Login to admin console with admin:admin
* import realm using realm-export.json
* You may need to update secret in keycloak.json from `my-protected-app` client credentials in keycloak admin console

## Run Nodejs Application (Service Provider)
```
npm install
node protectedApp.js
```