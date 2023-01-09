# Montreal-Community-Geodata

![Geodata screenshot](https://raw.githubusercontent.com/TheFloatingString/Montreal-Community-Geodata/main/public/static/img/screenshot.png)

### Installation

```
npm install
```

### Environment Variables

```
set NODE_TLS_REJECT_UNAUTHORIZED=0
set USER=<USER>
set HOST=<HOST>
set PASSWORD=<PASSWORD>
set POSTGRES_PORT=<PORT>
set SSL=<lowercase boolean>
```

### Clear Database

```
npm clearDatabase
```

### Populate Postgres Database
With data from:
* Anagraph
* Montréal Données

```
node services/dbHelper.js
```

### To Run

```
npm start
```

Go to localhost port 8080

Try `http://localhost:8080`
