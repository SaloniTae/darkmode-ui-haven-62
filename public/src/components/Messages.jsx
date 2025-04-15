
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Messages = ({ messages }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Container>
      {messages && messages.map((message, index) => (
        <div 
          ref={index === messages.length - 1 ? scrollRef : null}
          key={index} 
          className={`message ${message.fromSelf ? 'sended' : 'received'}`}
        >
          <div className="content">
            <p>{message.message}</p>
          </div>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  height: 80%;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  &::-webkit-scrollbar {
    width: 0.2rem;
    
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  
  .message {
    display: flex;
    align-items: center;
    
    .content {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
    }
  }
  
  .sended {
    justify-content: flex-end;
    
    .content {
      background-color: #4f04ff21;
    }
  }
  
  .received {
    justify-content: flex-start;
    
    .content {
      background-color: #9900ff20;
    }
  }
`;

export default Messages;
