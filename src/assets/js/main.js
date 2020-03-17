function myFunction() {
    const myVar = setTimeout(showPage, 3000);
    document.getElementById("visible").style.overflow = "hidden";
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("visible").style.overflow = "auto";
}







