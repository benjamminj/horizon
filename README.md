# Horizon
###### _Count remaining time till sunrise and sunset using ReactJS_

### About

Ever wish you knew _exactly_ how long you had until you needed to go outside and catch that beautiful sunset? Or when you need to go to bed in order to see the sunrise _and_ not end up sleep-deprived? _Horizon_ provides a simple, fun interface to see how long you have before that sunset/sunrise.

### Screenshots

![](http://i.imgur.com/p7DguL1.png) ![](http://i.imgur.com/YxI5QEo.png)
![](http://i.imgur.com/uJSkeB1.png)
![](http://i.imgur.com/vE69ZLw.png)
![](http://i.imgur.com/ALD6IMI.png)
![](http://i.imgur.com/O8F32tl.png)

### Technologies Used

##### Client
* [Create React App](https://github.com/facebookincubator/create-react-app)
* [ReactJS](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)

##### Server
* [ExpressJS](http://expressjs.com/)

##### Style Guide
* [Javascript Standard Style Guide](http://standardjs.com/)

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

### Issues

If the app isn't working the way it's supposed, I'd love to know! You can submit issues or suggestions on the [Github issue tracker](https://github.com/benjaminj6/horizon/issues)
