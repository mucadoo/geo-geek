function loadPage(page) {
    if ($('.navbar a[href="#!' + page + '"]').length && !$('.navbar a[href="#!' + page + '"]').hasClass('selected')) {
        $('.navbar a').removeClass('selected');
        $('.navbar a[href="#!' + page + '"]').addClass('selected');
    }
    if (page == "map_explorer" && sessionStorage.country) {
        showCountryInfo(sessionStorage.country, sessionStorage.country_name);
    } else if (page == "rankings" && sessionStorage.rank) {
        loadRanking(sessionStorage.rank);
    } else {
        $('#' + page + '_page').fadeIn("slow", function () {
            $('#' + page + '_page').addClass("active");
        });
        if (page == "map_explorer") {
            showMap();
        }
    }
}

function showCountryInfo(country, title) {
    sessionStorage.country = country;
    sessionStorage.country_name = title;

    // Find the country info from the preloaded data using TaffyDB
    var tgt_country = countries_info({ISO_code: country}).first();

    if (tgt_country) {
        $('#country_info_page #country_flag').attr("src", tgt_country.flagUrl);
        $('#country_info_page h2.country_name').text(title);
        $('#country_info_page #description').text(tgt_country.description);
        $('#country_info_page #capital').text(tgt_country.capital);
        $('#country_info_page #largest_city').text(tgt_country.largest_city);
        $('#country_info_page #language').text(tgt_country.official_language);
        $('#country_info_page #demonym').text(tgt_country.demonym);
        $('#country_info_page #government').text(tgt_country.government);
        $('#country_info_page #area').text(tgt_country.area_km2);
        $('#country_info_page #population').text(tgt_country.population);
        $('#country_info_page #gdp').text(tgt_country.GDP);
        $('#country_info_page #hdi').text(tgt_country.HDI);
        $('#country_info_page #currency').text(tgt_country.currency);
        $('#country_info_page #time_zone').text(tgt_country.time_zone);
        $('#country_info_page #call_code').text(tgt_country.calling_code);
        $('#country_info_page #iso_code').text(tgt_country.ISO_code);
        $('#country_info_page #tld').text(tgt_country.internet_TLD);

        if ($('section').hasClass('active')) {
            $('section.active').fadeOut("slow", function () {
                loadPage("country_info");
            });
            $('section').removeClass("active");
        } else {
            loadPage("country_info");
        }
    } else {
        console.log('Country not found: ' + country);
    }
}

function loadRanking(name) {
    sessionStorage.rank = name;
    var sortedCountries;
    var value_name;
    var prop_name;

    switch(name) {
        case 'Most populous countries':
            sortedCountries = countries_info().order("population desc").limit(5).get();
            value_name = 'Population';
            prop_name = 'population';
            break;
        case 'Less populous countries':
            sortedCountries = countries_info({population: {gt: 0}}).order("population asec").limit(5).get();
            value_name = 'Population';
            prop_name = 'population';
            break;
        case 'Larger countries':
            sortedCountries = countries_info().order("area_km2 desc").limit(5).get();
            value_name = 'Area (km²)';
            prop_name = 'area_km2';
            break;
        case 'Smaller countries':
            sortedCountries = countries_info({area_km2: {gt: 0}}).order("area_km2 asec").limit(5).get();
            value_name = 'Area (km²)';
            prop_name = 'area_km2';
            break;
        case 'Most populated countries':
            sortedCountries = countries_info().order("density_km2 desc").limit(5).get();
            value_name = 'Population Density (per km²)';
            prop_name = 'density_km2';
            break;
        case 'Less populated countries':
            sortedCountries = countries_info({density_km2: {gt: 0}}).order("density_km2 asec").limit(5).get();
            value_name = 'Population Density (per km²)';
            prop_name = 'density_km2';
            break;
        default:
            console.log('Unknown ranking: ' + name);
            return;
    }

    $('#inside_ranking_page h2').text(name);
    $('#inside_ranking_page thead tr th:eq(2)').text(value_name);

    for (var i = 0; i < sortedCountries.length; i++) {
        var country = sortedCountries[i];
        $('#inside_ranking_page tbody tr:eq(' + i + ') td:eq(0)').text(i + 1);
        $('#inside_ranking_page tbody tr:eq(' + i + ') td:eq(1)').text(country.name);
        $('#inside_ranking_page tbody tr:eq(' + i + ') td:eq(2)').text(country[prop_name]);
    }

    if ($('section').hasClass('active')) {
        $('section.active').fadeOut("slow", function () {
            loadPage("inside_ranking");
        });
        $('section').removeClass("active");
    } else {
        loadPage("inside_ranking");
    }
}

