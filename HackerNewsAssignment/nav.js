"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);
// submit method for submitting stories 
function navSubmitStory(evt) {
  console.debug("navSubmitStory", evt);
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}
$navSubmit.on("click", navSubmitStory);

// favorites method tab 
function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  putFavoritesOnPage();
}

$body.on("click", "#nav-favorite", navFavoritesClick);

// user stories nav tab 
function userStoriesClick(evt) {
  console.debug("userStoriesClick", evt);
  hidePageComponents();
  putUserStoriesOnPage();
}

$body.on("click", "#nav-story", userStoriesClick);
/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}