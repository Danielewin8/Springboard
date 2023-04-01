const BASE_URL = "http://127.0.0.1:5000/api"


// method for using form data to make new cupcake, having trouble trying to append this to list without refreshing page.
$('#new-cupcake-form').on("submit", async function(evt) {
    evt.preventDefault();

    let flavor = $("#form-flavor").val();
    let size = $("#form-size").val();
    let rating = $("#form-rating").val();
    let image = $("#form-image").val();

    const newCupcakeResponse = await axios({
        method: "POST",
        url : `${BASE_URL}/cupcakes`,
        data : {flavor, size, rating, image}
    });

    let newCupcake = newCupcakeResponse.data.cupcake;
    $("#cupcake-list").append(newCupcake);
});

// method for deleting cupcake
$('.delete-cupcake').click(deleteCupcake)

async function deleteCupcake() {
    const id = $(this).data('id')
    await axios.delete(`/api/cupcakes/${id}`)
    $(this).parent().remove()
}