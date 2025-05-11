'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {showToast} from "nextjs-toast-notify";

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const response = await fetch('https://ia-hackathon-backend.vercel.app/register', { //URL del servidor Flask de producción.
      //const response = await fetch('http://localhost:5000/register', { //URL del servidor Flask de desarrrollo.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
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
          router.push('/login');
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
    <div className="min-h-screen flex items-center justify-center ocean-background">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-pink-600">Registro</h1>
            <p className="text-center">Complete el formulario para registrarse</p>
            <div className="flex flex-col items-center">
              <img src="./images/Axolotl_cooking.gif" alt="AI-xolotl" width={110} className='rounded-full aspect-square object-cover'/>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email:
                    </label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password:
                    </label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        Nombre:
                    </label>
                    <input type="text" id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Apellido:
                    </label>
                    <input type="text" id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-orange-600 hover:bg-orange-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Registarse
                </button>
            </form>
        </div>
    </div>
    );
}