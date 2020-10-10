/** Javascript for Creating new Poll */

// note: this is ugly, needs better styling

// better variable naming?
let question;
let optionContainer;
let options = [];
let addButton;
let submitButton;

let maxOptionsNo = 5;
let defaultOptionsNo = 2;

function setup() {
  noCanvas();
  question = createElement("textarea")
  question.elt.placeholder = "Enter Question";
  question.elt.rows = "6";
  question.elt.cols = "28";

  optionContainer = createDiv();
  optionContainer.addClass("optionsContainer")

  addButton = createButton("+")
  addButton.class("add")
  addButton.mousePressed(createNewOption)

  submitButton = createButton("SUBMIT")
  submitButton.class("submit")
  submitButton.mousePressed(submitPoll)


  for (let i = 0; i < defaultOptionsNo; i++)
    createNewOption();

}

function createNewOption() {
  // option #
  let index = options.length + 1

  // create an option div
  let optionDiv = createDiv();
  optionDiv.addClass("option")

  // Add option index (A) / (B) / (C) etc and add it to the div
  optionDiv.child(createSpan(`(${String.fromCharCode(index + 96)})`))

  // create an input elt and add it to the div
  const inp = createInput();
  inp.elt.placeholder = `Option ${index}`
  optionDiv.child(inp)

  // Push the *input* element to options array
  options.push(inp)

  // Put the div in optionContainer
  optionContainer.child(optionDiv)

  // hide button if max options reached
  if (options.length >= maxOptionsNo) {
    addButton.hide();
  }
}

async function submitPoll() {
  /**
  poll object structure: 
  {
    question: string,
    options: string[],
    votes: number[]
  }
   */
  let optionValues = options.map(o => o.value()).filter(x => x);

  if (!question.value()) return;
  if (optionValues.length < 2) return alert("At least two options are required.")

  let poll = {
    question: question.value(),
    options: optionValues,
    votes: new Array(optionValues.length).fill(0)
  };

  // POST "/create" with poll
  let res = await fetch("/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(poll)
  })
  let resJson = await res.json()

  // clear form
  question.value("");
  options.forEach(o => o.value(""))

  console.log(resJson);

  if (resJson.status == "success")
    alert(`Poll created with ID ${resJson.id}!`)
  else alert("Error")

}