const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const output = document.getElementById("outPut");

const predictname = async (personName) => {
  const response = await fetch(
    `https://api.nationalize.io/?name=${personName}`,
  );
  return await response.json();
};

searchBtn.addEventListener("click", async (e) => {
  const fullname = searchInput.value;
  output.innerText = "";
  if (fullname === "") {
    output.innerText = "can not be empty";
    return;
  }

  searchBtn.setAttribute("disabled", true);
  searchBtn.innerHTML = `<i class="fa-solid fa-hourglass-half"></i>`;
  try {
    const { name, country } = await predictname(fullname);
    const { country_id, probability } = country[0];
    const getCountryNames = new Intl.DisplayNames(["en"], { type: "region" });

    output.innerHTML = `<span>${name}</span> is from <span>${getCountryNames.of(country_id)}</span>  with  certainty of <span>${Math.floor(probability * 100)}%</span>`;
  } catch (e) {
    output.innerText = "something is wrong try again later";
    console.log(e);
  } finally {
    searchBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
    searchBtn.removeAttribute("disabled");
  }
});
