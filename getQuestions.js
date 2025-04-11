let dataArr = null;
let trivia = [];

async function getData() {
  await fetch("./questions.json")
    .then((res) => res.json())
    .then((data) => (dataArr = data.questions))
    .catch((err) => console.error(err));
}

export default async function getQuestions() {
  trivia = [];
  await getData();
  const listLength = dataArr.length;

  for (let i = 0; i < listLength; i++) {
    let randomIndex = Math.floor(Math.random() * dataArr.length);
    let splicedItem = dataArr.splice(randomIndex, 1);
    trivia.push(splicedItem);
  }
  let result = trivia.flat();
  return result;
}
