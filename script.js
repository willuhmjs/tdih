const today = new Date();
const [month, day] = [("0" + (today.getMonth() + 1)).slice(-2), ("0" + today.getDate()).slice(-2)];

async function wikipedia() { // wikipedia onthisday api
  const information = {
    births: [],
    deaths: [],
    events: [],
    holidays: []
  };
  // get the data from wikipedia
  const data = await $.get(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`);
  // sort the data in to categories, list only the main content
  Object.keys(information).forEach(key => {
    data[key].forEach(item => {
      information[key].push(item.text);
    });
  });
  return information;
};

$(document).ready(async function () {
  $(".tdihHeader").text(`This Day In History: ${month}/${day}`);
  $(".tdihData:not(#defaultContainer)").hide();

  const wikipediaInfo = await wikipedia();
  const buttons = Object.keys(wikipediaInfo);
  for (category in wikipediaInfo) {
    wikipediaInfo[category].forEach(fact => {
      $(`#${category}Container`).append(`<p class="mt-4 mb-4">${fact}</p>`);
    })
  }
  buttons.forEach(button => {
    $(`#${button}Button`).click(function () {
      $(".tdihData").hide();
      $(`#${button}Container`).show();
    })
  })
});
