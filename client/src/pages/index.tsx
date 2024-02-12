import Image from "next/image";
import { Inter } from "next/font/google";

export default function Home() {
    return (
        <div>
            <div className="navbar w-full bg-neutral rounded-bl-xl rounded-br-xl p-4">
                <img
                className="mx-4"
                    src="logo.svg"
                    alt=""
                    width="200px"
                />
                <div className="flex justify-end w-full">
                    <a className="btn btn-primary mx-4 flex">Login</a>
                    <a className="btn btn-outline mx-4">Sign Up</a>
                </div>
            </div>
        </div>
    );
}
