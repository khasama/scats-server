let addContent, editContent, currentMovie;
$(document).ready(function () {
    $("#dataTable").DataTable();
    $("#table-genre").DataTable();
    jwplayer.key = "ITWMv7t88JGzI0xPwW8I0+LveiXX9SWbfdmt0ArUSyc=";


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

    $("#generator").click(() => {
        const total = parseInt($("#generatorEp").val());
        const end = $('#generatorEnd').is(":checked");
        let strEp = '';
        if (total) {
            for (let i = 1; i <= total; i++) {
                if (end && i == total) {
                    strEp += `${i}-end|`;
                } else {
                    strEp += `${i}|${i == total ? '' : '\n'}`;
                }
            }
            $("#multiEp").val(strEp);
        }
    });

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

                },
            });
        } else {
            alert("Not emty !!!");
        }
    });

    $("#newServer").click(() => {
        const server = $("#addServer").val().trim();
        const desc = $("#addServerDesc").val().trim();
        if (server && desc) {
            $.ajax({
                type: "POST",
                url: `/api/v1/server/`,
                data: {
                    server,
                    desc,
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

                },
            });
        } else {
            alert("Not emty !!!");
        }
    });

    $("#updateServer").click(() => {
        const server = $("#editServer").val().trim();
        const desc = $("#editServerDesc").val().trim();
        const id = $("#idServer").val();
        if (server && desc) {
            $.ajax({
                type: "PUT",
                url: `/api/v1/server/${id}`,
                data: {
                    server,
                    desc,
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

                },
            });
        } else {
            alert("Not emty !!!");
        }
    });

    $("#newMovie").click(() => {
        const formData = new FormData();
        const name = $("#addName").val().trim();
        const aka = $("#addOtherName").val().trim();
        const content = addContent.getData();
        const thumb = $("#addThumb")[0].files[0];
        const background = $("#addBackground")[0].files[0];
        const year = $("#addYear").val();
        const country = $("#addCountry").val();
        const type = $("#addType").val();
        const imdb = $("#addIMDB").val().trim();
        if (name && aka && content && year && country && type) {
            formData.append("name", name);
            formData.append("aka", aka);
            formData.append("content", content);
            formData.append("year", year);
            formData.append("country", country);
            formData.append("type", type);
            formData.append("thumb", thumb);
            formData.append("background", background);
            formData.append("imdb", imdb);
            $.ajax({
                type: "POST",
                url: `/api/v1/movie/`,
                data: formData,
                processData: false,
                contentType: false,
                success: (result) => {
                    if (result.status == "success") {
                        alert(result.status);
                        location.reload();
                    } else {
                        alert(result.message);
                    }
                },
                error: (err) => {

                },
            });
        } else {
            alert("Not emty !!!");
        }
    });

    $("#updateMovie").click(() => {
        const formData = new FormData();
        const id = $("#idMovie").val();
        const name = $("#editName").val().trim();
        const aka = $("#editOtherName").val().trim();
        const content = editContent.getData();
        const thumb = $("#updateThumb")[0].files[0];
        const background = $("#updateBackground")[0].files[0];
        const year = $("#editYear").val();
        const country = $("#editCountry").val();
        const type = $("#editType").val();
        const status = $("#editStatus").val();
        const viewed = $("#editViewed").val().trim();
        const liked = $("#editLiked").val().trim();
        const imdb = $("#editIMDB").val().trim();
        if (name && aka && content && year && country && type && status && viewed && liked) {
            formData.append("id", id);
            formData.append("name", name);
            formData.append("aka", aka);
            formData.append("content", content);
            formData.append("year", year);
            formData.append("country", country);
            formData.append("type", type);
            formData.append("status", status);
            formData.append("viewed", viewed);
            formData.append("liked", liked);
            formData.append("thumb", thumb);
            formData.append("background", background);
            formData.append("imdb", imdb);
            $.ajax({
                type: "PUT",
                url: `/api/v1/movie/${id}`,
                data: formData,
                processData: false,
                contentType: false,
                success: (result) => {
                    (result);
                    if (result.status == "success") {
                        alert(result.status);
                        location.reload();
                    } else {
                        alert(result.message);
                    }
                },
                error: (err) => {

                },
            });
        } else {
            alert("Not emty !!!");
        }
    });

    $("#newEpisode").click(() => {
        const episode = $("#addEp").val().trim();
        const hls = $("#addEpHls").val().trim();
        const idMovie = $("#idMovie").val().trim();
        if (episode && hls) {
            $.ajax({
                type: "POST",
                url: `/api/v1/episode/`,
                data: {
                    episode,
                    hls,
                    idMovie,
                },
                success: (result) => {
                    if (result.status == "success") {
                        const episode = result.data;
                        $("#list-eps").append(
                            `
                            <a href="javascript:void(0)" class="btn btn-warning my-2 d-block"
                                data-episode="${episode.episode}" data-hls="${episode.hls}"
                                id="ep-${episode.id}" data-id="${episode.id}" onclick="getFullLink(this)">
                                ${episode.episode}
                            </a>
                            `
                        );
                        $("#addEpisode").modal("hide");
                    } else {
                        alert(result.message);
                    }
                },
                error: (err) => {

                },
            });
        } else {
            alert("Not emty !!!");
        }
    });

    $("#newMultiEpisode").click(() => {
        const multi = $("#multiEp").val().trim();
        const idMovie = $("#idMovie").val().trim();
        if (multi && idMovie) {
            $.ajax({
                type: "POST",
                url: `/api/v1/episode/add-multi`,
                data: {
                    multi,
                    idMovie,
                },
                success: (result) => {
                    if (result.status == "success") {
                        const episodes = result.data;
                        $("#list-eps").html('')
                        episodes.forEach(episode => {
                            $("#list-eps").append(
                                `
                                <a href="javascript:void(0)" class="btn btn-warning my-2 d-block"
                                    data-episode="${episode.episode}" data-hls="${episode.hls}"
                                    id="ep-${episode.id}" data-id="${episode.id}" onclick="getFullLink(this)">
                                    ${episode.episode}
                                </a>
                                `
                            );
                        });

                        $("#addMultiEpisode").modal("hide");
                    } else {
                        alert(result.message);
                    }
                },
                error: (err) => {

                },
            });
        } else {
            alert("Not emty !!!");
        }
    });

    $("#deleteEpisode").click(() => {
        const id = $("#idEpisode").val().trim();
        if (id) {
            if (confirm("Xóa tập sẽ xóa hết những link nhúng, bạn đã chắc chưa ??")) {
                $.ajax({
                    type: "DELETE",
                    url: `/api/v1/episode/${id}`,
                    success: (result) => {
                        if (result.status == "success") {
                            $(`#ep-${id}`).remove();
                        } else {
                            alert(result.message);
                        }
                    },
                    error: (err) => {

                    },
                });
            }
        } else {
            alert("Not emty !!!");
        }
    });

    $("#newLink").click(() => {
        const link = $("#addLink").val().trim();
        const idServer = $("#addLinkServer").val().trim();
        const idEpisode = $("#idEpisode").val().trim();
        if (idEpisode && link) {
            $.ajax({
                type: "POST",
                url: `/api/v1/link/`,
                data: {
                    idEpisode,
                    link,
                    idServer,
                },
                success: (result) => {
                    if (result.status == "success") {
                        const link = result.data
                        console.l
                        $("#list-link").append(
                            `
                            <a href="javascript:void(0)" class="btn btn-secondary" id="link-${link.id}" 
                            data-id="${link.id}" data-server="${link.Server.name}" onclick="getLink(this)">
                                ${link.Server.name}
                            </a>
                            `
                        );
                        $("#addLink").val('');
                    } else {
                        alert(result.message);
                    }
                },
                error: (err) => {

                },
            });
        } else {
            alert("Not emty !!!");
        }
    });

    $("#saveUpdateLink").click(() => {
        const link = $("#updateLink").val().trim();
        const idLink = $("#idLink").val().trim();
        if (link && idLink) {
            $.ajax({
                type: "PUT",
                url: `/api/v1/link/${idLink}`,
                data: {
                    link,
                },
                success: (result) => {
                    if (result.status == "success") {
                        $("#player").attr("src", link);
                    } else {
                        alert(result.message);
                    }
                },
                error: (err) => {

                },
            });
        } else {
            alert("Not emty !!!");
        }
    });

    $("#updateHls").click(() => {
        const hls = $("#updateLink").val().trim();
        const episode = $("#updateEp").val().trim();
        const idEpisode = $("#idEpisode").val().trim();
        if (hls && idEpisode && episode) {
            $.ajax({
                type: "PUT",
                url: `/api/v1/episode/${idEpisode}`,
                data: {
                    hls,
                    episode
                },
                success: (result) => {
                    if (result.status == "success") {
                        $(`#ep-${idEpisode}`).attr("data-hls", hls)
                        jwplayer('mediaplayer').setup({
                            "sources": [
                                {
                                    "default": false,
                                    "type": "hls",
                                    "file": hls,
                                    "label": "0",
                                    "preload": "metadata"
                                }
                            ]
                        });
                    } else {
                        alert(result.message);
                    }
                },
                error: (err) => {

                },
            });
        } else {
            alert("Not emty !!!");
        }
    });

    $("#deleteLink").click(() => {
        const idLink = $("#idLink").val().trim();
        if (confirm("Are you sure about that ???")) {
            if (idLink) {
                $.ajax({
                    type: "DELETE",
                    url: `/api/v1/link/${idLink}`,
                    success: (result) => {
                        if (result.status == "success") {
                            $(`#link-${idLink}`).remove();
                            $("#idLink").val("");
                            $("#player").attr("src", '');
                            $("#updateServer").val('');
                            $("#updateLink").val('');
                        } else {
                            alert(result.message);
                        }
                    },
                    error: (err) => {

                    },
                });
            } else {
                alert("Not emty !!!");
            }
        }
    });

    $("#change").click(() => {
        const idUser = $("#idUser").val();
        const idRole = $("#role").val();
        $.ajax({
            type: "PUT",
            url: `/api/v1/user/change-role/${idUser}`,
            data: { idRole },
            success: (result) => {
                if (result.status == "success") {
                    location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: (err) => {
                alert(err.statusText);
            },
        });
    });

}).bind("ajaxError", (event, request, settings) => {
    if (request.status === 401) {
        sendRefreshToken();
    } else {
        alert(`Lỗi Server ${request.statusText}`);
    }

});

