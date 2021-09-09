package main

import (
	"microservice/routes"
)

func main() {
	// db, _ := sql.Open("mysql", "user:password@tcp(host:port)/dbname?multiStatements=true")
	// driver, _ := mysql.WithInstance(db, &mysql.Config{})
	// m, _ := migrate.NewWithDatabaseInstance(
	//     "file:///migrations",
	//     "mysql",
	//     driver,
	// )

	// m.Steps(2)

	// Running Enpoint
	routes.EndPoint()
}
