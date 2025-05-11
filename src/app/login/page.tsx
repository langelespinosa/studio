"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {showToast} from "nextjs-toast-notify";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
        const response = await fetch('https://ia-hackathon-backend.vercel.app/login', { //URL del servidor Flask de producción.
        //const response = await fetch('http://localhost:5000/login', { // URL del servidor Flask de desarrrollo.
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
      });

      //Response from server.
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        //Send notification to user.
        showToast.success(data.message, {
            duration: 4000,
            progress: true,
            position: "top-center",
            transition: "bounceIn",
            icon: '',
            sound: true,
        });
        // Add a small delay before redirecting so the user can see the toast.
        setTimeout(() => {
            router.push('/');
        }, 2000); // Redirect after 2 seconds.
      } else {
        //Send notification to user.
        showToast.error(data.message, {
            duration: 4000,
            progress: true,
            position: "top-center",
            transition: "swingInverted",
            icon: '',
            sound: true,
        });
      }
    } catch (error: any) {
        //Send notification to user.
        showToast.error(error.message, {
            duration: 4000,
            progress: true,
            position: "top-center",
            transition: "swingInverted",
            icon: '',
            sound: true,
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ocean-background">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg flex flex-col items-center">
        <h3 className="text-2xl font-bold text-center text-pink-600">¡Hola de nuevo!</h3>
        <p>Inicie sesión para tener una mejor experiencia</p>
        <img src="./images/Axolotl_swimming.gif" alt="AI-xolotl" width={100}/>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password:</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="w-full flex justify-center px-6 py-2 mt-4 bg-orange-600 hover:bg-orange-500 text-white rounded-md"
              >
                Acceder
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}