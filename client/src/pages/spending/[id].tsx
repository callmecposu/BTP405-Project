import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import { Select, SelectItem } from '@nextui-org/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
            jwt
        },
    };
};

const ProfilePage: React.FC<any> = ({user, jwt}) => {
    const [spending, setSpending] = useState<any>({});
    const router = useRouter();

    const id = router.query.id;

    const getSpendingRecord = async () => {
        const response = await fetch(`http://localhost:8000/spendingRecord?id=${id}`, {
            method: "GET",
            headers: {
                "Token": jwt,
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
            }
        });
        const result = await response.json();
        setSpending(result);
    }

    useEffect(() => {
        if(router.isReady) getSpendingRecord();
    }, [router.isReady])

    return (
        <div>
            <Header 
                user={user} 
                route={"Spending Record"} 
                content={<div>View your Spending Record Details</div>}
            />
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4">Spending Record</h1>
                <h2 className="text-2xl font-semibold mb-4">{spending?.source}</h2>
                <div className="flex gap-2">
                    {
                        spending?.tags?.map((tag: any, index: number) => {
                            return (
                                <div key={index} className="flex justify-between mb-4 bg-white shadow-sm px-3 py-1 rounded-full border">
                                    <span>{tag}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='flex gap-3'>    
                    <div className="text-xl border-2 p-3 px-4 rounded-xl flex items-center gap-4 w-max flex-wrap">
                        <div className='bg-white rounded-full w-10 h-10 shadow-sm flex items-center justify-center text-gray-600'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M16 16c0-1.105-3.134-2-7-2s-7 .895-7 2s3.134 2 7 2s7-.895 7-2ZM2 16v4.937C2 22.077 5.134 23 9 23s7-.924 7-2.063V16M9 5c-4.418 0-8 .895-8 2s3.582 2 8 2M1 7v5c0 1.013 3.582 2 8 2M23 4c0-1.105-3.1-2-6.923-2c-3.824 0-6.923.895-6.923 2s3.1 2 6.923 2S23 5.105 23 4Zm-7 12c3.824 0 7-.987 7-2V4M9.154 4v10.166M9 9c0 1.013 3.253 2 7.077 2C19.9 11 23 10.013 23 9"/></svg>
                        </div>
                        <div className="font-medium text-lg">${spending?.amount}</div>
                    </div>
                    <div className="text-xl border-2 p-3 px-4 rounded-xl flex items-center gap-4 w-max">
                        <div className='bg-white rounded-full w-10 h-10 shadow-sm flex items-center justify-center text-gray-600'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M27 22.141V18a2 2 0 0 0-2-2h-8v-4h2a2.002 2.002 0 0 0 2-2V4a2.002 2.002 0 0 0-2-2h-6a2.002 2.002 0 0 0-2 2v6a2.002 2.002 0 0 0 2 2h2v4H7a2 2 0 0 0-2 2v4.142a4 4 0 1 0 2 0V18h8v4.142a4 4 0 1 0 2 0V18h8v4.141a4 4 0 1 0 2 0M13 4h6l.001 6H13ZM8 26a2 2 0 1 1-2-2a2.002 2.002 0 0 1 2 2m10 0a2 2 0 1 1-2-2a2.003 2.003 0 0 1 2 2m8 2a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2"/></svg>
                        </div>
                        <div className="font-medium text-lg">{spending?.category}</div>
                    </div>
                    <div className="text-xl border-2 p-3 px-4 rounded-xl flex items-center gap-4 w-max">
                        <div className='bg-white rounded-full w-10 h-10 shadow-sm flex items-center justify-center text-gray-600'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 14q-.425 0-.712-.288T7 13q0-.425.288-.712T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14m4 0q-.425 0-.712-.288T11 13q0-.425.288-.712T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14m4 0q-.425 0-.712-.288T15 13q0-.425.288-.712T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6z"/></svg>
                        </div>
                        <div className="font-medium text-lg">{(new Date(spending?.date?.$date)).toDateString()}</div>
                    </div>
                </div>
                <div className="text-xl border-2 p-3 px-4 rounded-xl flex items-center gap-4 w-max mt-4 mb-8">
                    <div className='bg-white rounded-full w-10 h-10 shadow-sm flex items-center justify-center text-gray-600 self-start'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M21.25 6.861v6.342a2.057 2.057 0 0 1-.606 1.459l-5.982 5.982a2.055 2.055 0 0 1-1.46.606h-6.34a4.111 4.111 0 0 1-4.112-4.111V6.86a4.111 4.111 0 0 1 4.111-4.11H17.14a4.111 4.111 0 0 1 4.111 4.111"/><path d="m14.056 21.075l-.514-4.11a3.082 3.082 0 0 1 3.443-3.444l4.11.514"/></g></svg>
                    </div>
                    <div className="font-medium text-lg">
                        Note:<br/>
                        <div className='text-lg font-light'>{spending?.note || "No note provided"}</div>
                    </div>
                </div>
                <Link href="/dashboard" className='bg-primary text-white font-semibold rounded-lg mt-5 p-3 px-5'>Go Back</Link>
            </div>
        </div>
    );
};

export default ProfilePage;
