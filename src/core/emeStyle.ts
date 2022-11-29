export type StyleArgs = {
  "background"?: string;
  "display"?: string;
  "width"?: string;
  "border"?: string;
  "border-radius"?: string;
  "outline"?: string;
  "padding"?: string;
  "box-sizing"?: string;
};

export class EmeStyle {
  private forcedStyle = "white-space:pre;";

  private style: StyleArgs = {
    "background": "white",
    "display": "inline-block",
    "width": "100%",
    "border": "1px solid #dddddd",
    "border-radius": "5px",
    "outline": "0",
    "padding": "10px",
    "box-sizing": "border-box"
  }

  innerStyle() {
    return (Object.keys(this.style) as (keyof typeof this.style)[]).reduce((acc, key) => {
      return `${acc}${key}:${this.style[key]};`;
    }, this.forcedStyle);
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