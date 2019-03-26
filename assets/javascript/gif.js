var sports = ["hockey", "snowboarding","golf"];



        function createButtons() {

            $("#buttons").empty();

            sports.forEach(function (spt, index) {
                console.log(index);

                var btn = $("<button  class=btn-lg>");

                btn.addClass("newSport");

                btn.attr("data-sport", spt);

                btn.text(spt);

                $("#buttons").append(btn);
            });
        };

        $("#new-sport").on("click", function (e) {

            e.preventDefault();

            var newSport = $("#input-area").val().trim();

            $("#input-area").val("");

            sports.push(newSport);

            createButtons();
        })

        createButtons();


        $("#buttons").on("click", "button", function display() {

            $("#where-gifs-go").empty();

            var sport = $(this).attr("data-sport");
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LJ2XOTPs4vG2CFF25DCvU86vJIQqPiiE&limit=10&q="+sport;

            console.log(queryURL);

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                var results = response.data;
                console.log(results);

                results.forEach(function (result, index) {
                    console.log(index);

                    var gifDiv = $("<div class=float-left>");

                    var rating = result.rating;

                    var p = $("<h3 class=bg-danger>").text("Rating: " + rating);

                    var giphy = $("<img>");
                    giphy.attr("src", result.images.fixed_height_still.url);
                    giphy.attr("data-still", result.images.fixed_height_still.url);
                    giphy.attr("data-animate", result.images.fixed_height.url);
                    giphy.attr("data-state", "still");
                    giphy.addClass("start");
                    

                    gifDiv.prepend(giphy, p);

                    $("#where-gifs-go").prepend(gifDiv);

                });

                // to do: create dynamic elemets for gifs

                $(".start").on("click", function () {

                    var move = $(this).attr("data-state");

                    if (move === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    };
                })
            });
        })
