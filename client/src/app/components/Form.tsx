'use client'
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

const Form = () => {
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const handleJoinRoom = (e: FormEvent) => {
    e.preventDefault();
    if (userName.trim() && roomName.trim()) {
      router.push(`/room/${roomName}/?userName=${userName}`)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <form className="w-full">
        <div className="p-3  bg-lime-300">
          <label>名前</label>
          <input type="text" name="userName" className="border w-full" onChange={(e) => setUserName(e.target.value)} value={userName} />
        </div>
        <div className="p-3  bg-lime-300">
          <label>部屋の名前</label>
          <input type="text" name="roomName" className="border w-full"onChange={(e) => setRoomName(e.target.value)} value={roomName} />
        </div>
        <div className="mt-2 border rounded-lg border-gray-300">
          <button type="submit" className="text-center w-full p-2 border-lime-300 rounded-lg border-4" onClick={handleJoinRoom}>入室</button>
        </div>
      </form>
    </div>
  )
}

export default Form
