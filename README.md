# Project Name

Brief description or introduction to project.

## Table of Contents

1. [Docker](#docker)
2. [API Documentation](#api-documentation)



## Docker

To run the application in a Docker container, first, ensure that Docker is installed on your system. Then, build the Docker image using:

```bash
docker-compose build 
```


Once the image is built, you can run it as a container:

```bash
docker-compose up 
```

To run tests, use the following command
```
 docker-compose up -d
 docker-compose exec app npm test
```




## API Documentation


This project includes a requests.http file in the root directory, which contains example HTTP requests that you can use to test the API endpoints. The requests.http file is compatible with the REST Client extension for Visual Studio Code.

To use the requests.http file, follow these steps:

1. Install the REST Client extension in Visual Studio Code.

2. Open the requests.http file in your project.

3. You will see a list of HTTP requests with their respective URLs, request methods, headers, and request bodies (if applicable).

4. To send a request, simply click the "Send Request" link next to the request you want to test.

The requests.http file in this project contains the following requests:

### Incoming Task

```
POST http://localhost:3000/incoming
Content-Type: application/json

{
    "id": "10",
    "userId": "5"
}
```

This request sends a POST request to the /incoming endpoint with a JSON payload containing an id and userId.


### Get job by id

```
GET http://localhost:3000/outcoming/1
Content-Type: application/json
```

This request sends a GET request to the /outcoming/:id endpoint, where :id is the ID of the job you want to retrieve.


### Get all jobs

```
GET http://localhost:3000/outcoming
Content-Type: application/json
```

This request sends a GET request to the /outcoming endpoint to retrieve all jobs.
