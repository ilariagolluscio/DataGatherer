# DataGatherer

This project is aimed at the creation of a software that allows for sem i-automatic extraction of specific data from a given set of images.

## Requirements

You need Docker installed.

## Result

You will be able to get a matrix:

|        | hashtag_1 | hashtag_2 | ... | hashtag_n |
|--------|-----------|-----------|-----|-----------|
| user_1 | weight_11 |           |     |           |
| user_2 |           |           |     |           |
| user_3 |           |           |     | weight_nn |

where weight = in how many posts a user has used the hashtag? 

## ¿How to install?

1. Clone the repository
2. execute `docker compose build`
3. if everything, goes well, execute `docker compose up`
4. goto page `http://127.0.0.1:8080` and use the application