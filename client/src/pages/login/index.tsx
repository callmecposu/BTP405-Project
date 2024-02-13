import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
            .then((result: any) => {
                console.log(result)
            });
    };

    return (
        <div className="flex justify-center h-screen place-items-center bg-primary">
            <div className="flex login-container shadow-2xl bg-neutral rounded-3xl">
                <div className="flex-grow  p-4 flex items-center ">
                    <div className=" flex justify-center  items-center flex-col flex-wrap  w-full">
                        <h1 className=" font-bold text-3xl text-center mb-8 ">
                            Login &#128572;
                        </h1>
                        <input
                            type="text"
                            placeholder="Username"
                            className="input input-bordered  w-2/3 mb-8  rounded-full"
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered  w-2/3 mb-8 rounded-full"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <button
                            className="btn btn-secondary block w-2/3 rounded-full"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>

                <div>
                    <div
                        className="hero w-80 h-full rounded-3xl"
                        style={{
                            backgroundImage: "url(loginIMG.png)",
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
