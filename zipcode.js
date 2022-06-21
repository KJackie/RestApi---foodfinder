function geocodeResponseToCityState(geocodeJSON) { //will return and array of matching {city,state} objects
    var parsedLocalities = [];
    if (geocodeJSON.results.length) {
        for (var i = 0; i < geocodeJSON.results.length; i++) {
            var result = geocodeJSON.results[i];

            var locality = {};
            for (var j = 0; j < result.address_components.length; j++) {
                var types = result.address_components[j].types;
                for (var k = 0; k < types.length; k++) {
                    if (types[k] == 'locality') {
                        locality.city = result.address_components[j].long_name;
                    } else if (types[k] == 'administrative_area_level_1') {
                        locality.state = result.address_components[j].short_name;
                    }
                }
            }
            parsedLocalities.push(locality);

            //check for additional cities within this zip code
            if (result.postcode_localities) {
                for (var l = 0; l < result.postcode_localities.length; l++) {
                    parsedLocalities.push({ city: result.postcode_localities[l], state: locality.state });
                }
            }
        }
    } else {
        console.log('error: no address components found');
    }
    return parsedLocalities;
}
function fillCityAndStateFields(localities) {
    var locality = localities[0];

    $('#city').val(locality.city);
    $('#state').val(locality.state);

    var $input;

    if (localities.length > 1) { //possibly create a dropdown if we have multiple cities in the result.
        var $select = $(document.createElement('select'));
        for (var i = 0; i < localities.length; i++) {
            var city = localities[i].city;
            var $option = $(document.createElement('option'));
            $option.html(city);
            $option.attr('value', city);
            if (i == 0) {
                $option.attr('selected', 'selected');
            }
            $select.append($option);
            $select.attr('id', 'city');
        }
        $input = $select;
    } else {
        var city = localities[0].city;
        var $text = $(document.createElement('input'));
        $text.attr('value', city);
        $text.attr('type', 'text');
        $input = $text;
    }

    $('#city-input-wrapper').html($input);
}