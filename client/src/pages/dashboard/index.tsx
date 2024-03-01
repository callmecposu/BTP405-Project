import { useEffect, useState } from "react";
import Header from "@/components/header";
import {Card, CardBody, Button, CardFooter, CardHeader} from "@nextui-org/react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import styled from '@emotion/styled'
import { Bar, Doughnut } from 'react-chartjs-2';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, ChipProps, getKeyValue} from "@nextui-org/react";


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

const PieChartWrapper = styled.div`
    position: relative;
    width: 100vw;
    min-height: 400px;
    max-height: 400px;
    max-width: 35%;
    flex: 1;
    @media (max-width: 765px) {
        max-width: 100%;
        margin-right: 0;
    }
`

const BarChartWrapper = styled.div`
    position: relative;
    width: 100vw;
    min-height: 400px;
    max-height: 400px;
    max-width: 55%;
    flex: 2;
    min-width: 400; 
    margin-bottom: 2rem;
    margin-right: 3rem;
    @media (max-width: 765px) {
        max-width: 100%;
        margin-right: 0;
    }
`

const Home = ({ user, jwt }: any) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        ArcElement,
        Title,
        Tooltip,
        Legend
    );
    
    const barOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Spendings during same periods of time',
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };
    
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    
    const data = {
        labels,
        datasets: [
            {
                label: 'Gorcery',
                data: labels.map(() => (Math.floor(Math.random() * 50000)/100)),
                backgroundColor: '#db4431',
            },
            {
                label: 'Transport',
                data: labels.map(() => (Math.floor(Math.random() * 50000)/100)),
                backgroundColor: '#e25d33',
            },
            {
                label: 'Health',
                data: labels.map(() => (Math.floor(Math.random() * 50000)/100)),
                backgroundColor: '#ec7a36',
            },
            {
                label: 'Restaruants',
                data: labels.map(() => (Math.floor(Math.random() * 50000)/100)),
                backgroundColor: '#f29237',
            },
            {
                label: 'Entertainment',
                data: labels.map(() => (Math.floor(Math.random() * 50000)/100)),
                backgroundColor: '#edd147',
            },
            {
                label: 'Bills',
                data: labels.map(() => (Math.floor(Math.random() * 50000)/100)),
                backgroundColor: '#e6db68',
            },
            {
                label: 'Others',
                data: labels.map(() => (Math.floor(Math.random() * 50000)/100)),
                backgroundColor: 'rgb(232, 232, 232)',
            },
        ],
    };

    const pieData = {
        labels: ['Gorcery', 'Transport', 'Health', 'Restaruants', 'Entertainment', 'Bills', 'Others'],
        datasets: [
            {
                label: 'Spent',
                data: data.datasets.map(() => Math.floor(Math.random() * 50000)/100),
                backgroundColor: [
                    '#db4431',
                    '#e25d33',
                    '#ec7a36',
                    '#f29237',
                    '#edd147',
                    '#e6db68',
                    'rgb(232, 232, 232)',
                ],
                borderWidth: 0,
            },
        ],
    };

    const pieOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Spending by Categories',
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const columns = [
        {
          key: "source",
          label: "Source",
        },
        {
          key: "amount",
          label: "Amount",
        },
        {
          key: "date",
          label: "Date",
        },
        {
          key: "category",
          label: "Category",
        },
    ];

    const [spendings, setSpendings] = useState<any[]>([]);

    useEffect(() => {
        if(jwt) {
            fetch(
                'http://localhost:8000/spendingRecord?query=&dateFrom=-1&dateTo=-1&amountFrom=-1&amountTo=-1&category=&sorting=date_desc',
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Headers": "*",
                    }
                }
            )
            .then(response => response.json())
            .then(data => setSpendings(data))
        }
    }, [])
      

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
                                    <span>$1580</span><small>.78</small>
                                    <span className="text-sm ml-4 bg-success px-2 py-1 rounded-xl">+18.7%</span>
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
                <Card className="flex-1 d-flex flex-row justify-around flex-wrap" style={{maxWidth: '100%'}}>
                    <BarChartWrapper className="chart-container" >
                        <Bar options={barOptions} data={data} />
                    </BarChartWrapper>
                    <PieChartWrapper className="chart-container" >
                        <Doughnut options={pieOptions} data={pieData} />
                    </PieChartWrapper>
                </Card>
            </div>
            <div className="container flex gap-3 p-3 m-auto flex-wrap mt-5">
                <Card className="flex-1 border-2 rounded-xl min-w-[300px] p-1 pt-0">
                    <CardBody className="flex justify-between items-center">
                        <div className="flex">
                            <div className="text-3xl text-primary border-2 p-2 rounded-full mr-4" style={{width: "max-content", display: "inline-block", height: "max-content"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M15.5 10.071c0-2.582-1.426-4.853-3.633-6.087l1.039-1.87a.75.75 0 1 0-1.312-.728l-1.11 1.997A8.1 8.1 0 0 0 8 3a8.1 8.1 0 0 0-2.485.383l-1.11-1.997a.75.75 0 1 0-1.31.728l1.038 1.87C1.926 5.218.5 7.489.5 10.07c0 .813.169 1.603.614 2.294c.448.697 1.09 1.158 1.795 1.46C4.227 14.39 6.02 14.5 8 14.5s3.773-.11 5.09-.675c.707-.302 1.348-.763 1.796-1.46c.446-.691.614-1.481.614-2.294m-13.5 0C2 12.5 4 13 8 13s6-.5 6-2.929c0-3-2.5-5.571-6-5.571s-6 2.57-6 5.57Zm8.5 1.179a.75.75 0 0 1-.75-.75V9a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-.75.75m-5.75-.75a.75.75 0 0 0 1.5 0V9a.75.75 0 0 0-1.5 0z" clip-rule="evenodd"/></svg>
                            </div>
                            <span className="mt-2">
                                Your spending analysis for February shows <strong>consistent</strong> spending in <strong>groceries</strong>, <strong>restaurants</strong>, and <strong>entertainment</strong>. However, there's a notable increase in <strong>health expenses</strong> during the last week. To optimize, consider <em>meal planning</em> to reduce restaurant costs and explore more <em>affordable entertainment</em> options. Additionally, maintaining a <em>health fund</em> can help manage unexpected medical expenses without affecting your budget drastically.
                            </span>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div>
                <Card>
                    {/* <Table aria-label="Example table with dynamic content">
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={rows}>
                            {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                            )}
                        </TableBody>
                    </Table> */}
                    {JSON.stringify(spendings)}
                </Card>
            </div>
        </div>
    );
};

export default Home;
