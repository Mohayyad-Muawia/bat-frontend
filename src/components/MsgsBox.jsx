import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

const MsgsBox = ({ messages, name }) => {
  return (
    <ScrollToBottom className="msgs-box">
      {messages.map((msg, i) => (
        <div key={i}>
          <Message message={msg} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default MsgsBox;
