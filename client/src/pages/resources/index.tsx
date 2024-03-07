import React from 'react'
import Header from '@/components/header'
import Link from 'next/link'
import { useRouter } from 'next/router';
import {Accordion, AccordionItem} from "@nextui-org/react";

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

export default function Resources({user}: any) {
    const router = useRouter();

    return (
        <div>
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
            <div className="container mx-auto mt-8 border rounded-xl p-4 mb-10">
                <Accordion className=''>
                    <AccordionItem 
                        key="1" 
                        className='py-2 text-left flex-start'
                        classNames={{
                            title: 'w-max font-semibold',
                            subtitle: 'text-left text-sm font-light',
                        }}
                        aria-label="Understanding Your Income Streams" 
                        title="Understanding Your Income Streams"
                        subtitle="Learn how to categorize and maximize your income sources, whether it's a salary, freelance work, investments, or side hustles."
                    >
                        <div>
                            <strong>Identifying Your Income Streams:</strong><br/>
                            Start by making a list of all your income sources. This includes your salary, freelance work, investments, and side hustles. Write down the amount of money you earn from each source and how often you receive it.<br/>
                            <br/><strong>Categorizing Your Income Streams:</strong><br/>
                            Group your income streams into different categories. For example, you can create categories for fixed income, variable income, and passive income. Fixed income includes your salary and freelance work. Variable income includes income from side hustles or freelance work that varies from month to month. Passive income includes income from investments, such as dividend stocks or rental properties.<br/>
                            <br/><strong>Maximizing Your Income Streams:</strong><br/>
                            Look for ways to increase your income from each source. Consider ways to increase your salary, such as asking for a raise, taking on additional responsibilities, or finding a higher-paying job. Look for ways to increase your freelance work, such as taking on more clients, offering new services, or increasing your rates. Consider ways to grow your passive income, such as investing in additional assets or starting a side hustle that can generate income without requiring your direct involvement.<br/>
                            <br/><strong>Tracking Your Income Streams:</strong><br/>
                            Keep track of your income streams to ensure you're making the most of your money. Use <strong>BudgetBuddy</strong> to track your income and expenses. This will help you identify areas where you can cut back and allocate more money towards saving or investing. Regularly review your income streams to see if there are any changes you can make to increase your earnings.<br/>
                            <br/><i>By following these tips, you'll have a better understanding of your income streams and how to maximize them.</i><br/>
                        </div>
                    </AccordionItem>
                    <AccordionItem 
                        key="2" 
                        className='py-2 text-left flex-start'
                        classNames={{
                            title: 'w-max font-semibold',
                            subtitle: 'text-left text-sm font-light',
                        }}
                        aria-label="Tracking Expenses Effectively" 
                        subtitle="Discover the importance of meticulous expense tracking and how it can reveal spending patterns that can be optimized for better financial health."
                        title="Tracking Expenses Effectively"
                    >
                        <div>
                            <strong>Why Tracking Expenses is Important:</strong><br/>
                            Tracking your expenses is crucial for understanding where your money is going and making informed financial decisions. By keeping track of every purchase, you can identify areas where you can cut back and allocate more money towards saving or investing.<br/>
                            <br/><strong>Categorizing Your Expenses:</strong><br/>
                            Use our list of categories for your expenses, such as entertainment, transportation, food, entertainment, and bills, etc. This will help you see where your money is going and identify areas where you can make changes.<br/>
                            <br/><strong>Tracking Cash Expenses:</strong><br/>
                            Don't forget to track your cash expenses, such as small purchases or tips. These expenses can add up quickly and throw off your budget if you're not careful.<br/>
                            <br/><strong>Reviewing Your Expenses:</strong><br/>
                            Regularly review your expenses to see if there are any changes you can make to optimize your spending. Look for areas where you can cut back and allocate more money towards saving or investing.<br/>
                            <br/><i>By tracking your expenses effectively, you'll have a better understanding of your spending habits and can make informed financial decisions.</i><br/>
                        </div>
                    </AccordionItem>
                    <AccordionItem 
                        key="3" 
                        className='py-2 text-left flex-start'
                        classNames={{
                            title: 'w-max font-semibold',
                            subtitle: 'text-left text-sm font-light',
                        }}
                        aria-label="Creating a Realistic Budget" 
                        subtitle="Master the art of crafting a budget that aligns with your financial goals and lifestyle while ensuring you allocate funds for necessities, savings, and discretionary spending."
                        title="Creating a Realistic Budget"
                    >
                        <div>
                            <strong>Determine Your Income:</strong><br/>
                            Start by determining how much money you have coming in each month. Include all sources of income, such as your salary, freelance work, investments, and side hustles.<br/>
                            <br/><strong>List Your Necessary Expenses:</strong><br/>
                            Next, make a list of your necessary expenses, such as rent/mortgage, utilities, groceries, transportation, and minimum payments on debts. Be sure to include any regular expenses, such as pet care or home maintenance.<br/>
                            <br/><strong>Prioritize Your Savings:</strong><br/>
                            Set aside a portion of your income for savings and investments. Make sure to prioritize your emergency fund, retirement savings, and any other financial goals you may have.<br/>
                            <br/><strong>Allocate Funds for Discretionary Spending:</strong><br/>
                            Once you've accounted for necessities and savings, you can allocate funds for discretionary spending. This includes things like entertainment, travel, and hobbies. Be sure to prioritize the things that bring you the most joy and value.<br/>
                            <br/><strong>Flexibility and Adjustments:</strong><br/>
                            Remember that your budget should be flexible enough to accommodate unexpected expenses and changes in your income. Regularly review and adjust your budget as needed to ensure it's working effectively for you.<br/>
                            <br/><i>By following these steps, you'll have a realistic budget that aligns with your financial goals and lifestyle. This will help you achieve financial stability and make the most of your money.<br/></i>
                        </div>
                    </AccordionItem>
                    <AccordionItem 
                        key="4" 
                        className='py-2 text-left flex-start'
                        classNames={{
                            title: 'w-max font-semibold',
                            subtitle: 'text-left text-sm font-light',
                        }}
                        aria-label="Managing Debt Wisely" 
                        subtitle="Explore strategies for tackling debt efficiently, whether it's prioritizing high-interest debt, consolidating loans, or negotiating with creditors."
                        title="Managing Debt Wisely"
                    >
                        <div>
                            <strong>Prioritizing High-Interest Debt:</strong><br/>
                            One effective strategy for managing debt is to prioritize high-interest debt. This means focusing on paying off debts with the highest interest rates first, such as credit card balances or payday loans. By paying off high-interest debt quickly, you can save money on interest charges and free up more of your income for other expenses.<br/>
                            <br/><strong>Consolidating Loans:</strong><br/>
                            Another strategy for managing debt is to consolidate loans. This involves combining multiple debts into a single loan with a lower interest rate and a longer repayment period. This can make it easier to manage your debt and potentially save money on interest charges.<br/>
                            <br/><strong>Negotiating with Creditors:</strong><br/>
                            If you're struggling to make payments on your debt, it may be worth negotiating with your creditors. They may be willing to work with you to come up with a payment plan or offer temporary hardship programs that can reduce or suspend payments for a period of time. Additionally, they may be willing to accept a lump sum payment that is less than the full amount owed, known as a settlement.<br/>
                            <br/><i>By following these strategies, you can manage your debt wisely and make progress towards becoming debt-free. Remember to always prioritize your highest-interest debt, consider consolidating loans, and don't be afraid to negotiate with creditors when needed.</i>
                        </div>
                    </AccordionItem>
                    <AccordionItem 
                        key="5" 
                        className='py-2 text-left flex-start'
                        classNames={{
                            title: 'w-max font-semibold',
                            subtitle: 'text-left text-sm font-light',
                        }}
                        aria-label="Building an Emergency Fund" 
                        subtitle="Understand the significance of having an emergency fund and learn practical steps to establish and maintain one, providing a safety net for unexpected expenses."
                        title="Building an Emergency Fund"
                    >
                        <div>
                            <strong>Why Having an Emergency Fund is Important:</strong><br/>
                            Having an emergency fund is crucial for dealing with unexpected expenses, such as car repairs, medical bills, or losing your job. It helps you avoid going into debt when unexpected expenses arise.<br/>
                            <br/><strong>Determine Your Emergency Fund Goal:</strong><br/>
                            Decide how much you need in your emergency fund based on your income, expenses, and debt. Aim to save 3-6 months' worth of living expenses.<br/>
                            <br/><strong>Start Small:</strong><br/>
                            Don't try to save too much too quickly. Start with a small monthly amount and gradually increase it over time.<br/>
                            <br/><strong>Automate Your Savings:</strong><br/>
                            Set up automatic transfers from your checking account to your savings account. This way, you'll ensure that you save regularly without having to think about it.<br/>
                            <br/><strong>Keep Your Emergency Fund Separate:</strong><br/>
                            Keep your emergency fund in a separate account from your regular savings or checking account. This will help you avoid the temptation to use the money for non-emergency expenses.<br/>
                            <br/><strong>Review and Adjust Your Emergency Fund:</strong><br/>
                            Regularly review your emergency fund to ensure it's on track with your needs. If you've had to use some of the funds, replenish them as soon as possible.<br/>
                            <br/><i>By following these steps, you'll have a safety net for unexpected expenses and peace of mind knowing that you're prepared for life's uncertainties.</i>
                        </div>
                    </AccordionItem>
                    <AccordionItem 
                        key="6" 
                        className='py-2 text-left flex-start'
                        classNames={{
                            title: 'w-max font-semibold',
                            subtitle: 'text-left text-sm font-light',
                        }}
                        aria-label="Investing Basics for Beginners" 
                        subtitle="Get introduced to the fundamentals of investing, including different asset classes, risk tolerance assessment, and strategies for building a diversified investment portfolio."
                        title="Investing Basics for Beginners"
                    >
                        {'defaultContent'}
                    </AccordionItem>
                    <AccordionItem 
                        key="7" 
                        className='py-2 text-left flex-start'
                        classNames={{
                            title: 'w-max font-semibold',
                            subtitle: 'text-left text-sm font-light',
                        }}
                        aria-label="Maximizing Savings with Automated Transfers" 
                        subtitle="Learn how setting up automated transfers to savings accounts can help you effortlessly grow your savings while avoiding the temptation to spend unnecessarily."
                        title="Maximizing Savings with Automated Transfers"
                    >
                        {'defaultContent'}
                    </AccordionItem>
                    <AccordionItem 
                        key="8" 
                        className='py-2 text-left flex-start'
                        classNames={{
                            title: 'w-max font-semibold',
                            subtitle: 'text-left text-sm font-light',
                        }}
                        aria-label="Smart Shopping Habits" 
                        subtitle="Explore techniques for making savvy purchasing decisions, such as comparison shopping, using coupons and discounts, and distinguishing between wants and needs."
                        title="Smart Shopping Habits"
                    >
                        {'defaultContent'}
                    </AccordionItem>
                    <AccordionItem 
                        key="9" 
                        className='py-2 text-left flex-start'
                        classNames={{
                            title: 'w-max font-semibold',
                            subtitle: 'text-left text-sm font-light',
                        }}
                        aria-label="Understanding Credit Scores" 
                        subtitle="Gain insights into how credit scores are calculated, their importance in financial decision-making, and strategies for improving or maintaining a healthy credit score."
                        title="Understanding Credit Scores"
                    >
                        {'defaultContent'}
                    </AccordionItem>
                    <AccordionItem 
                        key="10" 
                        className='py-2 text-left flex-start'
                        classNames={{
                            title: 'w-max font-semibold',
                            subtitle: 'text-left text-sm font-light',
                        }}
                        aria-label="Planning for Retirement" 
                        subtitle="Start planning for retirement early by exploring different retirement savings options, such as employer-sponsored plans like 401(k)s, IRAs, and other investment vehicles."
                        title="Planning for Retirement"
                    >
                        {'defaultContent'}
                    </AccordionItem>
                    <AccordionItem 
                        key="11" 
                        className='py-2 text-left flex-start'
                        classNames={{
                            title: 'w-max font-semibold',
                            subtitle: 'text-left text-sm font-light',
                        }}
                        aria-label="Reviewing Subscriptions and Recurring Expenses"
                        subtitle="Evaluate your subscriptions and recurring expenses regularly to identify unnecessary or unused services, potentially freeing up funds for other financial goals." 
                        title="Reviewing Subscriptions and Recurring Expenses"
                    >
                        {'defaultContent'}
                    </AccordionItem>
                    <AccordionItem 
                        key="12" 
                        className='py-2 text-left flex-start'
                        classNames={{
                            title: 'w-max font-semibold',
                            subtitle: 'text-left text-sm font-light',
                        }}
                        aria-label="Setting SMART Financial Goals" 
                        subtitle="Learn the framework of setting Specific, Measurable, Achievable, Relevant, and Time-bound (SMART) financial goals to keep your financial journey focused and achievable."
                        title="Setting SMART Financial Goals"
                    >
                        {'defaultContent'}
                    </AccordionItem>
                    <AccordionItem 
                        key="13" 
                        className='py-2 text-left flex-start'
                        classNames={{
                            title: 'w-max font-semibold',
                            subtitle: 'text-left text-sm font-light',
                        }}
                        aria-label="Negotiating Better Rates and Fees" 
                        subtitle="Discover strategies for negotiating better rates and fees on loans, credit cards, insurance premiums, and other financial products and services."
                        title="Negotiating Better Rates and Fees"
                    >
                        {'defaultContent'}
                    </AccordionItem>
                    <AccordionItem 
                        key="14" 
                        className='py-2 text-left flex-start'
                        classNames={{
                            title: 'w-max font-semibold',
                            subtitle: 'text-left text-sm font-light',
                        }}
                        aria-label="Staying Informed About Financial News" 
                        subtitle="Understand the importance of staying updated with financial news and trends to make informed decisions about investments, savings, and budget adjustments."
                        title="Staying Informed About Financial News"
                    >
                        {'defaultContent'}
                    </AccordionItem>
                    <AccordionItem 
                        key="15" 
                        className='py-2 text-left flex-start'
                        classNames={{
                            title: 'w-max font-semibold',
                            subtitle: 'text-left text-sm font-light',
                        }}
                        aria-label="Seeking Professional Financial Advice" 
                        subtitle="Recognize when it's beneficial to seek guidance from financial advisors or planners, especially for complex financial situations or long-term planning goals."
                        title="Seeking Professional Financial Advice"
                    >
                        {'defaultContent'}
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}
