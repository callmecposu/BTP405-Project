import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div>
            <div className="navbar w-full bg-neutral rounded-bl-xl rounded-br-xl p-4">
                <img className="mx-4" src="logo.svg" alt="" width="200px" />
                <div className="flex justify-end w-full">
                    <a className="btn btn-primary mx-4 flex">Login</a>
                    <a className="btn btn-outline mx-4">Sign Up</a>
                </div>
            </div>

            {/* Hero Section */}
            <div
                className="hero min-h-screen relative"
                style={{
                    backgroundImage:
                        "url(https://images.pexels.com/photos/2403251/pexels-photo-2403251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>

                {/* Key Features Section */}
                <div className="container mx-auto pt-12 absolute inset-x-0 top-0 text-center ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                        <div className="bg-white rounded-lg shadow-lg p-6 bg-transparent">
                            <h2 className="text-xl font-semibold mb-4">Advanced expenses filtering</h2>
                            <p>Users can view the list of their purchases in certain categories, such as Grocery, Electronics, Fast Food, Restaurant, etc.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Setting budget for a period of time</h2>
                            <p>Users can set daily and monthly spending limits and will be notified if their spending is close to or exceeds the limit.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Expenses dynamics tracking</h2>
                            <p>Users can view their spending statistics compared to previous months.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Custom spending tags</h2>
                            <p>Create your custom tags to make your records more organized.</p>
                        </div>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="hero-content text-center text-neutral-content relative z-10">
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