function getInforGenre(ele) {
    const id = $(ele).attr("data-id");
    $.ajax({
        url: `/api/v1/genre/${id}`,
        success: (result) => {
            if (result.status == "success") {
                const genre = result.data;
                $("#editGenre").val(genre.name);
                $("#idGenre").val(genre.id);
                $("#editGenreModal").modal("show");
            } else {
                alert(result.message);
            }
        },
        error: (err) => {

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
                (err)
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
                $("#editYear").val(year.name);
                $("#idYear").val(year.id);
                $("#editYearModal").modal("show");
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            alert(err.statusText);
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
                alert(err.statusText);
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
                $("#editCountry").val(country.name);
                $("#idCountry").val(country.id);
                $("#editCountryModal").modal("show");
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            alert(err.statusText);
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
                alert(err.statusText);
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
                $("#editServer").val(server.name);
                $("#editServerDesc").val(server.desc);
                $("#idServer").val(server.id);
                $("#editServerModal").modal("show");
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            alert(err.statusText);
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
                alert(err.statusText);
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
                $("#editType").val(type.name);
                $("#idType").val(type.id);
                $("#editTypeModal").modal("show");
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            alert(err.statusText);
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
                alert(err.statusText);
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
            alert(err.statusText);
        },
    });
}

function addGenreOfMovie(ele) {
    const idGenre = $(ele).attr("data-id");
    const idMovie = currentMovie;
    $.ajax({
        type: "POST",
        url: `/api/v1/movie/add-genre/`,
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

        },
    });
}

