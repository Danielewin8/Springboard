1. Issues with the set up for this app. Not sure I would define these as "bugs", but they are an issue nonetheless. First, running the tests does not automatically pass as the assignment says it should. I believe this was due to an outdated module when installing the package.json, since running npm audit fix --force fixed the issue and allowed the tests to run properly. Second, npm seed does not actually do anything, it returns errors saying the db's dont exist and doesn't create any tables for me. So I manually just made the db's myself, after this I could rerun npm seed and it worked properly.

2. In the user model, the findAll method accepts two arguments (username, password). I do not see the use for this or why they are passed in. I removed them and it had no effect on any testing. Not sure if would call this a bug persay.

3. In the auth.js routes file, the route for logging in does not await the authentication method in the async function. By not awaiting the authentication users could log in with the wrong credentials. Added await.

4. The authUser middleware function currently "decodes" the token instead of verifying. Changed to jwt.verify.

5. In the users.js routes file, the route for patching or updating a user uses the three middleware functions, one including the requireAdmin function. If a logged in user who is not an admin tries to update themselves, they can't. Removed the requireAdmin middleware function.

6. In the users.js routes file, the delete route does not await the results of the deletion, could miss errors if someting like the wrong username was entered. Added await.