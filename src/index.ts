import { Eme } from "./core/eme";
import "./assets/css/style.css";

window.onload = initialize;

function initialize(this: GlobalEventHandlers, ev: Event) {
  const emeDefaultElement = document.getElementById("eme");
  
  if(emeDefaultElement !== null)
    new Eme(emeDefaultElement);
}