function deleteGenreMovie(ele) {
    const idGenre = $(ele).attr("data-id");
    $.ajax({
        type: "DELETE",
        url: `/api/v1/movie/delete-genre/${currentMovie}-${idGenre}`,
        success: (result) => {
            if (result.status == "success") {
                $(ele).parent().remove();
            } else {
                alert(result.message);
            }
        },
        error: (err) => {

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
                ${ele.name || ele.Genre.name}
                <a href="javascript:void(0)" class="text-danger mx-1" 
                onclick='deleteGenreMovie(this)' data-id='${ele.id || ele.Genre.id}'>
                    <i class="fa-solid fa-xmark"></i>
                </a>
            </div>
            `
        );
    });
}

function getFullLink(ele) {
    const hls = $(ele).attr("data-hls");
    const id = $(ele).attr("data-id");
    const ep = $(ele).attr("data-episode");
    $("#mediaplayer").show();
    $("#updateHls").show();
    $("#idEpisode").val(id);
    $("#episode-detail").show();
    $("#updateEp").val(ep);
    $("#updateLink").val(hls);

    jwplayer('mediaplayer').setup({
        "sources": [
            {
                "default": false,
                "type": "hls",
                "file": hls,
                "label": "0",
                "preload": "metadata"
            }
        ]
    });

    $.ajax({
        url: `/api/v1/link/full-link/${id}`,
        success: (result) => {
            if (result.status == "success") {
                const links = result.data;
                setListLink(links);
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            alert(err.statusText);
        },
    });

    $("#player").attr("src", '');
    $("#player").hide();
    $("#linkAction").hide();
    $("#updateServer").val('');

}

function setListLink(links) {
    const list = $("#list-link");
    list.html("");
    links.forEach((ele) => {
        list.append(
            `
            <a href="javascript:void(0)" class="btn btn-secondary" id="link-${ele.id}" 
            data-id="${ele.id}" data-server="${ele.Server.name}" onclick="getLink(this)">
                ${ele.Server.name}
            </a>
            `
        );
    });
}

function getLink(ele) {
    const id = $(ele).attr("data-id");
    const server = $(ele).attr("data-server");
    $.ajax({
        url: `/api/v1/link/${id}`,
        success: (result) => {
            if (result.status == "success") {
                const link = result.data;
                $("#mediaplayer").hide();
                $("#updateHls").hide();
                $("#player").show();
                $("#linkAction").show();
                $("#player").attr("src", link.link);
                $("#updateServer").val(server);
                $("#updateLink").val(link.link);
                $("#idLink").val(id);
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            alert(err.statusText);
        },
    });
}

function getUser(ele) {
    const id = $(ele).attr("data-id");
    $.ajax({
        url: `/api/v1/user/${id}`,
        success: (result) => {
            if (result.status == "success") {
                const user = result.data;
                $("option").removeAttr('selected')
                $("#crUser").val(user.Username);
                $("#idUser").val(user.idUser);
                $(`#${user.Role}`).attr('selected', true);
                $("#changeRole").modal("show");
            } else {
                alert(result.message);
            }
        },
        error: (err) => {

        },
    });
}

