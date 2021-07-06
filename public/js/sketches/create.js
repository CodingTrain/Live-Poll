/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Feel free to give a better name to this file
// This Javascript is powering /createPoll

let inputsDiv;

function setup() {
  noCanvas();
  const textarea = createElement("textarea");
  textarea.attribute("placeholder", "Enter question here");

  const defaultOptions = 5;
  inputsDiv = createElement("div").addClass("options");
  inputsDiv.id("inputsDiv");
  for (let i = 0; i < defaultOptions; i++) {
    const newInput = createInput().attribute(
      "placeholder",
      "Option " + (i + 1)
    );

    newInput.id(`option-${i}`);

    inputsDiv.child(newInput);
  }

  const buttonsDiv = createElement("div").addClass("buttonsArray");

  const addOption = createButton("Add Option").addClass("addOption");
  const removeLastOption =
    createButton("Remove last Option").addClass("removeLastOption");
  const submit = createButton("Create!");

  buttonsDiv.child(addOption);
  buttonsDiv.child(removeLastOption);
  buttonsDiv.child(submit);

  addOption.mousePressed(async () => {
    const currentOptionsLength =
      document.getElementById("inputsDiv").children.length;

    const newInput = createInput().attribute(
      "placeholder",
      "Option " + (currentOptionsLength + 1)
    );


    newInput.id(`option-${currentOptionsLength}`);

    inputsDiv.child(newInput);
  });

  removeLastOption.mousePressed(async () => {
    const currentOptionsLength =
      document.getElementById("inputsDiv").children.length;

    if (currentOptionsLength > 2) {
      var list = document.getElementById("inputsDiv");
      list.removeChild(list.childNodes[currentOptionsLength - 1]);
    }
  });

  submit.mousePressed(async () => {
    const question = textarea.value();
    let options = [];

    const optionsDiv = document.getElementsByClassName("options")[0];

    for (let option of optionsDiv.children) {
      options.push(option.value);
    }

    if (!question) return alert("You need to enter a question.");
    let actualOptions = [];
    for (let option of options) {
      if (option != "") {
        actualOptions.push(option);
      }
    }
    if (actualOptions.length < 2)
      return alert("You need to mention at least two valid options.");

    const response = await fetch("/api/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        actualOptions,
      }),
    });
    const { id } = await response.json();

    textarea.hide();
    inputsDiv.hide();
    addOption.hide();
    removeLastOption.hide();
    submit.hide();

    const voteLink = location.origin + "/vote/" + id;
    const pollLink = location.origin + "/poll/" + id;
    createDiv(`
    Poll Created Successfully.<br>
    Poll ID: ${id}<br>
    Poll Voting Link: <a href="${voteLink}">${voteLink}</a><br>
    Poll Results Link: <a href="${pollLink}">${pollLink}</a><br>
    `);

    // add qrcode
    const typeNumber = 4;
    const errorCorrectionLevel = "L";
    const qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(voteLink);
    qr.make();

    createDiv(qr.createSvgTag(5, 5));
  });
}

function keyPressed() {
  let isOptionRegx = /option-\d+/;
  if (keyCode == 13 && isOptionRegx.test(document.activeElement.id)) {
    const currentOptionsLength =
      document.getElementById("inputsDiv").children.length;
    const id = document.activeElement.id;
    const optionNum = int(id.substring(7, id.length));
    if (optionNum == currentOptionsLength - 1) {
      const newInput = createInput().attribute(
        "placeholder",
        "Option " + (currentOptionsLength + 1)
      );


      newInput.id(`option-${currentOptionsLength}`);

      inputsDiv.child(newInput);
      newInput.elt.focus();
    } else {
      select(`#option-${optionNum + 1}`).elt.focus();
    }
  }
}
