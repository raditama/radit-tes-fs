package driver

import (
	"database/sql"
	"fmt" // package used to read the .env file
	"log"

	_ "github.com/go-sql-driver/mysql" // postgres golang driver
)

const (
	user     = "root"
	dbname   = "article"
	password = ""
	host     = "localhost"
	port     = 3306
)

//ConnectDB function
func ConnectDB() (*sql.DB, error) {
	sqlInfo := fmt.Sprintf(`%s:%s@tcp(%s:%d)/%s`,
		user, password, host, port, dbname)

	db, err := sql.Open("mysql", sqlInfo)
	if err != nil {
		log.Println(err.Error())
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		log.Println(err.Error())
		panic(err)
	}

	fmt.Println("Connect success!")
	return db, nil
}
