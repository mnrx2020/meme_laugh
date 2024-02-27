import React, { useRef, useState } from "react";
import domtoimage from "dom-to-image";

export default function Meme() {
  const memeImageRef = useRef(null);
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "walk into Mordor",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  const handleDownload = async () => {
    const memeContainer = memeImageRef.current;

    // Wait for the image to load before exporting as an image
    const imageElement = memeContainer.querySelector(".meme--img");

    if (imageElement.complete) {
      downloadMeme(memeContainer);
    } else {
      imageElement.onload = () => {
        downloadMeme(memeContainer);
      };
    }
  };

  const downloadMeme = async (memeContainer) => {
    const dataUrl = await domtoimage.toPng(memeContainer);
    const downloadLink = document.createElement("a");
    downloadLink.href = dataUrl;
    downloadLink.download = "meme_with_text.png";
    downloadLink.click();
  };

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevState) => ({ ...prevState, randomImage: url }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
  };

  return (
    <main>
      <div className="form">
        <input
          className="form--input"
          type="text"
          name="topText"
          placeholder="Top text"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          className="form--input"
          type="text"
          name="bottomText"
          placeholder="Bottom text"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 📸
        </button>

        <button className="form--button" onClick={handleDownload}>
          Download meme with text 📥
        </button>

        <div className="meme" ref={memeImageRef}>
          <img
            src={meme.randomImage}
            alt="meme"
            className="meme--img"
          />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </div>
    </main>
  );
}
