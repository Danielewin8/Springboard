// Id to use for removal 
let currentId = 0;

// list of movies 
let movies = [];

// data using the title and rating for appending, and adding a delete button  
function result(data) {
    return `
    <tr>
        <td>${data.title}</td>
        <td>${data.rating}</td>
        <td>
          <button class="btn btn-danger" data-delete-id=${data.currentId}>Delete</button>
        </td>
    <tr>
    `;
}

$(function () {
    // Appends the value of the inputs to movies array.
    $("#form").on("submit", function (evt) {
        evt.preventDefault();
        let title = $("#name").val();
        let rating = $("#rating").val();

        let submissions = { title, rating, currentId };
        const appendedData = result(submissions);

        currentId++
        movies.push(submissions);

        $("#movie-table-body").append(appendedData);
        $("#form").trigger("reset");
    });
    
    $("tbody").on("click", ".btn.btn-danger", function (evt) {
        // find the index where this movie is
        let index = movies.findIndex(movie => movie.currentId === +$(evt.target).data("deleteId"))

        // remove it from the array of movies
        movies.splice(index, 1)

        // remove it from the DOM
        $(evt.target)
            .closest("tr")
            .remove();

    });
})