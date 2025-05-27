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
  if (name === "") {
    output.innerText = "can not be empty";
    return;
  }
  try {
    const result = await predictname(name);
    output.innerText = "found something intresting";
    console.log(result);
  } catch (e) {
    output.innerText = "something is wrong";
  }
});
