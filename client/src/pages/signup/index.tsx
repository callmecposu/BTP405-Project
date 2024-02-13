import { useRouter } from "next/router";
import { useState } from "react";

const Signup = () => {
    const router = useRouter()

    return (
        <div className="flex justify-center h-screen place-items-center bg-primary">
            <div className="relative">
                <button className="absolute top-4 right-4 z-10" onClick={() =>{router.push("/")}}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary hover:text-primary-dark cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                </button>
                <div className="flex login-container shadow-2xl bg-neutral rounded-3xl">
                    <div>
                        <div
                            className="hero w-80 h-full rounded-3xl"
                            style={{
                                backgroundImage:
                                    "url(loginIMG.png)",
                            }}
                        >
                            <div className="hero-overlay bg-opacity-10"></div>
                        </div>
                    </div>
                    <div className="flex-grow  p-4 flex items-center ">

                        <div className=" flex justify-center  items-center flex-col flex-wrap  w-full">
                            <h1 className=" font-bold text-3xl text-center mb-8 ">Sign Up &#128576;</h1>

                            <input type="text" placeholder="Username" className="input input-bordered  w-2/3 mb-8  rounded-full" />


                            <input type="password" placeholder="Password" className="input input-bordered  w-2/3 mb-8 rounded-full" />

                            <input type="password" placeholder="Confirm Password" className="input input-bordered  w-2/3 mb-8 rounded-full" />



                            <button className="btn btn-secondary block w-2/3 rounded-full mb-4">Sign Up</button>
                            <h1>Have an acccount already? <a href="/login" className="link link-primary ">Login!</a></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Signup;