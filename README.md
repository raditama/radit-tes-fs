TES-SV-FS
---------

* Versi Golang = go1.16.6
* Database = MySQL
* File SQL db = article.sql
* Database name = article
* Database username = root
* Database password =
* Postman collection = article.postman_collection.json

Run Application
---------------

Client:

Install node module
- npm install

Running program
- npm start

Service:

Running program
- go run main.go

HOW TO USE
----------
Import db di mysql

Import postman collection

Running program

Daftar API sesuai soal:
1. Create Article
2. Read Paging Article
3. Read by Id Article
4. Update by Id Article
5. Delete by Id Article

Tambahan API (untuk kebutuhan FE)
1. Pagination by Status Article
Menampilkan data berdasarkan status dan menggunakan pagination (limit & offset)
2. Get Count by Status Article
Menampilkan jumlah kesuluran article berdasarkan status
