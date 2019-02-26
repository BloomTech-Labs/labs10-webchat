import React from 'react';

const CustomerMessage = ({chat, user}) => (
  <li className={`chat ${user === chat.username ? "right" : "left"}`}>
    {chat.content}
  </li>
);

export default CustomerMessage;