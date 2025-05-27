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
  const name = searchInput.value;
  output.innerText = "";
  if (name === "") {
    output.innerText = "can not be empty";
    return;
  }

  searchBtn.setAttribute("disabled", true);
  try {
    const { name, country } = await predictname(name);
    const { country_id, probability } = country[0];
    const getCountryNames = new Intl.DisplayNames(["en"], { type: "region" });

    output.innerHTML = `<span>${name}</span> is from <span>${getCountryNames.of(country_id)}</span>  with  certainty of <span>${probability * 100}</span>`;
  } catch (e) {
    output.innerText = "something is wrong try again later";
  } finally {
    searchBtn.removeAttribute("disabled");
  }
});
