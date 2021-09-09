package service

import (
	"fmt"
	"log"
	"microservice/models"
	"microservice/repositories"
	"strconv"

	"net/http"

	"github.com/labstack/echo"
)

type ResponseModel struct {
	Code    int    `json:"code" validate:"required"`
	Message string `json:"message" validate:"required"`
}

// Create Post
func CreatePost(c echo.Context) error {
	Res := &ResponseModel{400, "Bad Request"}
	U := new(models.PostModel)
	if err := c.Bind(U); err != nil {
		return nil
	}
	Res = (*ResponseModel)(repositories.CreatePost(U))
	return c.JSON(http.StatusOK, Res)
}

// Read Post With Paging
func ReadPostWithPaging(c echo.Context) error {
	a := c.QueryParam("limit")
	b := c.QueryParam("offset")
	limit, _ := strconv.Atoi(a)
	offset, _ := strconv.Atoi(b)
	result := repositories.ReadPostWithPaging(limit, offset)
	return c.JSON(http.StatusOK, result)
}

// Read Post by Id
func ReadPostById(c echo.Context) error {
	a := c.QueryParam("id")
	id, _ := strconv.Atoi(a)
	result := repositories.ReadPostById(id)
	return c.JSON(http.StatusOK, result)
}

// Update Post by Id
func UpdatePostById(c echo.Context) error {
	Res := &ResponseModel{400, "Bad Request"}
	a := c.QueryParam("id")
	id, _ := strconv.Atoi(a)
	U := new(models.PostModel)
	if err := c.Bind(U); err != nil {
		log.Println(err.Error())
		return nil
	}
	Res = (*ResponseModel)(repositories.UpdatePostById(U, id))
	return c.JSON(http.StatusOK, Res)
}

// Delete Post by Id
func DeletePostById(c echo.Context) error {
	Res := &ResponseModel{400, "Bad Request"}
	a := c.QueryParam("id")
	id, _ := strconv.Atoi(a)
	fmt.Println("id", id)
	Res = (*ResponseModel)(repositories.DeletePostById(id))
	return c.JSON(http.StatusOK, Res)
}

// Read Post by Status
func ReadPostByStatus(c echo.Context) error {
	status := c.QueryParam("status")
	a := c.QueryParam("limit")
	b := c.QueryParam("offset")
	limit, _ := strconv.Atoi(a)
	offset, _ := strconv.Atoi(b)
	result := repositories.ReadPostByStatus(status, limit, offset)
	return c.JSON(http.StatusOK, result)
}

// Get Count by Status
func GetCountByStatus(c echo.Context) error {
	status := c.QueryParam("status")
	result := repositories.GetCountByStatus(status)
	return c.JSON(http.StatusOK, result)
}
