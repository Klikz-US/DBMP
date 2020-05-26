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

REM Connect from App
mongodb://stl:stl@localhost:27017/savethislife?retryWrites=true&w=majoritys

REM Connect from Compass
mongodb://stl:stl@34.125.11.121:27017/?authSource=savethislife&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false

REM paths
cd /home/klikz/repositories/DBMP/
cd /home/klikz/public_html/klikz.us/server/
forever start service.json

REM change document root path
cd /var/cpanel/userdata/USERNAME/DOMAIN.COM
rm -vf domain.com.cache domain.com_SSl.cache
/scripts/updateuserdatacache
/scripts/rebuildhttpdconf
service httpd restart