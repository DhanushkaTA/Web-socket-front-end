import { Inter } from "next/font/google";
import {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";

const inter = Inter({ subsets: ["latin"] });

interface Message {
  message: string;
}

export default function Home() {

  const [message, setMessage] = useState<string>('🎉');
  const [message2, setMessage2] = useState<string>('🔥');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
      // // Create a WebSocket connection to the server
      // const socket = io('http://localhost:3001');
      // setSocket(socket);

      //{here}


    // Clean up the connection when the component is unmounted
    return () => {
      // socket.disconnect();
    };
  }, []);

  function fun_1() {

      //we can put this methods in userEffect as above example

      // Create a WebSocket connection to the server
      const socket = io('http://localhost:3001');
      setSocket(socket);

      // @ts-ignore
      socket.on('connect', () => {
          console.log('Connected to WebSocket server');
      });

      console.log(socket.connected)


      //this method listening to back end data (send by the using message1 key)
      // @ts-ignore
      socket.on('message2', (data: Message) => {
          console.log('Message from server', data);
          setMessage(data.message);
      });

      //this method listening to back end data (send by the using message2 key)
      // @ts-ignore
      socket.on('message3', (data: Message) => {
          console.log('Message from server', data);
          setMessage2(data.message);
      });

      // @ts-ignore
      socket.on('disconnect', () => {
          console.log('WebSocket connection closed');
      });
  }

  return (
      <div className={"text-white w-screen h-screen flex items-center justify-center flex-col"}>
        <h1>WebSocket Example with Socket.IO</h1>
        <p>Message 1 from server: {message}</p>
        <p>Message 2 from server: {message2}</p>
        <button className={'bg-pink-200'} onClick={fun_1}>
          Obahan
        </button>
      </div>
  );
}