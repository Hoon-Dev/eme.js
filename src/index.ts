import { Eme } from "./core/eme";
import "./assets/css/style.css";

window.onload = initialize;

function initialize(this: GlobalEventHandlers, ev: Event) {
  try {
    new Eme("eme");  
  } catch(e) {
    console.log(e);
  }
}