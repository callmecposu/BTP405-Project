import { useEffect, useMemo, useState } from "react";
import Header from "@/components/header";
import {Card, CardBody, Button, CardFooter, CardHeader, Pagination} from "@nextui-org/react";
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
import { Input, Select, SelectItem } from '@nextui-org/react';
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
    
    const pieOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Spending by Categories this Month',
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const columns = [{ key: "source", label: "Source" }, { key: "amount", label: "Amount" }, { key: "date", label: "Date" }, { key: "category", label: "Category" }, { key: "actions", label: "Actions" }];

    const [spendings, setSpendings] = useState<any[]>([]);
    const [currentSpendings, setCurrentSpendings] = useState<any[]>([]);
    const [spentSum, setSpentSum] = useState<number>(0);
    const [pastSpendings, setPastSpendings] = useState<any[]>([{}]);
    const [historyData, setHistoryData] = useState<any>([]);
    const [pieData, setPieData] = useState<any>([]);

    const getCurrentSpendings = () => {
        fetch('http://localhost:8000/currentSpendings', {
            method: "GET",
            headers: {
                "Token": jwt,
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
            }
        }).then(response => response.json())
        .then(data => {
            setCurrentSpendings(data)
            setSpentSum(data.reduce((acc: number, curr: any) => acc + curr.amount, 0))
        })
    }
    const getPastSpendings = () => {
        fetch('http://localhost:8000/pastSpendings', {
            method: "GET",
            headers: {
                "Token": jwt,
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
            }
        }).then(response => response.json())
        .then(data => {
            const newPieData = {
                labels: ['Gorcery', 'Transport', 'Health', 'Restaurant', 'Entertainment', 'Bills', 'Others'],
                datasets: [
                    {
                        label: 'Spent',
                        data: [data[0].spending.Grocery, data[0].spending.Transport, data[0].spending.Health, data[0].spending.Restaurants, data[0].spending.Entertainment, data[0].spending.Bills, data[0].spending.Others],
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

            setPieData(newPieData);

            data.reverse();
            setPastSpendings(data)
            const colors = ['#db4431', '#e25d33', '#ec7a36', '#f29237', '#edd147', '#e6db68', 'rgb(232, 232, 232)'];
            const newHistoryData = {
                labels: data.map((item: any) => item.period),
                datasets: [
                    {
                        label: 'Gorcery',
                        data: data.map((item: any) => item.spending.Grocery),
                        backgroundColor: colors[0],
                    },
                    {
                        label: 'Transport',
                        data: data.map((item: any) => item.spending.Transport),
                        backgroundColor: colors[1],
                    },
                    {
                        label: 'Health',
                        data: data.map((item: any) => item.spending.Health),
                        backgroundColor: colors[2],
                    },
                    {
                        label: 'Restaurants',
                        data: data.map((item: any) => item.spending.Restaurants),
                        backgroundColor: colors[3],
                    },
                    {
                        label: 'Entertainment',
                        data: data.map((item: any) => item.spending.Entertainment),
                        backgroundColor: colors[4],
                    },
                    {
                        label: 'Bills',
                        data: data.map((item: any) => item.spending.Bills),
                        backgroundColor: colors[5],
                    },
                    {
                        label: 'Others',
                        data: data.map((item: any) => item.spending.Others),
                        backgroundColor: colors[6],
                    },
                ]
            };

            setHistoryData(newHistoryData);
        })
    }

    useEffect(() => {
        if(jwt) {
            fetch(
                'http://localhost:8000/spendingRecord?query=&dateFrom=-1&dateTo=-1&amountFrom=-1&amountTo=-1&category=&sorting=date_desc',
                {
                    method: "GET",
                    headers: {
                        "Token": jwt,
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Headers": "*",
                    }
                }
            )
            .then(response => response.json())
            .then(data => {
                setSpendings(data)
            })
        }
        getCurrentSpendings();
        getPastSpendings();
    }, [])
      
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedFromDate, setSelectedFromDate] = useState('');
    const [selectedToDate, setSelectedToDate] = useState('');
    const [selectedMinPrice, setSelectedMinPrice] = useState('');
    const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
    const [selectedSortBy, setSelectedSortBy] = useState('date_desc');

    const [page, setPage] = useState(1);

    const spendingsPage = useMemo(() => {
        const start = (page-1)*5;
        const end = start + 5;

        return spendings.slice(start, end);
    }, [spendings, page]);

    const handleSearch = () => {
        fetch(
            `http://localhost:8000/spendingRecord?query=${searchText}&dateFrom=${selectedFromDate || '-1'}&dateTo=${selectedToDate || '-1'}&amountFrom=${selectedMinPrice || '-1'}&amountTo=${selectedMaxPrice || '-1'}&category=${selectedCategory}&sorting=${selectedSortBy}`,
            {
                method: "GET",
                headers: {
                    "Token": jwt,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers": "*",
                }
            }
        )
        .then(response => response.json())
        .then(data => setSpendings(data))
    };
    
    const handleClear = () => { 
        setSearchText('');
        setSelectedCategory('');
        setSelectedFromDate('');
        setSelectedToDate('');
        setSelectedMinPrice('');
        setSelectedMaxPrice('');
        setSelectedSortBy('date_desc');
        fetch(
            'http://localhost:8000/spendingRecord?query=&dateFrom=-1&dateTo=-1&amountFrom=-1&amountTo=-1&category=&sorting=date_desc',
            {
                method: "GET",
                headers: {
                    "Token": jwt,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers": "*",
                }
            }
        )
        .then(response => response.json())
        .then(data => setSpendings(data))
    }

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
                                <h2 className="text-xl font-ligth  mb-2">Your {user?.budget?.budget_type} budget</h2>
                                <p className="text-4xl font-semibold">${Math.floor(user?.budget?.max_amount)}<small>.{(user?.budget?.max_amount % 1).toFixed(2).split('.')[1]}</small></p>
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
                                    <span>$</span>{Math.floor(user?.budget?.max_amount-spentSum)}<small>.{(user?.budget?.max_amount-spentSum % 1).toFixed(2).split('.')[1]}</small>
                                    {/* <span className="text-sm ml-4 bg-success px-2 py-1 rounded-xl">+18.7%</span> */}
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
                    {
                        historyData?.datasets?.length &&
                        <BarChartWrapper className="chart-container" >
                            <Bar options={barOptions} data={historyData} />
                        </BarChartWrapper>
                    }
                    {
                        pieData?.datasets?.length &&
                        <PieChartWrapper className="chart-container" >
                            <Doughnut options={pieOptions} data={pieData} />
                        </PieChartWrapper>
                    }
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
            <div className="container flex gap-3 p-3 m-auto flex-wrap mt-5">
                <Card className="flex-1 min-w-[300px] p-1 pt-0 border-2 rounded-xl mb-5">
                    <div className="bg-white rounded-xl px-5 py-2 my-3 mx-2 shadow">
                        <div>
                            <div className="flex gap-2 mb-3">
                                <Select
                                    placeholder="Category"
                                    aria-label="Category"
                                    value={selectedCategory}
                                    className="border border-gray-400 rounded-xl px-4 w-1/3"
                                    classNames={{
                                        selectorIcon: "right-0 top-1/3", 
                                        listboxWrapper: " bg-white rounded-md shadow-md w-max",
                                    }}
                                    onChange={(value) => setSelectedCategory(value.target.value)}
                                >
                                    <SelectItem key="Grocery" className="my-2">Grocery</SelectItem>
                                    <SelectItem key="Transport" className="my-2">Transport</SelectItem>
                                    <SelectItem key="Health" className="my-2">Health</SelectItem>
                                    <SelectItem key="Restaurants" className="my-2">Restaurants</SelectItem>
                                    <SelectItem key="Entertainment" className="my-2">Entertainment</SelectItem>
                                    <SelectItem key="Bills" className="my-2">Bills</SelectItem>
                                    <SelectItem key="Others" className="my-2">Other</SelectItem>
                                </Select>
                                <Input
                                    placeholder="Search"
                                    className="border border-gray-400 rounded-xl px-4"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                                <Button onClick={handleSearch} className="border-2 border-primary rounded-xl px-6">Search</Button>
                                <Button onClick={handleClear} className="border-2 border-gray-500 rounded-xl px-6 text-gray-500">Clear</Button>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <Input
                                    placeholder="From"
                                    type="date"
                                    className="border border-gray-400 rounded-xl px-4 min-w-[165px] w-max"
                                    max={new Date(selectedToDate || new Date()).toISOString().split('T')[0]}
                                    value={selectedFromDate}
                                    onChange={(date) => setSelectedFromDate(new Date(date.target.value || new Date()).toISOString().split('T')[0])}
                                />
                                <Input
                                    placeholder="To"
                                    type="date"
                                    className="border border-gray-400 rounded-xl px-4 min-w-[165px] w-max"
                                    min={new Date(selectedFromDate || new Date()).toISOString().split('T')[0]}
                                    max={new Date().toISOString().split('T')[0]}
                                    value={selectedToDate}
                                    onChange={(date) => setSelectedToDate(new Date(date.target.value || new Date()).toISOString().split('T')[0])}
                                />
                                <Input
                                    placeholder="Min Price"
                                    type="number"
                                    className="border border-gray-400 rounded-xl px-4 min-w-[125px] w-max"
                                    value={selectedMinPrice}
                                    onChange={(e) => setSelectedMinPrice(e.target.value)}
                                />
                                <Input
                                    placeholder="Max Price"
                                    type="number"
                                    className="border border-gray-400 rounded-xl px-4 min-w-[125px] w-max"
                                    value={selectedMaxPrice}
                                    onChange={(e) => setSelectedMaxPrice(e.target.value)}
                                />
                                <Select
                                    placeholder="Sort By"
                                    aria-label="Sort By"
                                    defaultSelectedKeys={["date_desc"]}
                                    value={selectedSortBy}
                                    className="border border-gray-400 rounded-xl px-4 min-w-[155px] w-max"
                                    classNames={{
                                        selectorIcon: "right-0 top-1/3", 
                                        listboxWrapper: " bg-white rounded-md shadow-md w-max",
                                    }}
                                    onChange={(value) => setSelectedSortBy(value.target.value)}
                                >
                                    <SelectItem key="date_desc" className="my-2">Date desc.</SelectItem>
                                    <SelectItem key="date_asc" className="my-2">Date asc.</SelectItem>
                                    <SelectItem key="amount_desc" className="my-2">Amount desc.</SelectItem>
                                    <SelectItem key="amount_asc" className="my-2">Amount asc.</SelectItem>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <Table 
                        aria-label="Spending records"
                        bottomContent={
                            <div className="flex w-full justify-center">
                                {
                                    spendings.length === 0 ? null :
                                    <Pagination
                                      showControls
                                      showShadow
                                      color="secondary"
                                      page={page}
                                      total={Math.ceil(spendings.length/5)}
                                      className="mt-4"
                                      classNames={{
                                          item: "w-7 h-7 border rounded-md",
                                          next: "rotate-0 border rounded-md ml-2",
                                          prev: "border rounded-md mr-2",
                                          cursor: "w-7 h-7 border rounded-md translate-x-[30px]", 
                                      }}
                                      onChange={(page: number) => setPage(page)}
                                    />
                                }
                            </div>
                          }                    
                    >
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody>
                            {
                                spendingsPage.length === 0 ? 
                                (<TableRow>
                                    <TableCell>&nbsp;</TableCell>
                                    <TableCell>&nbsp;</TableCell>
                                    <TableCell colSpan={1} className="text-center">No records found</TableCell>
                                    <TableCell>&nbsp;</TableCell>
                                    <TableCell>&nbsp;</TableCell>
                                </TableRow>) :
                                spendingsPage.map((spending, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell className="text-center font-bold">{spending.source}</TableCell>
                                            <TableCell className="text-center">${spending.amount}</TableCell>
                                            <TableCell className="text-center">{new Date(spending.date).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</TableCell>
                                            <TableCell className="text-center">
                                                <Chip className="border-2 border-primary w-max m-auto">
                                                    {spending.category}
                                                </Chip>
                                            </TableCell>
                                            <TableCell className="justify-center flex gap-2">
                                                <Button size="sm" className="border border-gray-400 w-7 h-7 rounded-md flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M251 123.13c-.37-.81-9.13-20.26-28.48-39.61C196.63 57.67 164 44 128 44S59.37 57.67 33.51 83.52C14.16 102.87 5.4 122.32 5 123.13a12.08 12.08 0 0 0 0 9.75c.37.82 9.13 20.26 28.49 39.61C59.37 198.34 92 212 128 212s68.63-13.66 94.48-39.51c19.36-19.35 28.12-38.79 28.49-39.61a12.08 12.08 0 0 0 .03-9.75m-46.06 33C183.47 177.27 157.59 188 128 188s-55.47-10.73-76.91-31.88A130.36 130.36 0 0 1 29.52 128a130.45 130.45 0 0 1 21.57-28.11C72.54 78.73 98.41 68 128 68s55.46 10.73 76.91 31.89A130.36 130.36 0 0 1 226.48 128a130.45 130.45 0 0 1-21.57 28.12ZM128 84a44 44 0 1 0 44 44a44.05 44.05 0 0 0-44-44m0 64a20 20 0 1 1 20-20a20 20 0 0 1-20 20"/></svg>
                                                </Button>
                                                <Button size="sm" className="border border-gray-400 w-7 h-7 rounded-md flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 20h4L18.5 9.5a2.828 2.828 0 1 0-4-4L4 16zm9.5-13.5l4 4"/></svg>                                                </Button>
                                                <Button size="sm" className="border border-error text-error w-7 h-7 rounded-md flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M9 2H7a.5.5 0 0 0-.5.5V3h3v-.5A.5.5 0 0 0 9 2m2 1v-.5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2V3H2.251a.75.75 0 0 0 0 1.5h.312l.317 7.625A3 3 0 0 0 5.878 15h4.245a3 3 0 0 0 2.997-2.875l.318-7.625h.312a.75.75 0 0 0 0-1.5zm.936 1.5H4.064l.315 7.562A1.5 1.5 0 0 0 5.878 13.5h4.245a1.5 1.5 0 0 0 1.498-1.438zm-6.186 2v5a.75.75 0 0 0 1.5 0v-5a.75.75 0 0 0-1.5 0m3.75-.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75" clip-rule="evenodd"/></svg>                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                                )
                            }
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default Home;
