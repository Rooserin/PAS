"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatPage() {
  // 获取 URL 中的查询参数
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (query.trim() === '') return;

    // 添加用户发送的问题
    const userMessage: Message = { id: Date.now(), text: query, sender: 'user' };
    setMessages([userMessage]);

    // 添加一个临时的机器人回复
    const botMessage: Message = { id: Date.now() + 1, text: '正在处理中...', sender: 'bot' };
    setMessages((prev) => [...prev, botMessage]);

    // 通过后端 API 获取回答
    const fetchAnswer = async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: query })
        });
        const data = await response.json();
        const botText = data.response || '暂无回复';
        setMessages((prev) =>
          prev.map(msg => msg.id === botMessage.id ? { ...msg, text: botText } : msg)
        );
      } catch (error) {
        console.error('请求出错：', error);
        setMessages((prev) =>
          prev.map(msg =>
            msg.id === botMessage.id ? { ...msg, text: '请求出错，请稍后重试。' } : msg
          )
        );
      }
    };

    fetchAnswer();
  }, [query]);
  <div></div>

  return (
    <div className="container">
      <h1>ChatGPT 聊天页面</h1>
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

