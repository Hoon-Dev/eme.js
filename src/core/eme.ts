import { EmeStyle, StyleArgs } from "./emeStyle";
import { EmeError } from "../error/index";

export class Eme {
  // eme root dom
  private rootElement: HTMLElement;

  private style: EmeStyle = new EmeStyle();
  private lines: EmeLine[] = [];

  // key state
  private shiftState: boolean = false;

  /**
   * EmeLine 생성자
   * @param rootElementID Eme Editor의 Dom 엘리먼트의 ID
   * @param style 에디터 커스텀 스타일
   */
  constructor(rootElementID: string, style?: StyleArgs);
  /**
   * EmeLine 생성자
   * @param rootElement Eme Editor의 Dom 엘리먼트
   * @param style 에디터 커스텀 스타일
   */
  constructor(rootElement: HTMLElement, style?: StyleArgs);
  constructor(rootElementOrId: HTMLElement | string, style?: StyleArgs) {
    if (typeof rootElementOrId == "string") {
      let rootElement = document.getElementById(rootElementOrId);
      if (rootElement) {
        this.rootElement = rootElement;
      } else {
        throw EmeError.NOT_FOUND_ELEMENT;
      }
    } else {
      this.rootElement = rootElementOrId;
    }

    this.rootElement.classList.add("eme-editor");

    const innerEmeStyle = this.rootElement.getAttribute("eme:style");
    if (innerEmeStyle !== null) {
      this.style.setCustomStyle(innerEmeStyle);
    } else if (style !== undefined) {
      this.style.setCustomStyle(style);
    }
    this.rootElement.setAttribute("style", this.style.innerStyle());

    this.lines.push(new EmeLine(this.rootElement));

    this.rootElement.addEventListener("keydown", this.onKeydown.bind(this));
    this.rootElement.addEventListener("keyup", this.onKeyup.bind(this));
  }

  onKeydown(evt: KeyboardEvent) {
    // console.dir(evt.key);
    switch (evt.key) {
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
    switch (evt.key) {
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

  /**
   * EmeLine 생성자
   * @param rootElement Eme Editor의 Dom 엘리먼트
   */
  constructor(rootElement: HTMLElement) {
    const lineElement = document.createElement("div");
    lineElement.setAttribute("contenteditable", "true");
    rootElement.appendChild(lineElement);
    lineElement.focus();
    this.lineElement = lineElement;
  }
}