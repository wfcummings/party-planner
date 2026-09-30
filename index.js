/**
 * @typedef Events
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} date
 * @property {string} location
 */

// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2608";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === State ===
let events = [];
let selectedEvent;

/** Updates state with all artists from the API */
async function getEvents() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    events = result.data;
    render();
  } catch (error) {
    alert("Sorry! We can't get the events");
  }
}

/** Updates state with a single artist from the API */
async function getEvent(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    selectedEvent = result.data;
    render();
  } catch (error) {
    alert("Sorry! Can't get Event");
  }
}

// === Components ===

/** Artist name that shows more details about the artist when clicked */
function ArtistListItem(artist) {
  const $li = document.createElement("li");
  $li.innerHTML = `
  <a href= "#selected">${artist.name}</a>
  `;
  $li.addEventListener("click", () => getArtist(artist.id));
  return $li;
}

/** A list of names of all artists */
function ArtistList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("lineup");

  const $artists = artists.map(ArtistListItem);
  $ul.replaceChildren(...$artists);
  return $ul;
}

/** Detailed information about the selected artist */
function ArtistDetails() {
  if (!selectedArtist) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an artist to learn more.";
    return $p;
  }

  const $section = document.createElement("section");
  $section.innerHTML = `
<section class="artist">
  <h3>${selectedArtist.name} #${selectedArtist.id}</h3>
  <figure>
    <img alt="${selectedArtist.name}" src="${selectedArtist.imageUrl}" />
  </figure>
  <p>${selectedArtist.description}</p>
</section>
`;

  return $section;
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Fullstack Gala</h1>
    <main>
      <section>
        <h2>Lineup</h2>
        <ArtistList></ArtistList>
      </section>
      <section id="selected">
        <h2>Artist Details</h2>
        <ArtistDetails></ArtistDetails>
      </section>
    </main>
  `;
  $app.querySelector("ArtistList").replaceWith(ArtistList());
  $app.querySelector("ArtistDetails").replaceWith(ArtistDetails());
}

async function init() {
  await getArtists();
  render();
}

init();

//render();
//getArtists();
