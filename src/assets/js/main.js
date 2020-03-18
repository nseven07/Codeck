function myFunction() {
    const myVar = setTimeout(showPage, 3000);
    document.getElementById("visible").style.overflow = "hidden";
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("visible").style.overflow = "auto";
}

$(document).ready(function () {
    $('.staff').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
        speed: 300,
    })
});
