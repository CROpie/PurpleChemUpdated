export const inputBtn = `
font-family: var(--font);
width: 100%;
color: var(--input-color);
background: var(--input-backGround);
border: var(--input-border);
border-radius: var(--input-borderRadius);
padding: var(--input-padding);
font-size: var(--input-fontSize);
outline: var(--input-outline);
margin-top: var(--input-marginY);
margin-bottom: var(--input-marginY);

&:hover {
  color: var(--input-colorHover);
  background: var(--input-backgroundHover);
  border: var(--input-borderColorFocus);
}

&:focus {
  border: var(--input-borderColorFocus);
}
`

export const formLabel = `
display: block;
margin-left: var(--input-labelMarginLeft);
color: var(--text-color);
`

export const formInput = `
display: block;
width: 100%;
color: var(--input-color);
background: var(--input-backGround);
border: var(--input-border);
border-radius: var(--input-borderRadius);
padding: var(--input-padding);
font-size: var(--input-fontSize);
outline: var(--input-outline);

&:hover {
  color: var(--input-colorHover);
  background: var(--input-backgroundHover);
  border: var(--input-borderColorFocus);
}

&:focus {
  border: var(--input-borderColorFocus);
}`
