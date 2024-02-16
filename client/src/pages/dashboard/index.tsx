import { useEffect } from "react";
import Header from "@/components/header";

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
            <div className=" text-3xl">Hello, {user.first_name}!</div>
        </div>
    );
};

export default Home;
