const ErrorTitle = "[Eme::Error]";

const ErrorCode = {
  NOT_FOUND_ELEMENT: "Cannot find element for ID",
};

type EmeErrorType = {
  [code in keyof typeof ErrorCode]: string;
};

const EmeError: EmeErrorType = (
  Object.keys(ErrorCode) as (keyof typeof ErrorCode)[]
).reduce((ac, cur) => {
  ac[cur] = `${ErrorTitle}\n\n"${ac[cur]}"\n `;
  return ac;
}, ErrorCode);

export {
  EmeError
};