import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
    return (
        <div className="flex justify-center h-screen place-items-center bg-primary">
            <div className="flex login-container shadow-2xl bg-neutral rounded-3xl">
                <div className="flex-grow  p-4 flex items-center ">

                    <div className=" flex justify-center  items-center flex-col flex-wrap  w-full">
                        <h1 className=" font-bold text-3xl text-center mb-8 ">Login &#128572;</h1>

                        <input type="text" placeholder="Username" className="input input-bordered  w-2/3 mb-8  rounded-full" />


                        <input type="password" placeholder="Password" className="input input-bordered  w-2/3 mb-8 rounded-full" />

                        <button className="btn btn-secondary block w-2/3 rounded-full">Login</button>



                    </div>
                    
                </div>

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
            </div>
        </div>
    );
};
export default Login;
