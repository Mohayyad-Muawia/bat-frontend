import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  let form;

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [color, setColor] = useState("eb4242");

  useEffect(() => {
    form = document.querySelector(".room-form");
  }, []);
  const show = (selector) => {
    document.querySelector(selector).classList.add("show");
  };

  const hide = (selector) => {
    document.querySelector(selector).classList.remove("show");
  };

  // colors
  const colors = ["0056D2", "FFC107", "eb4242", "28A745", "F5F5F5", "17A2B8"];

  const colorClick = (e) => {
    const color = e.target.getAttribute("data-color");

    let clr = document.querySelector(".colors a.active");
    clr ? clr.classList.remove("active") : null;

    e.target.classList.add("active");
    setColor(color);
  };

  return (
    <div className="welcome">
      <div className="logo center">
        <img src="/logo.png" alt="" />
        <h1 className="bat">Bat Chat</h1>
      </div>

      <div className="info">
        <h1>
          Welcome to <span>Bat</span>, simple fast chat
        </h1>
        <p>
          Without saving data and avoiding authentication complexities, we like
          to keep it simple. To get started, just click the "Join" button, enter
          your name and the room name—that's it! You can also choose a color for
          your name in the room chat. Then, simply share the website link and
          the room name with your friends, and you can start chatting with each
          other. <br /> The chat even supports emojis—just type their symbols,
          like :) for a smile.
        </p>
        <button className="main-btn" onClick={() => show(".room-form.join")}>
          Join Room
        </button>
      </div>

      <form // join form
        action=""
        className="room-form join overlay"
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/chat?name=${name}&room=${room}&color=${color}`);
        }}
      >
        <div className="popUp">
          <h2 className="center">Join Room</h2>

          <div>
            <label htmlFor="name">your name</label>
            <input
              id="name"
              type="text"
              placeholder="Adolf Kitler"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="name">room name</label>
            <input
              id="name"
              type="text"
              placeholder="How to become a dictator"
              required
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Your Color</label>
            <div className="colors">
              {colors.map((color, index) => (
                <a
                  key={index}
                  style={{ backgroundColor: `#${color}` }}
                  data-color={color}
                  onClick={(e) => colorClick(e)}
                ></a>
              ))}
            </div>
          </div>

          <div className="btns">
            <button className="sec-btn" onClick={() => hide(".room-form.join")}>
              Cancel
            </button>
            <button className="main-btn" type="submit">
              Join
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Welcome;
