import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function ChatBox() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const bottomRef = useRef(null); // 👈 ref tới phần tử cuối

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            const res = await axios.post("http://localhost:5000/chat", { message: input });
            setMessages((prev) => [...prev, { sender: "bot", text: res.data.reply }]);
        } catch (err) {
            setMessages((prev) => [...prev, { sender: "bot", text: "Lỗi kết nối máy chủ." }]);
        }
    };

    useEffect(() => {
        // Mỗi khi messages thay đổi thì cuộn xuống dưới
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="chatbox-container" style={{ zIndex: 1 }}>
            <style>
                {`
                .chatbox-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 999;
                    font-family: 'Segoe UI', sans-serif;
                }

                .chatbox {
                    width: 320px;
                    height: 460px;
                    background: white;
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                    overflow: hidden;
                }

                .chatbox-header {
                    background: #81c408;
                    color: white;
                    padding: 12px 16px;
                    font-weight: bold;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .chatbox-header button {
                    background: transparent;
                    border: none;
                    font-size: 18px;
                    color: white;
                    cursor: pointer;
                }

                .chatbox-body {
                    flex: 1;
                    padding: 12px;
                    overflow-y: auto;
                    background: #f9f9f9;
                }

                .chat-message {
                    display: flex;
                    margin-bottom: 10px;
                }

                .chat-message.user {
                    justify-content: flex-end;
                }

                .chat-message.bot {
                    justify-content: flex-start;
                }

                .chat-message span {
                    max-width: 80%;
                    padding: 8px 12px;
                    border-radius: 18px;
                    font-size: 14px;
                    line-height: 1.4;
                }

                .chat-message.user span {
                    background-color: #d1eaff;
                    color: #004085;
                    border-bottom-right-radius: 0;
                }

                .chat-message.bot span {
                    background-color: #e8f5e9;
                    color: #1b5e20;
                    border-bottom-left-radius: 0;
                }

                .chatbox-footer {
                    display: flex;
                    border-top: 1px solid #ddd;
                    padding: 10px;
                    background: #fff;
                }

                .chatbox-footer input {
                    flex: 1;
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 14px;
                }

                .chatbox-footer button {
                    background: #81c408;
                    color: white;
                    border: none;
                    margin-left: 8px;
                    padding: 8px 14px;
                    font-weight: bold;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .chatbox-toggle {
                    background: rgb(95, 183, 9);
                    border: none;
                    color: white;
                    border-radius: 50%;
                    font-size: 24px;
                    width: 55px;
                    height: 55px;
                    cursor: pointer;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
                }
                `}
            </style>

            {open ? (
                <div className="chatbox">
                    <div className="chatbox-header">
                        <span>🤖 Chat cùng Meo Meo</span>
                        <button onClick={() => setOpen(false)}>✖</button>
                    </div>
                    <div className="chatbox-body">
                        {messages.map((msg, i) => (
                            <div key={i} className={`chat-message ${msg.sender}`}>
                                <span>{msg.text}</span>
                            </div>
                        ))}
                        <div ref={bottomRef} /> {/* 👈 phần tử cuộn đến */}
                    </div>
                    <div className="chatbox-footer">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Nhập tin nhắn..."
                        />
                        <button onClick={sendMessage}>Gửi</button>
                    </div>
                </div>
            ) : (
                <button className="chatbox-toggle" onClick={() => setOpen(true)}>
                    <img style={{ width: "45px", height: "45px", borderRadius: "20%" }}
                        src={`${import.meta.env.VITE_BACKEND_URL}/routes/productLaptop/chatbot.png`} />
                </button>
            )}
        </div>
    );
}
