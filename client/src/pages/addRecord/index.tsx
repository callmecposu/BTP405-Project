import React, {useEffect, useState} from 'react'
import SpendingForm from '@/components/spendingForm'
import Header from '@/components/header'
import { useRouter } from 'next/router'

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


export default function AddRecord({user, jwt}: any) {
    const router = useRouter();

    useEffect(() => {
        if (!user && router.isReady) {
            router.push('/login');
        }
    }, [router, user])

    if(!user) {
        return <div>Loading...</div>
    }

    const [source, setSource] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState([]);
    const [note, setNote] = useState('');

    const handleAddRecord = () => {
        fetch('http://localhost:8000/spendingRecord', {
            method: 'POST',
            headers: {
                "Token": jwt,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({
                source,
                date,
                amount,
                category,
                tags,
                note,
            }),
        }).then(async (response) => {
            if (response.ok) {
                console.log("Spending record added successfully");
            }
            router.push('/dashboard')
        }).catch((error) => {
            console.log("Error adding spending record: ", error);
        })
    }

    return (
        <div>
            <Header 
                user={user} 
                route={"Add Spending Record"} 
                content={<div>Fill out this form to add new spending record</div>}
            />
            <div className="container mx-auto mt-8">
                <SpendingForm 
                    type="add" 
                    source={source}
                    setSource={setSource}
                    date={date}
                    setDate={setDate}
                    amount={amount}
                    setAmount={setAmount}
                    category={category}
                    setCategory={setCategory}
                    tags={tags}
                    setTags={setTags}
                    note={note}
                    setNote={setNote}
                    handleSubmit={handleAddRecord}
                />
            </div>
        </div>
    )
}
