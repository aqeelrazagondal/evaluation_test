## 1:  Get City temprature by location name or zipcode
    ### END POINT:  /city/:cityname

    ### Method: GET
    ### URL Params : cityname

    Success Response:
    {
      "city": "Lahore, Pakistan",
      "temperature": "54"
    }

## 2:  Get City temprature by IP based
    ### END POINT: /currentLocationTemp
    ### Method: GET

    Success Response:
    {
      "city": "Lahore, Pakistan",
      "temperature": "54"
    }

    failure Response: {
             status: false,
            message: "City not found by Ip Address"
    }
