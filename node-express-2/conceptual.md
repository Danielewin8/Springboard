### Conceptual Exercise

Answer the following questions below:

- What is a JWT?

A JWT stands for a JSON web token. A token is used for authentication and storing data, and are comprised of a Header, a Payload, and a Signature.

- What is the signature portion of the JWT?  What does it do?

Of the three parts of a JWT, the signature is the last, and provides the secret key for providing proof of correct user.

- If a JWT is intercepted, can the attacker see what's inside the payload?

Yes a jwt can be decoded and read fairly easily.

- How can you implement authentication with a JWT?  Describe how it works at a high level.

During a login request, a token is made and signed, then stored in the browser. For any following request that requires authentication, the token should be included and verified. An easy way to do this is through a middleware function that can be called whenever said requests are being made.

- Compare and contrast unit, integration and end-to-end tests.

Unit tests test a single functionality, integration tests multiple different functions that interact with one another, and end-to-end tests the entire functionality of the application.

- What is a mock? What are some things you would mock?

Primarily used for unit tests, a mock is an object that simulates a specific behavior of a complicated test. Something like an api call.

- What is continuous integration?

The practice of making smaller changes to your code more frequently, instead of all at once later on.

- What is an environment variable and what are they used for?

Information and data that is stored and changes the entire app's usage. For example, we have made environments in express for strictly testing, allowing us to use the app's functionality with a seperate database for tests instead of the app's main db.

- What is TDD? What are some benefits and drawbacks?

TDD stands for Test-driven-development, which is the practice of writing and creating tests before creating the application itself. This can be seen as maybe detremental at first, as it can slow down the rate of development of a project potetnially, but can make it beneficial in the long run. As your code and application develops, you will be constantly applying and confirming through testing that everything is functioning properly. So later on when more changes to your code are made, the chances of it breaking or failing other previous parts of the application are lower.

- What is the value of using JSONSchema for validation?

To use an easy to maintain validation system, that can reduce the amount of code needed for processing and validating data. 

- What are some ways to decide which code to test?

Whatever are the most important functions that allow your app to work to its full potential. If something can break the entire app, test it.

- What does `RETURNING` do in SQL? When would you use it?

The RETURNING clause allows you to recieve the results of things like posting or patching data immediately. Usable any time a change request like stated before is used! Instead of having to write a seperate SELECT statement after the fact.

- What are some differences between Web Sockets and HTTP?

I believe web sockets are beneficial as when requests are made, they provide a consistent connection between servers and clients, allowing them to update or change data as it is recieved, while an http request just makes the request and is done when it is finished.

- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?

Definitely prefer Flask (And python in general). The code needed  for writing in Flask to me was way more intuitive and easy to understand/write. All the pieces needed for a Flask app (models, authentication, tests, etc) to me were easier to work with and more digestable in terms of how they worked together as a whole. Also much prefered having SQLALchemy to use instead of having to actually make SQL queries in Express. JavaScript in general is still a big challenge for me in writing compared to python, and even though I felt I got a ton of good practice in with repetitively writing things for Express, Express just felt like a lot "more" to remember. So much importing and exporting across multiple different types of files (models, middleware, testing, config, and more etc etc) got a little overwhelming for me. I am curious to see how I feel about writing in JavaScript moving forward as I'm preparing to start learning front end stuff again with React.