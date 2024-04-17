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
    const [date, setDate] = useState<any>('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState([]);
    const [note, setNote] = useState('');

    const [spending, setSpending] = useState<any>({});

    const id = router.query.id;

    const handleAddRecord = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URI}/spendingRecord/${id}`, {
            method: 'PUT',
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

    const getSpendingRecord = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/spendingRecord?id=${id}`, {
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

    useEffect(() => {
        console.log("Spending: ", spending);
        if(spending) {
            setSource(spending.source || '');
            setDate(spending.date ? (new Date(spending.date?.$date)).toISOString().split('T')[0] : '');
            setAmount(spending.amount || '');
            setCategory(spending.category || '');
            setTags(spending.tags || []);
            setNote(spending.note || '');
        }
    }, [spending])

    return (
        <div>
            <Header 
                user={user} 
                route={"Edit Spending Record"} 
                content={<div>Fill out this form to edit spending record</div>}
            />
            <div className="container mx-auto mt-8">
                <SpendingForm 
                    type="edit" 
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
