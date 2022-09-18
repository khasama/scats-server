let addContent, editContent, currentMovie;
$(document).ready(function () {
    $("#dataTable").DataTable();
    $("#table-genre").DataTable();

    ClassicEditor.create(document.querySelector("#addContent")).then(
        (editor) => {
            addContent = editor;
        }
    );
    ClassicEditor.create(document.querySelector("#editContent")).then(
        (editor) => {
            editContent = editor;
        }
    );

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

    $("#newServer").click(() => {
        const server = $("#addServer").val().trim();
        const description = $("#addServerDesc").val().trim();
        if (server && description) {
            $.ajax({
                type: "POST",
                url: `/api/v1/server/`,
                data: {
                    server,
                    description,
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

    $("#updateServer").click(() => {
        const server = $("#editServer").val().trim();
        const description = $("#editServerDesc").val().trim();
        const id = $("#idServer").val();
        if (server && description) {
            $.ajax({
                type: "PUT",
                url: `/api/v1/server/${id}`,
                data: {
                    server,
                    description,
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

    $("#newType").click(() => {
        const type = $("#addType").val().trim();
        if (type) {
            $.ajax({
                type: "POST",
                url: `/api/v1/type/`,
                data: {
                    type,
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

    $("#updateType").click(() => {
        const type = $("#editType").val().trim();
        const id = $("#idType").val();
        if (type) {
            $.ajax({
                type: "PUT",
                url: `/api/v1/type/${id}`,
                data: {
                    type,
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

    $("#newMovie").click(() => {
        const name = $("#addName").val().trim();
        const othername = $("#addOtherName").val().trim();
        const content = addContent.getData();
        const thumb = $("#addThumb").val().trim();
        const background = $("#addBackground").val().trim();
        const year = $("#addYear").val();
        const country = $("#addCountry").val();
        const type = $("#addType").val();
        const server = $("#addServer").val();
        if (
            name &&
            othername &&
            content &&
            thumb &&
            background &&
            year &&
            country &&
            type &&
            server
        ) {
            $.ajax({
                type: "POST",
                url: `/api/v1/movie/`,
                data: {
                    name,
                    othername,
                    content,
                    thumb,
                    background,
                    year,
                    country,
                    type,
                    server,
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

    $("#updateMovie").click(() => {
        const id = $("#idMovie").val();
        const name = $("#editName").val().trim();
        const othername = $("#editOtherName").val().trim();
        const content = editContent.getData();
        const thumb = $("#editThumb").val().trim();
        const background = $("#editBackground").val().trim();
        const year = $("#editYear").val();
        const country = $("#editCountry").val();
        const type = $("#editType").val();
        const server = $("#editServer").val();
        const status = $("#editStatus").val();
        const viewed = $("#editViewed").val().trim();
        const liked = $("#editLiked").val().trim();
        if (
            name &&
            othername &&
            content &&
            thumb &&
            background &&
            year &&
            country &&
            type &&
            server &&
            status &&
            viewed &&
            liked
        ) {
            $.ajax({
                type: "PUT",
                url: `/api/v1/movie/${id}`,
                data: {
                    name,
                    othername,
                    content,
                    thumb,
                    background,
                    year,
                    country,
                    type,
                    server,
                    status,
                    viewed,
                    liked,
                },
                success: (result) => {
                    console.log(result);
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

    $("#newEpisode").click(() => {
        const episode = $("#addEp").val().trim();
        const link = $("#addEpLink").val().trim();
        const idServer = $("#idMainServer").val().trim();
        const idMovie = $("#idMovie").val().trim();
        if (episode && link) {
            $.ajax({
                type: "POST",
                url: `/api/v1/episode/`,
                data: {
                    episode,
                    link,
                    idServer,
                    idMovie,
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

    $("#newLink").click(() => {
        const episode = $("#updateEp").val().trim();
        const link = $("#addLink").val().trim();
        const idServer = $("#addLinkServer").val().trim();
        const idMovie = $("#idMovie").val().trim();
        if (episode && link) {
            $.ajax({
                type: "POST",
                url: `/api/v1/episode/`,
                data: {
                    episode,
                    link,
                    idServer,
                    idMovie,
                },
                success: (result) => {
                    if (result.status == "success") {
                        const l = result.data;
                        $("#list-link").append(
                            `
                            <a href="javascript:void(0)" class="btn btn-secondary" 
                            data-id="${l.idEpisode}" onclick="getLink(this)">
                                ${l.Server}
                            </a>
                            `
                        )
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

    $("#saveUpdateLink").click(() => {
        const link = $("#updateLink").val().trim();
        const idEpisode = $("#idEpisode").val().trim();
        if (link) {
            $.ajax({
                type: "PUT",
                url: `/api/v1/episode/${idEpisode}`,
                data: {
                    link,
                },
                success: (result) => {
                    if (result.status == "success") {
                        const l = result.data;
                        alert(result.status);
                        setLinkInfor(l);
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

    $("#deleteLink").click(() => {
        const currentServer = $("#deleteLink").attr("data-cs");
        const mainServer = $("#deleteLink").attr("data-ms");
        const idMovie = $("#idMovie").val().trim();
        const episode = $("#updateEp").val().trim();
        const idEpisode = $("#idEpisode").val().trim();
        if (confirm("Are you sure about that ???")) {
            if (idEpisode) {
                $.ajax({
                    type: "DELETE",
                    url: `/api/v1/episode/${idEpisode}`,
                    success: (result) => {
                        if (result.status == "success") {
                            if (currentServer == mainServer) {
                                location.reload();
                            } else {
                                $.ajax({
                                    url: `/api/v1/episode/full-link/${idMovie}-${episode}`,
                                    success: (rs) => {
                                        if (rs.status == "success") {
                                            const links = rs.data;
                                            clearInfor();
                                            $("#episode-detail").show();
                                            setListLink(links);
                                        } else {
                                            alert(rs.message);
                                        }
                                    },
                                    error: (err) => {
                                        console.log(err);
                                    },
                                });
                            }
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

function getInforServer(ele) {
    const id = $(ele).attr("data-id");
    $.ajax({
        url: `/api/v1/server/${id}`,
        success: (result) => {
            if (result.status == "success") {
                const server = result.data;
                $("#editServer").val(server.Server);
                $("#editServerDesc").val(server.ServerDescription);
                $("#idServer").val(server.idServer);
                $("#editServerModal").modal("show");
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            console.log(err);
        },
    });
}

function deleteServer(ele) {
    const id = $(ele).attr("data-id");
    if (confirm("Are you sure about that ???")) {
        $.ajax({
            type: "DELETE",
            url: `/api/v1/server/${id}`,
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

function getInforType(ele) {
    const id = $(ele).attr("data-id");
    $.ajax({
        url: `/api/v1/type/${id}`,
        success: (result) => {
            if (result.status == "success") {
                const type = result.data;
                $("#editType").val(type.Type);
                $("#idType").val(type.idType);
                $("#editTypeModal").modal("show");
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            console.log(err);
        },
    });
}

function deleteType(ele) {
    const id = $(ele).attr("data-id");
    if (confirm("Are you sure about that ???")) {
        $.ajax({
            type: "DELETE",
            url: `/api/v1/type/${id}`,
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

function getGenresOfMovie(ele) {
    const id = $(ele).attr("data-id");
    currentMovie = id;
    $.ajax({
        url: `/api/v1/genre/genre-movie/${id}`,
        success: (result) => {
            if (result.status == "success") {
                const genres = result.data;
                updateListGenres(genres);
                $("#genreModal").modal("show");
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            console.log(err);
        },
    });
}

function addGenreOfMovie(ele) {
    const idGenre = $(ele).attr("data-id");
    const idMovie = currentMovie;
    $.ajax({
        type: "POST",
        url: `/api/v1/genre/genre-movie/`,
        data: {
            idGenre,
            idMovie,
        },
        success: (result) => {
            if (result.status == "success") {
                const genres = result.data;
                updateListGenres(genres);
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            console.log(err);
        },
    });
}

function deleteGenreMovie(ele) {
    const idGenreMovie = $(ele).attr("data-id");
    $.ajax({
        type: "DELETE",
        url: `/api/v1/genre/genre-movie/${idGenreMovie}`,
        success: (result) => {
            if (result.status == "success") {
                $(ele).parent().remove();
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            console.log(err);
        },
    });
}

function updateListGenres(genres) {
    const list = $("#list-genre");
    list.html("");
    genres.forEach((ele) => {
        list.append(
            `
            <div class="bg-secondary d-inline-block p-2 m-1">
                ${ele.Genre}
                <a href="javascript:void(0)" class="text-danger mx-1" 
                onclick='deleteGenreMovie(this)' data-id='${ele.idGenreMovie}'>
                    <i class="fa-solid fa-xmark"></i>
                </a>
            </div>
            `
        );
    });
}

function getFullLink(ele) {
    const idMovie = $(ele).attr("data-movie");
    const episode = $(ele).attr("data-episode");
    $.ajax({
        url: `/api/v1/episode/full-link/${idMovie}-${episode}`,
        success: (result) => {
            if (result.status == "success") {
                const links = result.data;
                clearInfor();
                $("#episode-detail").show();
                setListLink(links);
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            console.log(err);
        },
    });
}

function setListLink(links) {
    const list = $("#list-link");
    list.html("");
    links.forEach((ele) => {
        list.append(
            `
            <a href="javascript:void(0)" class="btn btn-secondary" 
            data-id="${ele.idEpisode}" onclick="getLink(this)">
                ${ele.Server}
            </a>
            `
        );
    });
}

function getLink(ele) {
    const id = $(ele).attr("data-id");
    $.ajax({
        url: `/api/v1/episode/${id}`,
        success: (result) => {
            if (result.status == "success") {
                const link = result.data;
                setLinkInfor(link);
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            console.log(err);
        },
    });
}

function setLinkInfor(link) {
    $("#player").attr("src", link.Link);
    $("#updateEp").val(link.Episode);
    $("#updateServer").val(link.Server);
    $("#updateLink").val(link.Link);
    $("#idEpisode").val(link.idEpisode);
    $("#deleteLink").attr("data-cs", link.idServer);
}

function clearInfor() {
    $("#player").attr("src", '');
    $("#updateEp").val('');
    $("#updateServer").val('');
    $("#updateLink").val('');
    $("#idEpisode").val('');
}

function login() {
    const username = $("#username").val();
    const password = $("#password").val();
    if (username && password) {
        $.ajax({
            type: "POST",
            url: `/api/v1/user/login-admin`,
            data: {
                username,
                password
            },
            success: (result) => {
                if (result.status == "success") {
                    alert(result.status);
                    window.location = '/admin';
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
}

function logout() {
    $.ajax({
        url: `/api/v1/user/logout`,
        success: (result) => {
            if (result.status == "success") {
                window.location = '/login';
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            console.log(err);
        },
    });
}