package main

import (
	"server/routes"
	"server/utils"
)

func main() {
	utils.DBConnection()
	routes.Controller()

}
