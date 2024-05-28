import * as React from "react";

function IconTrashBinOutline(props:any) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="red"
      height="2em"
      width="2em"
      {...props}
    >
      <path
        fill="none"
        stroke="red"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M432 144l-28.67 275.74A32 32 0 01371.55 448H140.46a32 32 0 01-31.78-28.26L80 144"
      />
      <path
        fill="none"
        stroke="red"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M48 64 H464 A16 16 0 0 1 480 80 V128 A16 16 0 0 1 464 144 H48 A16 16 0 0 1 32 128 V80 A16 16 0 0 1 48 64 z"
      />
      <path
        fill="none"
        stroke="red"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M312 240L200 352M312 352L200 240"
      />
    </svg>
  );
}

export default IconTrashBinOutline;