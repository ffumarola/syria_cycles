# Syria Cycles

##Bike-Share Management Software

With the announcement of [Syria's brand-new bike-share system] (http://www.theonion.com/articles/bashar-alassad-introduces-syrian-bikesharing-progr,33320/), Syrian President Bashar al-Assad has asked me, Jeff, to develop the new software to power it!
    
In reality, this is a sample application put together over the course of a day to demonstrate my abilities as a developer.  Specifically:

- Use of Node.js and the Express framework
- SQL (PostgreSQL)
- Test frameworks (Mocha and Supertest)
- RESTful web service design

## Overview

The application provides the basic features necessary to run a bikeshare system, namely:

- Adding new members, stations, and bikes
- Checking the status of a station (number of bikes available, number of free docking spaces available)
- Checking out a bike from a given station as a member
- Checking a bike back into another station as a member
- Getting the trip history and personal info for a given member

See the API documentation for a more technical overview of the features

## Getting Started
- Requires Node.js, npm, and Postgresql to be installed.  Mocha is required to run tests.
- Download the source code

        git clone https://github.com/jcsicsek/syria_cycles.git

- Install NPM modules

        npm install

- Create a database named "syria\_cycles" and run db/create_db.sql

- Set an environment variable for the database connection string:

         export DATABASE_URL="postgres://USERNAME:PASSWORD@localhost/syria_cycles"

- Run the tests (tests are written for each HTTP route.  See the API documentation):

        mocha app.spec.js

- Run the app

        node app.js

## API
*Note:  All POST requests return {success: true} in the success case, or {success: false, errorMessage: error message} in an error case.*

### Create a new Bikeshare Member

####POST /members/new

- Request Object:

        {
            'name': 'Jeff',
            'keyfob': 'ABC123',
            'email': 'fake@mailinator.com'
        }

###Add a Bikeshare Station

####POST /stations/new

- Request Object:

        {
            'name': 'Union Square',
            'latitude': 40.736478,
            'longitude': -73.991164,
            'capacity': 15
        }

###Add a New Bike

####POST /bikes/new

- Request Object:

        {
            'badge': 'AA01',
            'initialStationId': 1
        }

###Get the Status of a Station

####GET /station/:id

- Response Object

        {
            'availableBikes': 9,
            'availableDocks': 6
        }

###Check-Out a Bike

####POST /bikes/checkout/:id

- Request Object:

        {
            'memberId': 1
        }

###Check-In a Bike

####POST /bikes/checkin/:id

- Request Object:

        {
            'memberId': 1,
            'stationId': 1
        }

###Get Member Info and Trip History

####GET /members/:id

- Reponse Object:

        {
          "success": true,
          "info": {
            "id": 1,
            "name": "Jeff",
            "keyfob": "ABC123",
            "email": "fake@mailinator.com"
          },
          "tripHistory": [
            {
              "id": 1,
              "start_time": "2013-11-12T23:05:00.711Z",
              "end_time": "2013-11-13T01:49:02.397Z",
              "members_id": 1,
              "bikes_id": 1,
              "start_station_id": 1,
              "end_station_id": 1,
              "in_progress": false
            },
            {
              "id": 2,
              "start_time": "2013-11-12T23:07:50.291Z",
              "end_time": "2013-11-13T01:49:02.397Z",
              "members_id": 1,
              "bikes_id": 1,
              "start_station_id": 1,
              "end_station_id": 1,
              "in_progress": false
            }
          ]
        }

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/5a9236d5b42d1bb8a8aa5b33bcc0f2a2 "githalytics.com")](http://githalytics.com/jcsicsek/syria_cycles)