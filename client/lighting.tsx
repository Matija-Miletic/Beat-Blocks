export default function lighting() {
  const color = ['red', 'blue', 'green', 'yellow']
  const randomColour = Math.floor(Math.random() * (3 - 0 + 1)) + 0

  document.body.classList.add(`${color[randomColour]}`)

  // Remove the class after a short duration (e.g., 2 seconds)
  setTimeout(() => {
    document.body.classList.remove(`${color[randomColour]}`)
  }, 200)
}
