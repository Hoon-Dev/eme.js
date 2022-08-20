import Eme from "./eme";

window.onload = initialize;

function initialize(this: GlobalEventHandlers, ev: Event) {
  const emeDefaultElement = document.getElementById("eme");
  
  if(emeDefaultElement !== null)
    new Eme(emeDefaultElement);
}