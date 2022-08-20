export type StyleArgs = {
  "background"?: string
}

export default class Eme {
  constructor(element: Element, style?: StyleArgs) {
    element.setAttribute("contenteditable", "true");
    // element.setAttribute("style", this.innerStyle());
  }
  style(): StyleArgs {
    return {
      "background": "white"
    }
  }
  innerStyle() {
    const style = this.style();
    return (Object.keys(style) as (keyof typeof style)[]).reduce((acc, key) => {
      return `${acc}${key}:${style[key]};`;
    }, "");
  }
}