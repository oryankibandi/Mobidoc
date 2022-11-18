# Records service

This service's key functions are:

1.  Register and authenticate new users - Doctors and Patients
2.  Connect patients to doctors
3.  Store patient's records

## Endpoints

1. `/patient/create` **POST** - Register a new patient
2. `/patient/login` **POST** - Login for patients
3. `/patient/refresh` **GET** - Get a refresh token
4. `/patient/logout` **POST** - Logout for patients
5. `/patients` **GET** - retrieve a list of patients based on query parameters
6. `/doctor/create` **POST** - Regsiter a new doctor
7. `/doctor/login` **POST** - login for doctors
8. `/doctor/refresh` **GET** - Get a refresh token
9. `/doctor/logout` **POST** - logout for doctors
10. `/doctors` **GET** - retrieve a list of doctors based on query parameters
11. `/record/add` **POST** - Add a new record
12. `/records/:record_uid` **GET** - retrieve a record
13. `/records` **GET** - retrieve records for a certain patient
14. `/medfiles/request` **POST** - request access to a patient's records
15. `/medfiles/grant` **POST** - grant a doctor access to a patient's records
16. `/medfiles/requests` **GET** - view requests sent by doctors