function addBanner(ele) {
    const idMovie = $(ele).attr("data-id");
    $.ajax({
        type: "POST",
        url: `/api/v1/movie/add-banner/`,
        data: {
            idMovie,
        },
        success: (result) => {
            if (result.status == "success") {
                location.reload()
            } else {
                alert(result.message);
            }
        },
        error: (err) => {

        },
    });
}

function deleteBanner(ele) {
    const idMovie = $(ele).attr("data-id");
    $.ajax({
        type: "DELETE",
        url: `/api/v1/movie/delete-banner/${idMovie}`,
        success: (result) => {
            if (result.status == "success") {
                location.reload()
            } else {
                alert(result.message);
            }
        },
        error: (err) => {

        },
    });
}

function login() {
    const username = $("#username").val();
    const password = $("#password").val();
    if (username && password) {
        $.ajax({
            type: "POST",
            url: `/api/v1/auth/login-admin`,
            data: {
                username,
                password
            },
            success: (result) => {
                if (result.status == "success") {
                    alert(result.status);
                    sessionStorage.setItem('u', JSON.stringify(result.data.user));
                    window.location = '/admin';
                } else {
                    alert(result.message);
                }
            },
            error: (err) => {

            },
        });
    } else {
        alert("Not emty !!!");
    }
}

function logout() {
    $.ajax({
        url: `/api/v1/auth/logout`,
        success: (result) => {
            if (result.status == "success") {
                sessionStorage.removeItem('u');
                window.location = '/login';
            } else {
                alert(result.message);
            }
        },
        error: (err) => {

        },
    });
}

function calculateTime(date) {
    const curentDate = new Date();
    const lastAccess = parseInt((curentDate.getTime() - Date.parse(date)) / 1000 / 60 / 60);

    if (lastAccess < 24) {
        return `${lastAccess} hour${lastAccess > 1 ? 's' : ''} ago`;
    }
    if (lastAccess >= 24 && lastAccess < 168) {
        return `${parseInt(lastAccess / 24)} day${parseInt(lastAccess / 24) > 1 ? 's' : ''} ago`;
    }
    if (lastAccess >= 168 && lastAccess < 720) {
        return `${parseInt(lastAccess / 24 / 7)} week${parseInt(lastAccess / 24 / 7) > 1 ? 's' : ''} ago`;
    }
    if (lastAccess >= 720 && lastAccess < 8760) {
        return `${parseInt(lastAccess / 24 / 7 / 30)} month${parseInt(lastAccess / 24 / 7 / 30) > 1 ? 's' : ''} ago`;
    }
    if (lastAccess >= 8760) {
        return `${parseInt(lastAccess / 24 / 365)} year${parseInt(lastAccess / 24 / 365) > 1 ? 's' : ''} ago`;
    }

}

function sendRefreshToken() {
    const u = JSON.parse(sessionStorage.getItem('u'));
    $.ajax({
        url: `/api/v1/auth/refresh-token`,
        data: { id: u.id },
        type: "POST",
        success: (result) => {
            if (result.status == "success") {
                alert("renew access token !!!");
            } else {
                window.location = '/login';
            }
        }
    });
}