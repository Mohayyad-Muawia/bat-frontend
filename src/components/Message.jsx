import ReactEmoji from "react-emoji";

const Message = ({ message: { user, text, color }, name }) => {
  let sentByCurrUser = false;

  const trimedNmae = name.trim().toLowerCase();

  if (user === trimedNmae) {
    sentByCurrUser = true;
  }

  return sentByCurrUser ? (
    <div className="user msg-container">
      <div className="message">
        <p>{ReactEmoji.emojify(text, { emojiType: "emojione" })}</p>
      </div>
    </div>
  ) : user === "Bat" ? (
    <div className="admin msg-container">
      <div className="message">
        <p>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="other msg-container">
      <div className="message">
        <h5 style={{ color: `#${color}` }}>{user}</h5>
        <p>{ReactEmoji.emojify(text, { emojiType: "emojione" })}</p>
      </div>
    </div>
  );
};

export default Message;
