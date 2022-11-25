"use strict";

const MISSING_IMAGE_URL = "http://tinyurl.com/missing-tv";
const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");

// Makes get request to retrieve show data from the TVMaze API, and maps data attributs for use.

async function getShowsByTerm(evt) {
  const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${evt}`);
  console.log(response)
  let shows = response.data.map(result => {
    let show = result.show;
    return {
      id: show.id,
      name: show.name,
      summary: show.summary,
      image: show.image ? show.image.medium : MISSING_IMAGE_URL,
    };
  });
  return shows;
}

// Appends given show data to the DOM, with a bunch of extra CSS properties.

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
      <div class="card" data-show-id="${show.id}">
        <img class="card-img-top" src="${show.image}">
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">${show.summary}</p>
          <button class="btn btn-primary get-episodes">Episodes</button>
        </div>
      </div>  
    </div>
   `);

    $showsList.append($show);
  }
}



// Takes the value of what is searched and applies it to other above functions. 
async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  const shows = await getShowsByTerm(term);
  // Hides episodes area 
  $episodesArea.hide();
  populateShows(shows);
}
// Runs searchForShowAndDisplay function on submit 
$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


// Makes get request to retrieve episode data this time from the TVMaze API, and maps data attributs again.

async function getEpisodes(id) {
  let response = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);

  let episodes = response.data.map(episode => ({
    id: episode.id,
    name: episode.name,
    season: episode.season,
    number: episode.number,
  }));

  return episodes;
}
//  Appends given episode data to the DOM 

function populateEpisodes(episodes) {
  const $episodesList = $("#episodes-list");
  $episodesList.empty();

  for (let episode of episodes) {
    let $item = $(
      `<li>${episode.name}(season ${episode.season}, episode ${episode.number})</li>`);
    $episodesList.append($item);
  }
  $("#episodes-area").show();
}

// Handles episode click button

$("#shows-list").on("click", ".get-episodes", async function handleEpisodeClick(evt) {
  let showId = $(evt.target).closest(".Show").data("show-id");
  let episodes = await getEpisodes(showId);
  populateEpisodes(episodes);
});