export type StyleArgs = {
  "background"?: string,
  "display"?: string,
  "width"?: string
}

class EmeStyle {
  private style: StyleArgs = {
    "background": "white",
    "display": "inline-block",
    "width": "100%"
  }
  innerStyle() {
    return (Object.keys(this.style) as (keyof typeof this.style)[]).reduce((acc, key) => {
      return `${acc}${key}:${this.style[key]};`;
    }, "");
  }
  setCustomStyle(customStyle: StyleArgs | string) {
    if(typeof customStyle === "string") {
      customStyle.split(";").forEach((styleRow) => {
        const [styleKey, styleValue] = styleRow.split(":") as [keyof typeof this.style, typeof this.style[keyof typeof this.style]];
        if(styleValue !== undefined)
          this.style[styleKey] = styleValue;
      });
    } else {
      (Object.keys(customStyle) as (keyof StyleArgs)[]).forEach((styleKey) => {
        this.style[styleKey] = customStyle[styleKey];
      });
    }
  }
}

export default class Eme {
  private element: Element;
  private style: EmeStyle = new EmeStyle();

  constructor(element: Element, style?: StyleArgs) {
    this.element = element;
    
    const innerEmeStyle = element.getAttribute("eme:style");
    if(innerEmeStyle !== null) {
      this.style.setCustomStyle(innerEmeStyle);
    } else if(style !== undefined) {
      this.style.setCustomStyle(style);
    }

    element.setAttribute("contenteditable", "true");
    element.setAttribute("style", this.style.innerStyle());
  }
}