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
function EventListItem(event) {
  const $li = document.createElement("li");
  $li.innerHTML = `
  <a href= "#selected">${event.name}</a>
  `;
  $li.addEventListener("click", () => getEvent(event.id));
  return $li;
}

/** A list of names of all artists */
function EventList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("parties");

  const $events = events.map(EventListItem);
  $ul.replaceChildren(...$events);
  return $ul;
}

/** Detailed information about the selected artist */
function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an event to learn more.";
    return $p;
  }

  const $section = document.createElement("section");
  $section.innerHTML = `
<section class="event">
  <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
  <figure>
    <img alt="${selectedEvent.date}" src="${selectedEvent.location}" />
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
        <h2>Upcoming Parties</h2>
        <EventList></EventList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <EventDetails></EventDetails>
      </section>
    </main>
  `;
  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("EventDetails").replaceWith(EventDetails());
}

async function init() {
  await getArtists();
  render();
}

init();

//render();
//getArtists();
