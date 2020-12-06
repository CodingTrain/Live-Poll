/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Feel free to give a better name to this file
// This Javascript is powering /createPoll

function setup() {
  noCanvas();
  const textarea = createElement("textarea");
  textarea.attribute("placeholder", "Enter question here");

  const inputs = [];
  const maxOptions = 5;
  const inputsDiv = createElement("div").addClass("options");
  for (let i = 0; i < maxOptions; i++) {
    inputs.push(createInput().attribute("placeholder", "Option " + (i + 1)));
    inputsDiv.child(inputs[i]);
    inputsDiv.child(document.createElement("br"));
  }

  const submit = createButton("Create!");

  submit.mousePressed(async () => {
    const question = textarea.value();
    const options = inputs.map((inp) => inp.value()).filter((x) => x);

    if (!question) return alert("You need to enter a question.");
    if (options.length < 2)
      return alert("You need to mention at least two valid options.");

    const response = await fetch("/api/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        options,
      }),
    });
    const { id } = await response.json();

    console.log(id);

    textarea.hide();
    inputsDiv.hide();
    submit.hide();

    const voteLink = location.origin + "/vote/" + id;
    const pollLink = location.origin + "/poll/" + id;
    const pollOverlayLink = location.origin + "/poll/" + id + "?view=overlay";
    const pollNoGradientLink = location.origin + "/poll/" + id + "?view=nogradient";
    createDiv(`
    Poll Created Successfully.<br>
    Poll ID: ${id}<br>
    Poll Voting Link: <a href="${voteLink}">${voteLink}</a><br>
    Poll Results Link: <a href="${pollLink}">${pollLink}</a><br>
    Poll Results Overlay Link: <a href="${pollOverlayLink}">${pollOverlayLink}</a><br>
    Poll Results Link (No Gradients): <a href="${pollNoGradientLink}">${pollNoGradientLink}</a>
    `);
  });
}
