import { useEffect } from "react";
import Header from "@/components/header";
import {Card, CardBody, Button, CardFooter, CardHeader} from "@nextui-org/react";

export const getServerSideProps = async (context: any) => {
    const jwt = context.req.cookies["jwt"];
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
        },
    };
};

const Home = ({ user }: any) => {
    return (
        <div>
            <Header 
                user={user} 
                route={"Dashboard"} 
                content={<div className="text-center">Explore detailed spending statistics<br /> and view all expenditure records<br /> on the dashboard page.</div>}
            />
            <div className="container flex gap-3 p-3 m-auto flex-wrap">
                <Card className="flex-1 border-2 rounded-xl min-w-[300px]">
                    <CardHeader className="absolute justify-end">
                        <div className="w-5 text-lg cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M9.5 13a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"/></svg>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="flex justify-between items-center mt-4">
                            <div>
                                <h2 className="text-xl font-ligth  mb-2">Your monthly budget</h2>
                                <p className="text-4xl font-semibold">$5000<small>.00</small></p>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="justify-between">
                        <div className="flex items-center">
                            <div className="bg-primary w-2 h-2 rounded-full mr-3 mt-1"></div>
                            <p className="text-black text-tiny underline cursor-pointer font-extralight text-zinc-500">Learn how to set your budget</p>
                        </div>
                    </CardFooter>
                </Card>
                <Card className="flex-1 border-2 rounded-xl min-w-[300px]">
                    <CardBody>
                        <div className="flex justify-between items-center mt-4">
                            <div>
                                <h2 className="text-xl font-ligth mb-2">Remaining Balance</h2>
                                <p className="text-4xl font-semibold flex items-center">
                                    $1580<small>.78</small>
                                    <div className="text-sm ml-4 bg-success px-2 py-1 rounded-xl">+18.7%</div>
                                </p>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="justify-between">
                        <div className="flex items-center">
                            <div className="bg-primary w-2 h-2 rounded-full mr-3 mt-1"></div>
                            <p className="text-black text-tiny underline cursor-pointer font-extralight text-zinc-500">Learn how to optimze your spendings</p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <div className="container flex gap-3 p-3 m-auto flex-wrap">
                <Card>
                    
                </Card>
            </div>
        </div>
    );
};

export default Home;
