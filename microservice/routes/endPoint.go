package routes

import (
	service "microservice/services"
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

//EndPoint . . .
func EndPoint() {
	e := echo.New()

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, this is microservice!")
	})

	//Allowing request from certain origin
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"https://localhost"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))

	// Post endpoint
	e.POST("/article/create", service.CreatePost)
	e.GET("/article/paging", service.ReadPostWithPaging)
	e.GET("/article/byId", service.ReadPostById)
	e.PUT("/article/update", service.UpdatePostById)
	e.DELETE("/article/delete", service.DeletePostById)

	e.GET("/article/byStatus", service.ReadPostByStatus)
	e.GET("/article/getCount", service.GetCountByStatus)

	e.Logger.Fatal(e.Start(":8000"))
}
