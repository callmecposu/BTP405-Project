import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div>
            <div className="navbar w-full bg-neutral rounded-bl-xl rounded-br-xl p-4">
                <img className="mx-4" src="logo.svg" alt="" width="200px" />
                <div className="flex justify-end w-full">
                <button className="btn mx-4 btn-primary" onClick={() =>{router.push("/login")}}>Login</button>
                    <button className="btn btn-outline mx-4" onClick={() =>{router.push("/signup")}}>Sign Up</button>
                </div>
            </div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        "url(https://images.pexels.com/photos/2403251/pexels-photo-2403251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-5xl font-bold lead">
                            Next &#129305; level &#128200; budgeting &#128184;
                        </h1>
                        <h1 className="mb-5 text-3xl font-bold">
                            At the tips &#128133; of your fingers &#128400;{" "}
                        </h1>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                router.push("/login");
                            }}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
