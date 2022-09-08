let addContent, editShortProd;
$(document).ready(function () {
    $("#dataTable").DataTable();

    ClassicEditor.create(document.querySelector("#addContent")).then(
        (editor) => {
            addContent = editor;
        }
    );
    // ClassicEditor.create(document.querySelector("#addProdDes")).then(
    //     (editor) => {
    //         addProdDes = editor;
    //     }
    // );
    // ClassicEditor.create(document.querySelector("#editShortProd")).then(
    //     (editor) => {
    //         editShortProd = editor;
    //     }
    // );
    // ClassicEditor.create(document.querySelector("#editProdDes")).then(
    //     (editor) => {
    //         editProdDes = editor;
    //     }
    // );

    $("#newGenre").click(() => {
        const genre = $("#addGenre").val().trim();
        if (genre) {
            $.ajax({
                type: "POST",
                url: `/api/v1/genre/`,
                data: {
                    genre,
                },
                success: (result) => {
                    if (result.status == "success") {
                        alert(result.status);
                        location.reload();
                    } else {
                        alert(result.message);
                    }
                },
                error: (err) => {
                    console.log(err);
                },
            });
        } else {
            alert("Not emty !!!");
        }
    });

    $("#updateGenre").click(() => {
        const genre = $("#editGenre").val().trim();
        const id = $("#idGenre").val();
        if (genre) {
            $.ajax({
                type: "PUT",
                url: `/api/v1/genre/${id}`,
                data: {
                    genre,
                },
                success: (result) => {
                    if (result.status == "success") {
                        alert(result.status);
                        location.reload();
                    } else {
                        alert(result.message);
                    }
                },
                error: (err) => {
                    console.log(err);
                },
            });
        } else {
            alert("Not emty !!!");
        }
    });

    $("#newYear").click(() => {
        const year = $("#addYear").val().trim();
        if (year) {
            $.ajax({
                type: "POST",
                url: `/api/v1/year/`,
                data: {
                    year,
                },
                success: (result) => {
                    if (result.status == "success") {
                        alert(result.status);
                        location.reload();
                    } else {
                        alert(result.message);
                    }
                },
                error: (err) => {
                    console.log(err);
                },
            });
        } else {
            alert("Not emty !!!");
        }
    });

    $("#updateYear").click(() => {
        const year = $("#editYear").val().trim();
        const id = $("#idYear").val();
        if (year) {
            $.ajax({
                type: "PUT",
                url: `/api/v1/year/${id}`,
                data: {
                    year,
                },
                success: (result) => {
                    if (result.status == "success") {
                        alert(result.status);
                        location.reload();
                    } else {
                        alert(result.message);
                    }
                },
                error: (err) => {
                    console.log(err);
                },
            });
        } else {
            alert("Not emty !!!");
        }
    });

    $("#newCountry").click(() => {
        const country = $("#addCountry").val().trim();
        if (country) {
            $.ajax({
                type: "POST",
                url: `/api/v1/country/`,
                data: {
                    country,
                },
                success: (result) => {
                    if (result.status == "success") {
                        alert(result.status);
                        location.reload();
                    } else {
                        alert(result.message);
                    }
                },
                error: (err) => {
                    console.log(err);
                },
            });
        } else {
            alert("Not emty !!!");
        }
    });

    $("#updateCountry").click(() => {
        const country = $("#editCountry").val().trim();
        const id = $("#idCountry").val();
        if (country) {
            $.ajax({
                type: "PUT",
                url: `/api/v1/country/${id}`,
                data: {
                    country,
                },
                success: (result) => {
                    if (result.status == "success") {
                        alert(result.status);
                        location.reload();
                    } else {
                        alert(result.message);
                    }
                },
                error: (err) => {
                    console.log(err);
                },
            });
        } else {
            alert("Not emty !!!");
        }
    });
});

function getInforGenre(ele) {
    const id = $(ele).attr("data-id");
    $.ajax({
        url: `/api/v1/genre/${id}`,
        success: (result) => {
            if (result.status == "success") {
                const genre = result.data;
                $("#editGenre").val(genre.Genre);
                $("#idGenre").val(genre.idGenre);
                $("#editGenreModal").modal("show");
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            console.log(err);
        },
    });
}

function deleteGenre(ele) {
    const id = $(ele).attr("data-id");
    if (confirm("Are you sure about that ???")) {
        $.ajax({
            type: "DELETE",
            url: `/api/v1/genre/${id}`,
            success: (result) => {
                if (result.status == "success") {
                    alert(result.status);
                    location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}

function getInforYear(ele) {
    const id = $(ele).attr("data-id");
    $.ajax({
        url: `/api/v1/year/${id}`,
        success: (result) => {
            if (result.status == "success") {
                const year = result.data;
                $("#editYear").val(year.Year);
                $("#idYear").val(year.idYear);
                $("#editYearModal").modal("show");
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            console.log(err);
        },
    });
}

function deleteYear(ele) {
    const id = $(ele).attr("data-id");
    if (confirm("Are you sure about that ???")) {
        $.ajax({
            type: "DELETE",
            url: `/api/v1/year/${id}`,
            success: (result) => {
                if (result.status == "success") {
                    alert(result.status);
                    location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}

function getInforCountry(ele) {
    const id = $(ele).attr("data-id");
    $.ajax({
        url: `/api/v1/country/${id}`,
        success: (result) => {
            if (result.status == "success") {
                const country = result.data;
                $("#editCountry").val(country.Country);
                $("#idCountry").val(country.idCountry);
                $("#editCountryModal").modal("show");
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            console.log(err);
        },
    });
}

function deleteCountry(ele) {
    const id = $(ele).attr("data-id");
    if (confirm("Are you sure about that ???")) {
        $.ajax({
            type: "DELETE",
            url: `/api/v1/country/${id}`,
            success: (result) => {
                if (result.status == "success") {
                    alert(result.status);
                    location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
