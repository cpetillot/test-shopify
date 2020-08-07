data - section - id = "{{ section.id }}";
data - section - type = "reassurance-js";

console.log("hello world");

document.body.onload = addElement;

function mySection() {
  var divReassurance = document.createElement("div");
  var divContainer = document.createElement("div");
  var sectionTitle = document.createElement("h2");
  sectionTitle.innerHTML = "{{ section.settings.title }}";

  divReassurance.appendChild(divContainer);
  divContainer.appendChild(sectionTitle);

  document.getElementById("reassurance").appendChild(divReassurance);
  //document.section.insertBefore(divReassurance, divContainer);
}
