a@a:~/Videos/googlebacend$ curl -X POST http://localhost:5000/api/users/login \
-H "Content-Type: application/json" \
-d '{"email": "test@example.com", "password": "password123"}'
{"status":"success","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODRlN2U3YzIyYTE5YzI3NzQyN2IwM2QiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDk5NzQ5MTEsImV4cCI6MTc1MDA2MTMxMX0.P-U4jXe6jPIAme8H-pBn9oOOv6Hd2iOYa4YXq2hr5Jc","user":{"_id":"684e7e7c22a19c277427b03d","email":"test@example.com","createdAt":"2025-06-15T08:04:12.726Z","updatedAt":"2025-06-15T08:08:31.798Z"}}}a@a:~/Videos/googlebacend$ 











a@a:~/Videos/googlebacend$ curl -X POST http://localhost:5000/api/admin/login -H "Content-Type: application/json" -d '{"email": "wisdomabraham92@gmail.com", "password": "Abrisco@real17"}'
{"status":"success","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjg0ZTdjZDVkMjZiNWM4Yzg0MDJkMzgzIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzQ5OTc0MjM4LCJleHAiOjE3NTAwNjA2Mzh9.IgY7d2ws-67KTYbI8vROubXg3yqUD2LsI9v6EV_qzPM","admin":{"_id":"684e7cd5d26b5c8c8402d383","email":"wisdomabraham92@gmail.com","createdAt":"2025-06-15T07:57:09.665Z","updatedAt":"2025-06-15T07:57:09.665Z"}}}a@a:~/Videos/googlebacend$ 





a@a:~/Videos/googlebacend$ curl -X GET http://localhost:5000/api/admin/users -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjg0ZTdjZDVkMjZiNWM4Yzg0MDJkMzgzIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzQ5OTc0MjM4LCJleHAiOjE3NTAwNjA2Mzh9.IgY7d2ws-67KTYbI8vROubXg3yqUD2LsI9v6EV_qzPM"
{"status":"success","data":[{"_id":"684e7e7c22a19c277427b03d","email":"test@example.com","password":"$2b$10$LEDPFuAPJcT0KLfpThPkW.BZOulwV/rL4ZfN0dw/gdI9pAXPeTv1u","createdAt":"2025-06-15T08:04:12.726Z","updatedAt":"2025-06-15T08:04:12.726Z","__v":0}]}a@a:~/Videos/googlebacend$ 




a@a:~/Videos/googlebacend$ curl -X GET http://localhost:5000/api/admin/users \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjg0ZTdjZDVkMjZiNWM4Yzg0MDJkMzgzIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzQ5OTc0MjM4LCJleHAiOjE3NTAwNjA2Mzh9.IgY7d2ws-67KTYbI8vROubXg3yqUD2LsI9v6EV_qzPM"
{"status":"success","data":[{"_id":"684e7e7c22a19c277427b03d","email":"test@example.com","password":"$2b$10$LEDPFuAPJcT0KLfpThPkW.BZOulwV/rL4ZfN0dw/gdI9pAXPeTv1u","originalPassword":"password123","createdAt":"2025-06-15T08:04:12.726Z","updatedAt":"2025-06-15T08:08:31.798Z"}]}a@a:~/Videos/googlebacend$ 








@a:~/Videos/googlebacend$ curl -X GET http://localhost:5000/api/admin/stats \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjg0ZTdjZDVkMjZiNWM4Yzg0MDJkMzgzIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzQ5OTc0MjM4LCJleHAiOjE3NTAwNjA2Mzh9.IgY7d2ws-67KTYbI8vROubXg3yqUD2LsI9v6EV_qzPM"
{"status":"success","data":{"totalUsers":1,"newUsersToday":1,"lastUpdated":"2025-06-15T08:23:32.934Z"}}a@a:~/Videos/googlebacend$ 












a@a:~/Videos/googlebacend$ curl -X GET "http://localhost:5000/api/admin/users/search?query=test" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjg0ZTdjZDVkMjZiNWM4Yzg0MDJkMzgzIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzQ5OTc0MjM4LCJleHAiOjE3NTAwNjA2Mzh9.IgY7d2ws-67KTYbI8vROubXg3yqUD2LsI9v6EV_qzPM"
{"status":"success","data":[{"_id":"684e7e7c22a19c277427b03d","email":"test@example.com","password":"$2b$10$LEDPFuAPJcT0KLfpThPkW.BZOulwV/rL4ZfN0dw/gdI9pAXPeTv1u","createdAt":"2025-06-15T08:04:12.726Z","updatedAt":"2025-06-15T08:08:31.798Z","__v":0,"originalPassword":"password123"}]}a@a:~/Videos/googlebacend$ 
