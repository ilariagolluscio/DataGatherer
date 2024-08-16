# DataGatherer

This project is aimed at the creation of a software that allows for sem i-automatic extraction of specific data from a given set of images.


## Precautions

This code is made to be run **locally**. It does not manage access to data, nor protects from unauthorized access. 
Please, double check that port 8080 is not reachable from outside your trusted network.


## Requirements

You need Docker installed.

## Result

You will be able to get a matrix:

|           | user_1    | user_2 | ... | user_3    |
|-----------|-----------|--------|-----|-----------|
| hashtag_1 | weight_11 |        |     |           |
| hashtag_2 |           |        |     |           |
| hashtag_n |           |        |     | weight_nn |

where weight = in how many posts a user has used the hashtag? 

## ¿How to install?

1. Clone the repository
2. execute `docker compose build`
3. if everything, goes well, execute `docker compose up`
4. goto page `http://127.0.0.1:8080` and use the application

## How to access entity admin page?

goto `http://127.0.0.1:8080/api/admin` and use credentials:

```
username: admin
password: admin
```
automatically created at startup.