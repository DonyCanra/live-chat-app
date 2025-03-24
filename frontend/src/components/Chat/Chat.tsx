"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styles from "./Chat.module.css";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("send_message", input);
      setInput("");
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h2>Live Chat</h2>
      <div className={styles.chatMessages}>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} value={input} onChange={(e) => setInput(e.target.value)} />
        <button className={styles.sendButton} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
