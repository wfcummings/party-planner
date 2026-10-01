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
let parties = [];
let selectedParty;

async function getParties() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    parties = result.data;
    render();
  } catch (error) {
    console.error(e);
  }
}

async function getParty(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    selectedParty = result.data;
    render();
  } catch (error) {
    console.error(e);
  }
}

// === Components ===

/** Artist name that shows more details about the artist when clicked */
function PartyListItem(party) {
  const $li = document.createElement("li");
  $li.innerHTML = `
  <a href= "#selected">${party.name}</a>
  `;
  $li.addEventListener("click", () => getParty(party.id));
  return $li;
}

/** A list of names of all artists */
function PartyList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("parties");

  const $parties = parties.map(PartyListItem);
  $ul.replaceChildren(...$parties);
  return $ul;
}

/** Detailed information about the selected artist */
function PartyDetails() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }

  const $section = document.createElement("section");
  $section.innerHTML = `
<section class="event">
  <h3>${selectedParty.name} #${selectedParty.id}</h3>
  <time datetime = "${selectedParty.date}">${selectedParty.date.slice(0, 10)}</time>
  <address>${selectedParty.location}</address>
  <p>${selectedParty.description}</p>
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
        <PartyList></PartyList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
  `;
  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("PartyDetails").replaceWith(PartyDetails());
}

/*
async function init() {
  await getArtists();
  render();
}

init();
*/
render();
getParties();
