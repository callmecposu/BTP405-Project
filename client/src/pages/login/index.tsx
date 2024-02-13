import { useRouter } from "next/router";
import { useState } from "react";
import { setCookie, unsetCookie } from "@/utils/cookies";

const Login = () => {
    const router = useRouter()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        setError(null);
        const response = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({ username, password }),
        });
        const result = await response.json();
        console.log(result)
        if (response.status == 400 || response.status == 404) {
            setError(result.message);
            unsetCookie("jwt");
            return;
        }
        if (response.status != 200) {
            setError("An Error Occured");
            unsetCookie("jwt");
            return;
        }
        const allHeaders = response.headers.entries();
        for (const header of allHeaders as any) {
            console.log(header[0], ":", header[1]);
        }
        setCookie(
            "jwt",
            response.headers.get("token") as string,
            60 * 60 * 24 * 3
        );
        router.push('/home')
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
                        {error && (<h1 className="text-error mt-4">{error}</h1>)}
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
