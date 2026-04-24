'use client';
import { useState } from 'react';

export default function ChatToggle() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleChat = () => {
    const iframe = document.querySelector('iframe#chatbase-bubble-window');
    if (iframe) {
      if (isOpen) {
        iframe.style.display = 'none';
      } else {
        iframe.style.display = 'block';
      }
      setIsOpen(!isOpen);
    }
  };

  return (
    <button
      onClick={toggleChat}
      className="chat-toggle-btn"
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {isOpen ? '✕' : '💬'}
    </button>
  );
}
