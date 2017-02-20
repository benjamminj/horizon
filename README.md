# Horizon
###### _Count the time left until sunrise / sunset using ReactJS_

### About

...To be written

### Technologies Used

* [ReactJS](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [ExpressJS](http://expressjs.com/)

### Installation

To get _Horizon_ running locally, simply follow the instructions provided below.

##### 1. Clone the repo

  ```bash
  $ git clone https://github.com/benjaminj6/horizon.git
  $ cd horizon
  ```

##### 2. Install dependecies

  ```bash
  # Using npm
  $ npm install

  # Using Yarn
  $ yarn
  ```

##### 3. Set up environment

1. Create a `.env` file in the `client` directory
2. Add the following line to `client/.env`

  ```bash
  # You may use any port you like. This is the port of the dev server that serves client html. The backend server will run on port 3001 by default
  REACT_APP_SERVER="http://localhost:3000"
  ```

##### 4. Start it up!
1. Make sure that you are in the root directory of your project
2. Start your local instance:

  ```bash
  # Using npm
  $ npm start

  # Using yarn
  $ yarn start
  ```

3. Open your browser to `http://localhost:3000`

### Roadmap to v.2

* Continue to stablize and polish the UI experience
* Add a page displaying sunrise and sunset times
* Performance improvements

### Contributing

...to be written
