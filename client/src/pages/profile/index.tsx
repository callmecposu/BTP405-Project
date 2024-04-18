import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import { Select, SelectItem } from '@nextui-org/react';
import { useRouter } from 'next/router';

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

const ProfilePage: React.FC<any> = ({user, jwt}) => {
    const router = useRouter();

    useEffect(() => {
        if (!user && router.isReady) {
            router.push('/login');
        }
    }, [router, user])

    if(!user) {
        return <div>Loading...</div>
    }

    const [budgetType, setBudgetType] = useState(user?.budget?.budget_type || '');
    const [budgetAmount, setBudgetAmount] = useState(user?.budget?.max_amount || '');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleBudgetTypeChange = (value: string) => {
        setBudgetType(value);
    };

    const handleBudgetAmountChange = (value: string) => {
        setBudgetAmount(value);
    };

    const handleSave = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URI}/updateBudget`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Token: jwt,
            },
            body: JSON.stringify({
                budget_type: budgetType,
                max_amount: budgetAmount,
            }),
        }).then(async (response) => {
            if (response.ok) {
                setMessageType('text-emerald-500');
                setMessage('Budget updated successfully');
                setTimeout(() => {
                    setMessage('');
                    setMessageType('');
                }, 3000);
            } else {
                let data = await response.json();
                setMessageType('text-error');
                setMessage(`Failed to update budget: ${data?.message || 'Unknown error'}`);
            }
        });
    }

    return (
        <div className='mx-3'>
            <Header 
                user={user} 
                route={"Profile"} 
                content={<div>View and Edit your Profile data</div>}
            />
            <div className="container mx-auto mt-8">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>
                <div className="flex-1 border-2 rounded-xl min-w-[300px] p-3 flex gap-x-8 gap-y-4 flex-wrap mb-4">
                    <div className="w-full font-bold text-xl">
                        Personal Information
                    </div>
                    <div className="mb-4">
                        <label className="font-semibold">Username:</label>
                        <p>{user?.username}</p>
                    </div>
                    <div className="mb-4">
                        <label className="font-semibold">Name:</label>
                        <p>{user?.first_name} {user?.last_name}</p>
                    </div>
                </div>
                
                <div className="flex-1 border-2 rounded-xl min-w-[300px] p-3 flex gap-x-8 gap-y-1 flex-col mb-10">   
                    <div className="w-full font-semibold text-xl mb-4">
                        Budgeting
                    </div>
                    <div className={`mb-3 ${messageType} font-bold`}>{message}</div>
                    <div className="mb-4">
                        <label className="font-bold">Budget Type:</label>
                        <Select
                            placeholder="Budget Type"
                            aria-label="Budget Type"
                            value={budgetType}
                            onChange={(e) => handleBudgetTypeChange(e.target.value)}
                            className="border border-gray-400 rounded-xl px-4 w-1/3 mt-2 bg-white pl-0"
                            classNames={{
                                selectorIcon: "right-0 top-1/3", 
                                listboxWrapper: " bg-white rounded-md shadow-md w-max",
                            }}
                            defaultSelectedKeys={[budgetType]}
                        >
                            <SelectItem key="monthly" className="my-2">Monthly</SelectItem>
                            <SelectItem key="weekly" className="my-2">Weekly</SelectItem>
                            <SelectItem key="daily" className="my-2">Daily</SelectItem>
                        </Select>
                    </div>
                    <div className="mb-4">
                        <label className="font-bold">Budget Amount:</label><br/>
                        <input
                            type="number"
                            value={budgetAmount}
                            placeholder='Budget Amount'
                            onChange={(e) => handleBudgetAmountChange(e.target.value)}
                            className="border border-gray-400 rounded-xl px-4 w-1/3 h-10 mt-2"
                        />
                    </div>
                    <button className="bg-primary text-white px-4 py-2 rounded w-20" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