function showMap() {
    $('#map_container').remove();
    $("#map_explorer_page").append("<div id='map_container'></div>");

    // Load the SVG file
    $.get('media/back_icon.svg', function(data) {
        var svgPath = $(data).find('path').attr('d');

        var worldDataProvider = {
            map: "worldLow",
            getAreasFromMap: true,
            images: [{
                svgPath: svgPath,
                id: "backButton",
                label: "Back to continents map",
                rollOverColor: "#9a7bca",
                labelRollOverColor: "#9a7bca",
                useTargetsZoomValues: true,
                left: 30,
                bottom: 30,
                labelFontSize: 15,
                selectable: true
            }]
        };

        var continentsDataProvider = {
            map: "continentsLow",
            areas: [{
                id: "africa",
                linkToObject: worldDataProvider,
                color: "#000",
                passZoomValuesToTarget: true,
                rollOverColor: "#808080",
                selectedColor: "#808080"
            }, {
                id: "asia",
                linkToObject: worldDataProvider,
                color: "#f4c300",
                passZoomValuesToTarget: true,
                rollOverColor: "#f5dc7a",
                selectedColor: "#f5dc7a"
            }, {
                id: "australia",
                linkToObject: worldDataProvider,
                color: "#0da447",
                passZoomValuesToTarget: true,
                rollOverColor: "#58a375",
                selectedColor: "#58a375"
            }, {
                id: "europe",
                linkToObject: worldDataProvider,
                color: "#0085c7",
                passZoomValuesToTarget: true,
                rollOverColor: "#63a6c7",
                selectedColor: "#63a6c7"
            }, {
                id: "north_america",
                linkToObject: worldDataProvider,
                color: "#df0024",
                passZoomValuesToTarget: true,
                rollOverColor: "#de6f81",
                selectedColor: "#de6f81"
            }, {
                id: "south_america",
                linkToObject: worldDataProvider,
                color: "#df4400",
                passZoomValuesToTarget: true,
                rollOverColor: "#de906f",
                selectedColor: "#de906f"
            }]
        };

        var map = AmCharts.makeChart("map_container", {
            type: "map",
            "theme": "none",
            pathToImages: "script/libs/ammap/images/",
            areasSettings: {
                autoZoom: true,
                rollOverOutlineColor: "#000"
            },
            zoomControl: {buttonFillColor: "#a6bd7f", buttonRollOverColor: "#9a7bca"},
            dataProvider: continentsDataProvider
        });

        function handleGoHome() {
            map.dataProvider = continentsDataProvider;
            map.validateNow();
        }

        function handleMapObjectClick(event) {
            if (event.mapObject.id == "backButton") {
                handleGoHome();
            } else if (countries_info({ISO_code: event.mapObject.id}).first()) {
                setTimeout(function () {
                    showCountryInfo(event.mapObject.id, event.mapObject.title);
                }, 1000);
            }
        }

        map.addListener("homeButtonClicked", handleGoHome);
        map.addListener("clickMapObject", handleMapObjectClick);
    });
}

$(document).ready(function () {

    // Load the JSON data once when the page loads
    $.getJSON('script/libs/countries.min.json', function(data) {
        countries_info = TAFFY(data);
    });

    var index_link = window.location.href.indexOf("#!");
    $('a[href^="#!"]').click(function () {
        var page_to_load = $(this).attr('href').substring(2);
        if (window.location.href.indexOf('#!' + page_to_load) < 0 && $("section").hasClass("active")) {
            $('section.active').fadeOut("slow", function () {
                loadPage(page_to_load);
            });
            $('section').removeClass("active");
        } else {
            return false;
        }
    });
    if (index_link < 0) {
        loadPage("home");
    } else {
        var page_to_load = window.location.href.substring(index_link + 2);
        loadPage(page_to_load);
    }

    $("#rankings_page article").click(function () {
        loadRanking($(this).children('p').text());
    });

    $("#back_to_map").click(function () {
        sessionStorage.country = "";
        $('section.active').fadeOut("slow", function () {
            loadPage("map_explorer");
        });
        $('section').removeClass("active");
    });

    $("#back_to_ranks").click(function () {
        sessionStorage.rank = "";
        $('section.active').fadeOut("slow", function () {
            loadPage("rankings");
        });
        $('section').removeClass("active");
    });

    $('#contact_page input, #contact_page textarea').focusout(function () {
        if ($(this).val() == "") {
            $(this).addClass("error");
        } else {
            $(this).removeClass("error");
        }
    });
    $('#contact_page input, #contact_page textarea').keyup(function () {
        if ($(this).val() == "") {
            $(this).addClass("error");
        } else {
            $(this).removeClass("error");
        }
    });

    $('form').submit(function () {
        if ($('#contact_name').val() == "" || $('#contact_message').val() == "" || $('#contact_meial').val() == "") {
            alert('Preencha todos os campos do formulário antes de submeter');
        }
        $('#contact_page input, #contact_page textarea').each(function () {
            if ($(this).val() == "") {
                $(this).addClass("error");
            }
        });
        return false;
    });
});