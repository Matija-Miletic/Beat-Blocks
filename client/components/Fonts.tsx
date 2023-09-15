import '../styles/index.scss'

export const Fonts = () => {
  const fontNames = [
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12',
    'F13',
    'F14',
    'F15',
  ]

  return (
    <div className="font-showcase">
      {fontNames.map((fontName, index) => (
        <div key={index} className={`font-sample ${fontName}`}>
          <p className="uppercase">
            THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG
          </p>
          <p className="lowercase">
            the quick brown fox jumped over the lazy dog
          </p>
        </div>
      ))}
    </div>
  )
}
