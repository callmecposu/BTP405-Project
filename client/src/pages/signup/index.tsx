import { useRouter } from "next/router";
import { useState } from "react";
import { setCookie, unsetCookie } from "@/utils/cookies";


const Signup = () => {
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleSignUp = async () => {
        setError(null)

        if (username.length == 0 || password.length == 0 || confirmPassword.length == 0) {
            setError('Please fill out all the fields!')
            return
        }
        if (password != confirmPassword) {
            setError("Password do not match!")
            return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({ username, password }),
        });
        const result = await response.json();
        console.log(result)
        if (response.status == 400) {
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
        router.push('/dashboard')

    }



    return (
        <div className="flex justify-center h-screen place-items-center bg-primary">
            <div className="relative">
                <button className="absolute top-4 right-4 z-10" onClick={() => { router.push("/") }}>
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

                            <input type="text" placeholder="Username" className="input input-bordered  w-2/3 mb-8  rounded-full " onChange={(e) => { setUsername(e.target.value) }} value={username} />

                            <input type="password" placeholder="Password" className="input input-bordered  w-2/3 mb-8 rounded-full" onChange={(e) => { setPassword(e.target.value) }} value={password} />

                            <input type="password" placeholder="Confirm Password" className="input input-bordered  w-2/3 mb-8 rounded-full" onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword} />

                            <button className="btn btn-secondary block w-2/3 rounded-full mb-4 " onClick={handleSignUp}>Sign Up</button>

                            {error && (<h1 className="text-error mb-4">{error}</h1>)}

                            <h1>Have an account already? <a href="/login" className="link link-primary ">Login!</a></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Signup;