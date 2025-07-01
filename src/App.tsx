import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { scenarios } from './data/scenarios';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'こんにちは！日本語学習へようこそ！何でも聞いてください。',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // TODO: Replace with actual backend endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'すみません、今は返答できません。',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // Fallback response for demo
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `「${text}」について説明します。日本語学習において、実際の会話練習は非常に重要です。このフレーズは日常会話でよく使われます。`,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fallbackMessage]);
    }
  };

  const handleScenarioSelect = (scenario: typeof scenarios[0]) => {
    const scenarioMessage = `${scenario.city} - ${scenario.place} - ${scenario.situation}\n\n日本語: ${scenario.japanese}\n英語: ${scenario.english}\n\nこの状況について詳しく教えてください。`;
    handleSendMessage(scenarioMessage);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/161153/japan-cherry-blossom-spring-flowers-161153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        }}
      />
      
      {/* Samurai Silhouette Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/4021521/pexels-photo-4021521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-screen">
        <Header />
        
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            onScenarioSelect={handleScenarioSelect}
            scenarios={scenarios}
          />
          
          <main className="flex-1 flex flex-col">
            <ChatArea 
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;