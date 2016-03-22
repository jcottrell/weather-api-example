/* jshint camelcase: false */
(function ($) {
    'use strict';
    var settings, url,
        // cache jquery stuff to eventually help
        //  performance (see form TODO below)
        $weatherLoading = $('.weather-loading'),
        $weather = $('.weather'),
        $weatherImg = $weather.find('img'),
        $weatherDesc = $weather.find('.description'),
        urlRoot = 'http://api.weatherunlocked.com/api/current/',
        imgUrl = 'http://www.weatherunlocked.com/Images/icons/1/';
    // get your own appId and api key at:
    //  https://developer.weatherunlocked.com/signup
    // us zip code is for Louisville, KY (mayor's office)
    settings = {
        usZip: 'us.40202',
        appId: '12fdb211',
        key: '87035c80e41b272221a18fab8aefab48'
    };
    url = urlRoot + settings.usZip;
    url += '?app_id=' + settings.appId + '&app_key=' + settings.key;
    // TODO add a form in the html to get different zip codes and return the
    //      current weather for that zip code
    // TODO add the temperature to the display
    $.ajax(url).then(function(data) {
        if ((data.wx_icon.length > 0) && (data.wx_desc.length > 0)) {
            $weatherImg.attr('src', imgUrl + data.wx_icon)
                       .attr('alt', data.wx_desc)
                        // try to keep the jolting motion of the image down
                        //  by showing the weather api results only after
                        //  the image is fully loaded
                       .on('load', function () {
                            $weatherDesc.text(data.wx_desc);
                            $weatherLoading.addClass('hide');
                            $weather.removeClass('hide');
            });
        }
    // TODO what if the api call fails? Tell the user
    });
}(jQuery));
