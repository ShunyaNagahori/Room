'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Messages from '@/app/components/Messages';
import { messageType } from '@/type/message.type';

export default function Page() {
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL!;
  const socket = io(SERVER_URL, {
    withCredentials: true
  });
  const params = useParams();
  const searchParams = useSearchParams()
  const roomName = decodeURIComponent(String(params.roomName));
  const userName = decodeURIComponent(String(searchParams.get('userName')));

  useEffect(() => {
    socket.emit('joinRoom', { roomName, userName });

    return () => {
      socket.emit('exitRoom', { roomName, userName });
    }
  }, [])

  const [message, setMessage] = useState('');
  const [list, setList] = useState<Array<messageType>>([]);
  const router = useRouter();


  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', { message, roomName, userName })
      setMessage('');
    }
  }

  const handleExitRoom = () => {
    router.push('/')
  }

  socket.on('recivedMessage', (data) => {
    setList(prevList => [...prevList, data]);
  });


  return (
    <main className="mx-auto p-5">
      <div>
        <div className="bg-lime-300">
          <h1 className="flex items-center justify-center text-lg py-2">{roomName}</h1>
        </div>
        <div className="border-gray-300 bg-white py-2 flex">
          <button onClick={handleExitRoom} className="mr-2 rounded-lg px-2 border-lime-300 border-4">退出</button>
        </div>
      </div>
      <div className="p-2 bg-lime-300">
        <Messages list={list} />
      </div>
      <form className="flex h-8 border mt-2 border-gray-300 rounded-lg">
        <input type="text" className="w-5/6 rounded-l-lg px-1" onChange={(e) => setMessage(e.target.value)} value={message}/>
        <button type="submit" className="w-1/6 bg-lime-300 rounded-r-lg" onClick={handleSendMessage}>送信</button>
      </form>
    </main>
  )
}
