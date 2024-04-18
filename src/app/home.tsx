import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Example function to handle login
        navigate('/preferences'); // Navigate to the preferences page
    };

    return (
        <div className="flex flex-col items-center h-screen justify-center">
            <h1>Welcome</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
