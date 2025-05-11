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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
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
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sign Up
                </button>
            </form>
        </div>
    </div>
    );
}