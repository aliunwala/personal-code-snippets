# Express + Postgress Sample App

## Some postgres setup

Command I needed to run to get psql, and start my postgres local instance:

```bash
brew install postgresql@17
echo 'export PATH="/opt/homebrew/opt/postgresql@17/bin:$PATH"' >> /Users/aliunwala/.zshrc
brew services start postgresql@17
```

brew services stop/list also exist

First time login to psql:

```bash
psql -U aliunwala -d postgres # Sould be able to change aliunwala with "myuser" below. But "GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;" is not working
```

First time commands to run in psql

```sql
CREATE DATABASE mydb;
CREATE USER myuser WITH PASSWORD 'mypassword'; -- << USE A SECURE PASSWORD HERE
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
\q -- << Exit interactive mode
```

## PSQL quick overview:

1. Connect to a db `psql -U aliunwala -d postgres`
2. Run a single command with -c `psql -d my_database -c "SELECT * FROM my_table;"`
   Once you are connected you have the terminal promp to the database, it will look like `postgres=# `
   Once you have this prompt you can use commands like:

- `postgres-# \l` - List available databases
- `postgres-# \c myDatabase` - Switch to a specified database
- `postgres-# \dt` - List tables
- `postgres-# \d mytable` - Describe a specified table
- `postgres-# \du myUser` - Listing users

## Testing the DB and express are connected

GET all products:

```bash
curl http://localhost:3000/products
```

GET a single product (e.g., ID 1):

```bash
curl http://localhost:3000/products/1
```

CREATE a new product:

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"name":"New Gadget","description":"A very cool new gadget.","price":99.99}' \
http://localhost:3000/products
```

UPDATE a product (e.g., ID 1):

```bash
curl -X PUT -H "Content-Type: application/json" \
-d '{"name":"Laptop Pro X","description":"Upgraded high-performance laptop.","price":1499.00}' \
http://localhost:3000/products/1
```

DELETE a product (e.g., ID 2):

```bash
curl -X DELETE http://localhost:3000/products/2
```
