import { useRouter } from "next/navigation";
import Link from "next/link";

export const getServerSideProps = async (context: any) => {
    try {
        const jwt = context.req.cookies["jwt"] || null;
        console.log("JWT: ", jwt);
        let user = null;
        if (jwt) {
            console.log("fetching user...");
            // fetch user by JWT
            const response = await fetch('http://127.0.0.1:8000/user', {
                headers: {
                    Token: jwt,
                },
            });
            const result = await response.json();
            user = result;
        }
        return {
            props: {
                user,
                jwt
            },
        };
    } catch (error) {
        return {
            props: {
                user: null,
            }
        }
    }
};

export default function Home({user}: any) {
    const router = useRouter();

    return (
        <div>
            <div className="navbar w-full bg-neutral rounded-bl-xl rounded-br-xl p-4 justify-between">
                <img className="mx-4" src="logo.svg" alt="" width="200px" />
                {
                    !user?.username ? (
                        <div className="flex justify-end w-full">
                            <button className="btn mx-4 btn-primary" onClick={() =>{router.push("/login")}}>Login</button>
                            <button className="btn btn-outline mx-4" onClick={() =>{router.push("/signup")}}>Sign Up</button>
                        </div>
                    ) : (
                        <Link href={'/dashboard'} className="flex justify-end w-max py-2 px-5 bg-primary rounded-xl">
                            Go to Dashbard
                        </Link>
                    )
                }
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
                            Next  level  budgeting 💸
                        </h1>
                        <h1 className="mb-5 text-3xl font-bold">
                            At the tips of your fingers 🖐️{" "}
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
