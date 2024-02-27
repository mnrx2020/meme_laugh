import trollFace from "../images/troll-face.png";

export default function Header() {
  return (
    <header className="header">
      <img className="header--img" src={trollFace} alt="troll face" />
      <h2 className="header--title">Meme Generator</h2>
      <h4 className="header--project">I'm a Teapot... Filled with Memes!</h4>
    </header>
  );
}