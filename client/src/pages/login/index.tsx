import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
    return (
        <div className="flex justify-center h-screen place-items-center">
            <div className="flex login-container shadow-2xl bg-neutral rounded-3xl">
                <div className="flex-grow text-center p-4">
                    <h1 className=" font-bold text-3xl">Login</h1>
                </div>
                <div>
                    <div
                        className="hero w-80 h-full rounded-3xl"
                        style={{
                            backgroundImage:
                                "url(https://images.pexels.com/photos/2887582/pexels-photo-2887582.jpeg)",
                        }}
                    >
                        <div className="hero-overlay bg-opacity-10"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
