REM Database user create
use admin
db.createUser(
  {
    user: "klikz",
    pwd: "klikz",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
use savethislife
db.createUser(
  {
    user: "stl",
    pwd:  "stl",
    roles: [ { role: "readWrite", db: "savethislife" },
             { role: "read", db: "reporting" } ]
  }
)

REM Authorize database
mongo --port 27017  --authenticationDatabase "admin" -u "klikz" -p "klikz"

REM Database import
mongoimport --authenticationDatabase "admin" -u "klikz" -p "klikz" --db savethislife --collection pets --file pets.json --jsonArray