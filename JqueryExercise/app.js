// Prints message when DOM is ready 
$(function () {
    console.log("Let's get ready to party with Jquery!")
});

// Gives all images inside of an article tag the class of image-center 
$('article img').addClass("image-center");

// Removes last paragraph in article 
$('article p:last-child').remove();

// Sets font size of title to be a random px from 0 to 100
$('#title').css('font-size', Math.random() * 100);

// Adds an li to an ol saying whatever 
$('ol').append($('<li>', { text: "new list item!" }));

// Emptys the aside and adds a p into it 
$('aside').empty().append($("<p>", { text: "I am a paragraph" }));

// changes the background color of the body to match the three input values 
$('.form-control').on('keyup blur change', function () {
    let red = $('.form-control').eq(0).val();
    let blue = $('.form-control').eq(1).val();
    let green = $('.form-control').eq(2).val();
    $("body").css('background-color',
        'rgb(' + red + ',' + green + ',' + blue + ')');
});

// Adds event listener to remove an image when clicked 
$('img').on('click', function (e) {
    $(e.target).remove();
});