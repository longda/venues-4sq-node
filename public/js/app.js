

$(document).ready(function(){
  $('$btn-search').click(function(){
    var data, data_html;

    data = {
      "name": "Tripel",
      "address": "Playa Vista, CA",
      "rating": "9.1",
      "num_of_reviews": "175",
      "num_of_checkins": "97"
    };

    data_html = ich.data_temp(data);

    $('#data-table-body').append(data_html);
  });
});