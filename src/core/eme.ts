import { EmeStyle, StyleArgs } from "./emeStyle";

export class Eme {
  // eme root dom
  private rootElement: HTMLElement;

  private style: EmeStyle = new EmeStyle();
  private lines: EmeLine[] = [];

  // key state
  private shiftState: boolean = false;

  constructor(rootElement: HTMLElement, style?: StyleArgs) {
    rootElement.classList.add("eme-editor");
    this.rootElement = rootElement;

    const innerEmeStyle = rootElement.getAttribute("eme:style");
    if(innerEmeStyle !== null) {
      this.style.setCustomStyle(innerEmeStyle);
    } else if(style !== undefined) {
      this.style.setCustomStyle(style);
    }
    rootElement.setAttribute("style", this.style.innerStyle());

    this.lines.push(new EmeLine(rootElement));

    rootElement.addEventListener("keydown", this.onKeydown.bind(this));
    rootElement.addEventListener("keyup", this.onKeyup.bind(this));
  }

  onKeydown(evt: KeyboardEvent) {
    // console.dir(evt.key);
    switch(evt.key) {
      case "Shift":
        this.shiftState = true;
        break;
      case "Enter":
        evt.preventDefault();
        break;
      case "Backspace":
        break;
      default:
        break;
    }
  }

  onKeyup(evt: KeyboardEvent) {
    switch(evt.key) {
      case "Shift":
        this.shiftState = false;
        break;
      case "Enter":
        if(this.shiftState) {
          console.log("수피트 엔터");
        } else {
          this.lines.push(new EmeLine(this.rootElement));
          console.log("엔터");
        }
        break;
    }
  }
}

class EmeLine {
  // eme root dom
  private rootElement: HTMLElement;
  private lineElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    const lineElement = document.createElement("div");
    lineElement.setAttribute("contenteditable", "true");
    rootElement.appendChild(lineElement);
    lineElement.focus();
    this.lineElement = lineElement;
  }
}