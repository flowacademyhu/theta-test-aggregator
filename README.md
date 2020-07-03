![](docs/logo.svg)
# Test aggregator

## Problem and Importance


Fluidpay has a simulation tool over on it’s API. That simulates the users behaviour to test the correctness of the API and make sure future development in the API doesn’t break anything. This is an aggregator tool, the purpose of which is to get the results of these tests, save them properly into a database (MySQL) and visualize on the front side.

## Usage

### Backend

#### First startup

Navigate to you backend folder in your terminal, then type in

[`npm install`]

Then continue with the usual startup in the next section.

#### Every satrtup

Navigate to the backend folder in your terminal, then type in

[`docker-compose up`]

You might need to use sudo with the command.

![Backend-startup](media/Backend.png)

Do not close the terminal after it started succesfully.

### Frontend

#### First startup

Navigate to the frontend folder in your terminal, then type in

[`npm install`]

Then continue with the usual startup in the next section.

#### Every startup

Navigate to your frontend folder in your terminal, then type in

[`ng serve`]

![Frontend-startup](media/Frontend.png)

Do not close the terminal after it started succesfully.