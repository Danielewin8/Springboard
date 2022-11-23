const $resultArea = $('#result-area');
const $search = $("#search");

// function that uses the data from the ajax call to add the result 
function add(res) {
    let numResults = res.data.length;
    // creates new divs for imgs(gifs) and appends them to the resultArea div 
    if (numResults) {
        let randomIdx = Math.floor(Math.random() * numResults);
        let $newDiv = $("<div>", { class: "col-md-4 col-12 mb-4" });
        let $newGif = $("<img>", { src: res.data[randomIdx].images.original.url, class: "w-100" });
        $newDiv.append($newGif);
        $resultArea.append($newDiv);
    };
};


// Handles the submission of the form 
$("form").on("submit", async function (evt) {
    evt.preventDefault();
    // Clears the search box on each use 
    let searchResult = $search.val();
    $search.val("");
    // Requests the ajax data of gifs 
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: { q: searchResult, api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym" }
    });
    add(response.data);
});