import type { ReactElement } from "react"

export const svg : Record<string, ReactElement> = {
  close: (
    <svg
      className="close-svg"
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor">
      <path d="m13.414 12 7.293-7.293a1 1 0 1 0-1.414-1.414L12 10.586 4.707 3.293a1 1 0 1 0-1.414 1.414L10.586 12l-7.293 7.293a1 1 0 1 0 1.414 1.414L12 13.414l7.293 7.293a.997.997 0 0 0 1.414 0 1 1 0 0 0 0-1.414L13.414 12z" />
    </svg>
  ),
  more: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="More options"
      className="x1lliihq x1n2onr6 x5n08af"
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24">
      <title>More options</title>
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="6" cy="12" r="1.5" />
      <circle cx="18" cy="12" r="1.5" />
    </svg>
  ),
  close1: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Close"
      className="x1lliihq x1n2onr6 x5n08af"
      fill="currentColor"
      height="20"
      role="img"
      viewBox="0 0 24 24"
      width="20">
      <title>Close</title>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="21"
        x2="3"
        y1="3"
        y2="21"
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="21"
        x2="3"
        y1="21"
        y2="3"
      />
    </svg>
  ),
  saved: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      className="x14rh7hd">
      <title>Saved</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2px"
        d="M20 21 12 13.44 4 21 4 3 20 3 20 21z"
      />
    </svg>
  ),
  saved1: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Remove"
      className="x1lliihq x1n2onr6 xyb1xck"
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24">
      <title>Remove</title>
      <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z" />
    </svg>
  ),
}
