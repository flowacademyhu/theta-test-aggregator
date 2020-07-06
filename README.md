![](docs/logo.svg)
# Test aggregator

## Problem and Importance


Fluidpay has a simulation tool over on it’s API that simulates the users behaviour to test the correctness of the API and make sure future development in the API doesn’t break anything. This is an aggregator tool, the purpose of which is to get the results of these tests, save them properly into a database (MySQL) and visualize on the front side.

## Usage

### Backend

You might need to use sudo with the docker commands.

#### First startup

Navigate to the backend folder in your terminal, then type in

[`docker-compose up`]

![Backend-startup](media/backendStart.png)

Open a new terminal window and type in

[`docker-compose exec theta-test-aggregator sh `]

In this window type in the following

[`npm install`]

![Backend-Npm Install](media/npmandsh.png)

[`npm run db:migrate`]

![Backend-Migrate](media/migrate.png)

[`npm run db:seed`]

![Backend-Seed](media/seed.png)

#### Every startup

Navigate to the backend folder in your terminal, then type in

[`docker-compose up`]

![Backend-startup](media/backendStart.png)

Do not close the terminal after it started succesfully.

### Frontend

#### First startup

Navigate to the frontend folder in your terminal, then type in

[`npm install`]

![Frontend-npm](media/frontendNpm.png)

Then continue with the usual startup in the next section.

#### Every startup

Navigate to your frontend folder in your terminal, then type in

[`ng serve`]

![Frontend-startup](media/frontendStart.png)

Do not close the terminal after it started succesfully.

Now you can see it in action in your browser on [`http://localhost:4200`].

## Design

This project contains 4 essnetial parts:

- A MYSQL database recieveing / updating all the incoming test results.

- A MYSQL database containing / updating / managing users.

- Express js for the backend logic.

- An Angular frontend as an interface for users.

## Development

This test aggregator was developed using Docker, Express js on the backend, and Angular on frontend.

To develop a new feature you would first start up the backend with the previously mentioned [`docker-compose up`] command in the backend folder.

You open a new terminal window and navigate into the frontend folder and use the [`ng serve`] command.

If your feature requires a new npm module on the backend side, you'd first open a new terminal window and type in

[`docker-compose exec thet-test-aggregator sh `]

and install your npm module in here.

After saving any changes on the backend docker should restart automatically and inform you of any errors while running.If this doesnt happen, you can manually restart docker by pressing [`Ctrl + C`] and typing in [`docker-compose up`] again.

If your feature requires a new npm module on the frontend side, you'd install that in the frontend folder directly.

After saving any changes on the frontend there should be an automatic restart that should inform you of any error encountered.If this doesnt happen, you can manually restart by pressing [`Ctrl + C`] and typing in [`ng serve`] again.
