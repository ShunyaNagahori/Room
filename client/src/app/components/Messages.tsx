import { MessagesProps } from '@/type/message.type'
import React from 'react'

const Messages = ({list}: MessagesProps) => {
  return (
    <div className="bg-white border p-2">
      <ul className="p-2">
        {list.map((item, index) => (
          <li key={index} className="border p-2 my-1 rounded-lg">{item.message}</li>
        ))}
      </ul>
    </div>
  )
}

export default Messages
