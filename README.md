# Receipt Processing Server


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Clone or fork this repository to make sure you have the files locally.
```console
git clone https://github.com/nicholasboyce/fetch-receipt-processor.git
```

I highly recommend using Docker to run this containerized app. Although this app uses SQLite, it uses it as an in-memory database, and so there's no need to use any database images. 

After cloning this repo with the action above, make sure you're in the top of the project folder. This app was linted using ESLint and formatted using Prettier before upload, but if you make changes and would like to lint and format afterwards, you can use

```console
npm run lint
```

and 

```console
npm run format
```

respectively. You can change the ESLint rules in the eslint.config.mjs file, and the Prettier rules in the .prettierrc.json file.

### Testing

If you'd like to test the code, you can run automated testing against the .test.ts files in the tests folder. I used the new native Node test runner. To run all the tests, you can run

```console
npm run test
```

while at the top of the folder, and you should see the results in the console. I implemented unit testing for the components of the service layer that calculated the points for the receipt, and integration testing for the API layer, as well as for the service layer functions that make calls to the database (through the repository layer).

### Running the App

If you have Docker installed on your computer, you can build the image of this app using the Dockerfile in the root:

```console
docker build -t <whatever-name-you-choose> .
```

Once the image is built, you can run it in detached mode (have access to your command line in the shell you run this in) with the following command:

```console
docker run -d -p <port-of-your-choosing>:7833 <whatever-name-you-chose>
```

You can check to see if the image is running properly by running:

```console
docker ps
```

and at least one of the rows should have the name you chose underneath the "IMAGE" column.
For convenience's sake, if you'd like to check out the logs from the app within the container, the Docker GUI is pretty accessible.

To stop the image's container, you can run
```console
docker stop <container-id>
```  

NOTE ON PORTS: This app is hard-coded to run on port 7833. If you'd like to change this, you'll need to change it in the index.ts file in the root and re-build the app.

## Notes

Regarding testing, I made sure to test all given examples in the original assignment repository to make sure that the server gives the expected results and conforms to the specified API. I used the supertest library to test the API via automated testing, but I also went to Postman to manually confirm that the app was behaving as expected. You can use Postman, curl, or whatever similar tool you'd like to interact with the API when the app is being run.

I saved the receipt instead of just saving the id and the points associated with it. While doing the latter would have been (much) simpler, I couldn't help but think about real life and the kinds of things you might want to save the receipt information for. I'd really love to have a discussion about this!

I tested what I felt like were the most comprehensive layers to test (API/Controller, Service) but was unsure about whether or not I should also independently test the repository layer. It'd be great to learn a bit more about best practices/ how things are often done at Fetch.

The API didn't seem to specify what status code to send for endpoints beyond the ones specified, so I just had the app send 404 back with a JSON object. Likewise, I wasn't sure for the specified BadRequest and NotFound responses whether or not to send the descriptions as text or JSON, so I chose JSON.

Lastly, I'd like to try building the equivalent of this in Go in the future. I'm not as familiar with all of the tooling a Go server would require, but it'd be good to give it a go and learn a bit more about the ecosystem.