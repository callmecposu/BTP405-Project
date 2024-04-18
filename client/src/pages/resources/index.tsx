import React, {useState, useEffect} from 'react'
import Header from '@/components/header'
import Link from 'next/link'
import { useRouter } from 'next/router';
import {Accordion, AccordionItem, Input} from "@nextui-org/react";

export const getServerSideProps = async (context: any) => {
    try {
        const jwt = context.req.cookies["jwt"] || null;
        console.log("JWT: ", jwt);
        let user = null;
        if (jwt) {
            console.log("fetching user...");
            // fetch user by JWT
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/user`, {
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

export default function Resources({user}: any) {
    const router = useRouter();

    const [search, setSearch] = useState('');
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true)

    const getResources = (query: string) => {
        setLoading(true)
        setSearch(query)
        fetch(`${process.env.NEXT_PUBLIC_API_URI}/resources?query=${query || ""}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers": "*",
            }
        }).then((response) => response.json()).then((data) => {
            console.log(data);
            setResources(data);
            setLoading(false)
        }).catch((error) => {
            console.error('Error:', error);
            setLoading(false)
        })
    }

    useEffect(() => {
        getResources("");
    }, [])

    return (
        <div className='px-3'>
            {
                user ? 
                <Header
                    user={user}
                    route="Resources"
                    content="Resources to help you manage your finances"
                /> : (
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
                )
            }
            <div className="container mx-auto mt-8 border rounded-xl p-4 mb-10 flex gap-3 flex-wrap">
                <Input
                    placeholder="Our AI search will help you find the resources you need"
                    type="text"
                    className="border border-gray-400 mb-4 rounded-xl px-1 min-w-[225px] flex-1 bg-white"
                    value={search}
                    required
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            getResources(search);
                        }
                    }}
                />
                <div className='flex gap-3'>
                    <div className="bg-primary py-2 px-5 text-white rounded-lg h-10 cursor-pointer" onClick={() => {getResources(search)}}>
                        Search
                    </div>
                    <div className="py-2 px-5 text-gray-400 border-2 border-gray-400 rounded-lg h-10 cursor-pointer leading-5" onClick={() => {getResources("")}}>
                        Reset
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-8 border rounded-xl p-4 mb-10">
                {
                    loading ? (
                        <div className='m-auto text-3xl mt-8 w-max mb-8'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity="0.3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>
                        </div>
                    ) : (
                        resources?.length === 0 ? (
                            <div className='text-2xl text-center text-gray-400'>
                                No resources found
                            </div>
                        ) :
                        <Accordion className=''>
                            {
                                resources?.map((resource: any) => {
                                    return (
                                        <AccordionItem 
                                            key={resource?.title} 
                                            className='py-2 text-left flex-start'
                                            classNames={{
                                                title: 'w-max font-semibold text-xl',
                                                subtitle: 'text-left text-md font-light',
                                            }}
                                            aria-label={resource?.title} 
                                            title={resource?.title}
                                            subtitle={resource?.subtitle}
                                        >
                                            <div dangerouslySetInnerHTML={{__html: resource?.content}} className='p-4'></div>
                                        </AccordionItem>
                                    )
                                })
                            }
                        </Accordion>
                    )
                }
            </div>
        </div>
    )
}
