# Records service

This service's key functions are:

1.  Register and authenticate new users - Doctors and Patients
2.  Connect patients to doctors
3.  Store patient's records

## Endpoints

1. `/patient/create` **POST** - Register a new patient.
   Sample request.
   All fields are required.

```javascript
{
    "first_name": "John",
    "last_name": "Doe",
    "middle_name": "David",
    "national_id": "123640200",
    "email": "johndoe@gmail.com",
    "phone_number": "+254123650399",
    "address": {
        "country": "Rwanda",
        "county": "Kigali",
        "city": "Kigali",
        "street": "Kigali street"
    },
    "next_of_kin": {
        "first_name": "Jane",
        "last_name": "Doe",
        "middle_name": "David",
        "phone_number": "+254862126480",
        "relationship": "sibling"
    },
    "password": "<secure password>"
}
```

2. `/patient/login` **POST** - Login for patients
   Patient login requires a phone and password.
   In response, an **access token** will be sent which should be included in all subsequent requests as `authorization` header. This should look like this `authorization: "Bearer <token>"` where token is the access token.
   A refresh token will also be sent as a cookie which will be managed by a the browser.
   Samle request:

```javascript
{
    "phone_number": "+254123456789",
    "password": "<password>"
}
```

3. `/patient/refresh` **GET** - Get a refresh token
   A **_GET_** request to retrieve a new access token when the patient's access token expires. The refresh token in the cookie sent on log in will be used to validate and issue a new access token.
   Sample response.

```javascript
{
    "status": "SUCCESS",
    "data": {
        "access_token": "<access token>"
    }
}
```

4. `/patient/logout` **POST** - Logout for patients
   A **_POST_** request with an empty body will log out a patient from the session.
   The access token header and refresh token cookie should be sent together with the request.
5. `/patients` **GET** - retrieve a list of patients based on query parameters.
   Only available to doctors.
   Access token required.
   Query parameters:
   `count` **_integer_** - No. of results to be returned.
   `page` **_integer_** - Page to be returned. This is dependant on the number specified on `count`.
   `first_name` **_string_**
   `last_name` **_string_**
   `national_id` **_string_**
6. `/patients/:patient_uid`
   **GET** - retrieves details of a patient with the provided patient_uid.
   Only available to doctors.
   Access token required.
7. `/patient/:patient_uid` **PUT** - Updates a patient's details. Body should contain the details to update.
   Only available for the patient who owns the details.
   Authentication required.
   Sample body.

```javascript
{
  "first_name": "Jane"
}
```

8. `/doctor/create` **POST** - Regsiter a new doctor
   Registers a new doctor.
   All fields are required.

```javascript
{
    "first_name": "James",
    "last_name": "Doe",
    "national_id": "123456789",
    "username": "Dr. James",
    "email": "jamesdoe@gmail.com",
    "address": {
        "country": "Kenya",
        "city": "Nairobi",
        "street": "Upperhill"
    },
    "place_of_work": "Mobidoc Hospital",
    "area_of_specialty": "Family doctor",
    "password": "<secure password>"
}
```

9. `/doctor/login` **POST** - login for doctors
   Doctor login requires a email and password.
   In response, an **access token** will be sent which should be included in all subsequent requests as `authorization` header. This should look like this: `authorization: "Bearer <token>"` where token is the access token.
   A refresh token will also be sent as a cookie which will be managed by a the browser.
   Samle request:

```javascript
{
  "email": "jamesdoe@gmail.com",
  "password": "<password>"
}
```

10. `/doctor/refresh` **GET** - Get a refresh token
    A **_GET_** request to retrieve a new access token when the doctor's access token expires. The refresh token in the cookie sent on login will be used to validate and issue a new access token.
    Sample response.

```javascript
{
    "status": "SUCCESS",
    "data": {
        "access_token": "<access token>"
    }
}
```

11. `/doctor/logout` **POST** - logout for doctors
    A **_POST_** request with an empty body will log out a doctor from the session.
    The access token header and refresh token cookie should be sent together with the request.
12. `/doctors` **GET** - retrieve a list of doctors based on query parameters
    Access token required.
    Query parameters:
    `count` **_integer_** - No. of results to be returned.
    `page` **_integer_** - Page to be returned. This is dependant on the number specified on `count`.
    `first_name` **_string_**
    `username` **_string_**
    `place_of_work` **_string_** Eg.Coptic hospital
    `area_of_specialty` **_string_** Eg. Family doctor, Dentist.
13. `/doctors/:doctor_uid` **GET** - retrieves details of a specific doctor
14. `/doctor/:doctor_uid` **PUT** - Updates a doctors details.
    Authentication required.
    Only available to a doctor who owns the details.
    Sampply body:

```javascript
{
  "first_name": "John"
}
```

15. `/record/add` **POST** - Add a new record
    Adds a new record to a patient's medical files.
    Only a doctor with access can add a record.
    Sample request.

```javascript
{
    "symptoms": [
        "symptom1",
        "symptom2"
    ],
    "diagnosis": {
        "condition": "condition",
        "description": "description of condition"
    },
    "medication": [
        {
            "name": "med 1",
            "dosage": "2*3"
        },
        {
            "name": "med 2",
            "dosage": "500g every day"
        }
    ],
    "patient_uid": "<patient uid>"
}
```

Each record is unique and once added **cannot be changed or deleted**.

16. `/records/:patient_uid/:record_uid` **GET** - retrieve a specific patient's record.
    Authentication and authorization required.
    Only a doctor with access to a record can view the record.
    `patient_uid` and `record_uid` **must** be provided in order to retrieve a specific record.

17. `/records` **GET** - retrieve records for a certain patient depending on query parameters.
    Authentication and authorization required.
    Only a doctor with access to a record can view the record.
    Query params:
    `count` **_integer_** - No. of results to be returned.
    `page` **_integer_** - Page to be returned. This is dependant on the number specified on `count`.
    `patient_uid` **_REQUIRED_** **string** - patient_uid to retrieve records for.
    `to` **Date** specifies the final date to filter the records. Records past this date will not be returned.
    `from` **Date** specifies the initial date to filter the records. Records before this date will not be returned. When `to` and `from` are both provided, records in between the dates will be filtered.
18. `/medfiles/request` **POST** - request access to a patient's records
    Authentication and authorization required.
    Only doctors can request access.
    Body should contain the patient_uid of the patient to request.
    Sample body:
    ```javascript
    {
        "patient_uid": "<patient_uid>"
    }
    ```
19. `/medfiles/grant` **POST** - grant a doctor access to a patient's records
    Authentication required.
    Only accessible to patients
    A body containing a doctor's uid will allow the doctor access to the record for **7 days**.
    Sample body:
    ```javascript
    {
        "doctor_uid": "<doctor_uid>"
    }
    ```
20. `/medfiles/requests` **GET** - view requests sent by doctors
    Authentication required.
    Only accessible to patients.
    This will return all unapproved requests made by doctors to access a patient's records.
