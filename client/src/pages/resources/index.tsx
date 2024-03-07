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
                        <div>
                            <strong>Understanding Asset Classes:</strong><br/>
                            There are several asset classes to choose from when investing, including stocks, bonds, real estate, commodities, and cash. Each asset class has its own set of risks and potential returns, so it's important to understand the basics before investing.<br/>
                            <br/><strong>Assessing Risk Tolerance:</strong><br/>
                            Before investing, it's important to assess your risk tolerance. This will help you determine how much risk you're willing to take on and which asset classes are suitable for your investment goals.<br/>
                            <br/><strong>Building a Diversified Portfolio:</strong><br/>
                            To minimize risk, it's important to build a diversified investment portfolio that includes a mix of asset classes. This can be achieved by investing in a mix of low-risk and higher-risk assets, as well as a mix of domestic and international investments.<br/>
                            <br/><i>By following these basics, beginners can get started with investing confidently and build a strong foundation for their financial future.</i>
                        </div>
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
                        <div>
                            <strong>Setting Up Automated Transfers:</strong><br/>
                            Setting up automated transfers to your savings account is a simple and effective way to grow your savings without having to think about it. <br/>Here's how to do it:<br/>
                            1. Determine the Amount: Decide on a fixed amount that you want to transfer to your savings account regularly. It could be a percentage of your income or a fixed amount per month.<br/>
                            2. Choose the Frequency: Choose the frequency of the transfers, such as monthly, bi-monthly, or weekly. The more frequent the transfers, the less likely you are to spend the money unnecessarily.<br/>
                            3. Set Up the Transfer: Set up the automated transfer through your online banking platform or mobile app. Most banks offer this service for free.<br/>
                            4. Monitor Your Account: Monitor your savings account regularly to ensure the transfers are happening correctly and that you're not dipping into your savings unnecessary.<br/>
                            <br/><i>By setting up automated transfers, you'll be able to grow your savings effortlessly and avoid the temptation to spend unnecessarily. This is a great way to save for long-term goals, such as retirement, a down payment on a house, or a big purchase.</i>
                        </div>
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
                        <div>
                            <strong>Comparison Shopping:</strong><br/>
                            Comparison shopping is a great way to save money on purchases.<br/> Here are some tips for effective comparison shopping:<br/>
                            1. Research: Research the item you want to purchase and compare prices at different stores, both online and in-store.<br/>
                            2. Use Price Comparison Websites: Use price comparison websites like PriceGrabber, Nextag, or PriceRunner to compare prices quickly and easily.<br/>
                            3. Check Clearance Sections: Check clearance sections at stores for discounted items. You can also find clearance items online.<br/>
                            4. Look for Deals and Coupons: Look for deals and coupons online, in newspapers, and on store flyers. Sign up for newsletters and follow your favorite brands on social media to stay informed about promotions.<br/>
                            <br/><strong>Using Coupons and Discounts:</strong><br/>
                            Coupons and discounts can help you save money on purchases. Here are some tips for using them effectively:<br/>
                            1. Clip Coupons: Clip coupons from newspapers, magazines, and online sources. Look for digital coupons on store websites or apps.<br/>
                            2. Sign Up for Loyalty Programs: Sign up for loyalty programs at your favorite stores. They often offer exclusive discounts and promotions.<br/>
                            3. Use Cashback Apps: Use cashback apps like Ibotta, Rakuten (formerly known as Ebates), or Fetch Rewards to earn cash back on your purchases.<br/>
                            4. Take Advantage of Sales: Take advantage of sales and promotions at stores. Plan your shopping trips during these times to save money.<br/>
                            <br/><strong>Distinguishing Between Wants and Needs:</strong><br/>
                            To avoid overspending, it's important to distinguish between wants and needs. Ask yourself these questions when making a purchase:<br/>
                            1. Do I really need this item?<br/>
                            2. Is this item essential for my well-being or daily routine?<br/>
                            3. Can I live without this item?<br/>
                            <br/>By following these techniques, you can make savvy purchasing decisions and save money on your grocery bill. Remember, comparison shopping, using coupons and discounts, and distinguishing between wants and needs can help you make the most of your hard-earned money.
                        </div>
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
                        <div>
                            <strong>Understanding Credit Scores:</strong><br/>
                            Credit scores play a crucial role in financial decision-making, affecting everything from loan and credit approvals to interest rates and employment eligibility. Understanding how credit scores are calculated and what factors influence them is essential for maintaining a healthy credit score.<br/>
                            <br/><strong>How Credit Scores are Calculated:</strong><br/>
                            Credit scores are calculated based on information in your credit report, which tracks your history of borrowing and repaying money. The three major credit bureaus, Equifax, Experian, and TransUnion, use complex algorithms to calculate credit scores, taking into account various factors such as:<br/>
                            1. Payment history (35%): Your history of making on-time payments.<br/>
                            2. Credit utilization (30%): The percentage of available credit you're using.<br/>
                            3. Length of credit history (15%): How long you've had credit.<br/>
                            4. Credit mix (10%): The variety of credit types you have (e.g., credit cards, loans, mortgages).<br/>
                            5. New credit (10%): The number of recent credit inquiries and new accounts.<br/>
                            <br/><strong>Importance of Credit Scores:</strong><br/>
                            Credit scores play a vital role in many financial decisions, including:<br/>
                            1. Loan and credit approvals: A good credit score increases your chances of getting approved for loans and credit cards, and can also help you qualify for better interest rates.<br/>
                            2. Interest rates: A higher credit score can lead to lower interest rates, saving you money over the life of a loan or credit card.<br/>
                            3. Employment eligibility: Some employers check credit scores as part of the hiring process, particularly for positions involving financial responsibility or sensitive information.<br/>
                            4. Insurance premiums: In some cases, insurance companies use credit scores to determine premiums, as a lower credit score can indicate a higher risk of filing claims.<br/>
                            <br/><strong>Strategies for Improving or Maintaining a Healthy Credit Score:</strong><br/>
                            Follow these strategies to improve or maintain a healthy credit score:<br/>
                            1. Pay bills on time: Late payments can significantly lower your credit score, so set up payment reminders or automate your payments to ensure timely payments.<br/>
                            2. Keep credit utilization low: Aim to use less than 30% of your available credit to show lenders you can manage your debt responsibly.<br/>
                            3. Monitor your credit report: Check your credit report regularly to ensure accuracy and detect any signs of fraud or identity theft.<br/>
                            4. Avoid unnecessary inquiries: Applying for too many credit cards or loans in a short period can negatively impact your credit score, so avoid unnecessary inquiries.<br/>
                            5. Build a credit history: If you're new to credit, consider starting with a secured credit card or becoming an authorized user on a family member's credit card to establish a credit history.<br/>
                            <br/><i>By understanding credit scores and following these strategies, you can maintain a healthy credit score and increase your financial opportunities.</i>
                        </div>
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
                        <div>
                            <strong>Why Start Early:</strong><br/>
                            Starting early allows you to take advantage of compound interest, which can help your savings grow significantly over time. Additionally, planning for retirement early helps you make the most of your working years and ensures that you're prepared for the future.<br/>
                            <br/><strong>Employer-Sponsored Plans:</strong><br/>
                            Take advantage of employer-sponsored retirement plans like 401(k)s or 403(b)s. These plans offer several benefits, including:<br/>
                            1. Convenience: Contributions are automatically deducted from your paycheck, making it easy to save.<br/>
                            2. Matching Funds: Many employers match a portion of your contributions, essentially giving you free money.<br/>
                            3. Lower Fees: Employer-sponsored plans often have lower fees compared to individual retirement accounts.<br/>
                            <br/><strong>IRAs:</strong><br/>
                            Individual Retirement Accounts (IRAs) are a great option for those who don't have access to employer-sponsored plans or want to supplement their retirement savings. There are two main types of IRAs:<br/>
                            1. Traditional IRA: Contributions are tax-deductible, and withdrawals<br/>
                            2. Roth IRA: Contributions are made with after-tax dollars, so withdrawals are tax-free.<br/>
                            <br/><strong>Other Investment Vehicles:</strong><br/>
                            In addition to employer-sponsored plans and IRAs, consider other investment vehicles for your retirement portfolio, such as:<br/>
                            1. Stocks: Stocks offer potential for long-term growth, but come with risk.<br/>
                            2. Bonds: Bonds provide steady income and relatively low risk, but returns may be lower than those from stocks.<br/>
                            3. Mutual Funds: Mutual funds offer a diversified portfolio of stocks, bonds, or other securities, which can help spread risk and potentially increase returns.<br/>
                            4. Exchange-Traded Funds (ETFs): ETFs are similar to mutual funds but trade like stocks, offering flexibility and diversification.<br/>
                            5. Real Estate: Real estate can provide a steady income stream and potential long-term appreciation in value.<br/>
                            <br/><strong>Retirement Savings Tips:</strong><br/>
                            1. Start early to take advantage of compound interest.<br/>
                            2. Contribute as much as possible, especially to employer-sponsored plans with matching funds.<br/>
                            3. Diversify your portfolio to minimize risk and potentially increase returns.<br/>
                            4. Consider working with a financial advisor to create a personalized retirement plan.<br/>
                            5. Keep fees low by choosing cost-effective investment options.<br/>
                            6. Monitor and adjust your portfolio regularly to ensure it remains aligned with your retirement goals.<br/>
                            <br/><i>By exploring these retirement savings options and following the tips above, you can create a well-rounded portfolio and set yourself up for a successful retirement.</i>
                        </div>
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
                        <div>
                            <strong>Why Review Subscriptions and Recurring Expenses?</strong><br/>
                            Reviewing subscriptions and recurring expenses helps you identify services you may not use or need, allowing you to redirect funds towards other financial goals, such as saving for retirement, paying off debt, or building an emergency fund. This process can also help you avoid wasting money on unnecessary expenses.<br/>
                            <br/><strong>What to Review:</strong><br/>
                            1. Streaming services: If you have multiple streaming services, consider consolidating them or cutting back on the number of services you subscribe to.<br/>
                            2. Gym memberships: Evaluate your gym membership and consider alternative, cost-effective options like home workouts or outdoor activities.<br/>
                            3. Insurance premiums: Review your insurance premiums, such as health, auto, and homeowners insurance, to ensure you're not overpaying.<br/>
                            4. Subscription boxes: Assess your subscription box usage, such as monthly delivery services for food, clothing, or beauty products. Cancel any that you don't use regularly.<br/>
                            5. Software and digital tools: Review your software and digital tool subscriptions, such as cloud storage, productivity apps, or entertainment services.<br/>
                            6. Credit card annual fees: Evaluate credit cards with annual fees and consider alternatives with lower or no fees, especially if you don't use the card frequently.<br/>
                            7. Utilities: Review your utility bills, such as electricity, gas, and water, to ensure you're not paying for services you don't use.<br/>
                            8. Internet and phone plans: Assess your internet and phone plans to ensure you're not overpaying for services you don't use.<br/>
                            9. Magazine and newspaper subscriptions: Review your magazine and newspaper subscriptions and consider canceling any that you don't read regularly.<br/>
                            10. Memberships and associations: Evaluate memberships and associations you may have, such as professional organizations or clubs, and consider canceling any that you don't use or find value in.<br/>
                            <br/><strong>How to Review Subscriptions and Recurring Expenses:</strong><br/>
                            1. Check your bank statements and credit card bills: Look for recurring charges or subscriptions that you may have forgotten about or don't use.<br/>
                            2. Review your expenses monthly: Set a reminder to review your expenses monthly to ensure you're staying on track and not overspending.<br/>
                            3. Consider alternative options: Before canceling a subscription or service, research alternative options that may better suit your needs and budget.<br/>
                            <br/><i>By regularly reviewing your subscriptions and recurring expenses, you can free up funds for more important financial goals and avoid wasting money on unnecessary expenses.</i>
                        </div>
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
                        <div>
                            <strong>What are SMART Goals:</strong><br/>
                            1. Specific: Clearly define your financial goal, avoiding ambiguity.<br/>
                            Example: "I want to save $10,000 in the next year for a down payment on a house."<br/>
                            2. Measurable: Quantify your goal, making it easy to track progress.<br/>
                            Example: "I want to reduce my credit card debt by $5,000 in the next 6 months."<br/>
                            3. Achievable: Set a goal that's challenging but attainable based on your financial situation.<br/>
                            Example: "I want to save $500 per month for retirement starting from next month."<br/>
                            4. Relevant: Align your goal with your values, priorities, and long-term vision.<br/>
                            Example: "I want to pay off my student loans within the next 3 years to free up more money for retirement savings."<br/>
                            5. Time-bound: Set a specific deadline for achieving your goal.<br/>
                            Example: "I want to increase my emergency fund to cover 3-6 months of living expenses within the next 12 months."<br/>
                            <br/><strong>Benefits of SMART Financial Goals:</strong><br/>
                            1. Clarity: SMART goals provide clear direction, helping you stay focused on what you want to achieve.<br/>
                            2. Measurable progress: Tracking your progress toward SMART goals helps you stay motivated and see the impact of your efforts.<br/>
                            3. Realistic expectations: SMART goals are achievable, given your financial situation, helping you avoid unrealistic expectations and frustration.<br/>
                            4. Prioritization: SMART goals help you prioritize your financial objectives, ensuring you allocate resources effectively.<br/>
                            5. Accountability: Writing down SMART goals makes you accountable for your financial success, encouraging you to take ownership of your decisions.<br/>
                            <br/><i>By setting SMART financial goals, you'll have a clear roadmap for achieving your financial objectives, helping you stay on track and reach your desired financial outcomes.</i>
                        </div>
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
                        <div>
                            <strong>Why Negotiate Rates and Fees?</strong><br/>
                            Negotiating better rates and fees can save you money, reducing the cost of borrowing or using financial products and services. It can also help you avoid unnecessary expenses, freeing up funds for more important financial goals.<br/>
                            <br/><strong>Strategies for Negotiating Better Rates and Fees:</strong><br/>
                            1. Research and compare offers: Understand the market rates and fees for the financial product or service you need. Compare offers from different providers to know what you can negotiate for.<br/>
                            2. Check your credit score: A good credit score can give you bargaining power to negotiate better rates and fees. If you have an excellent credit score, use it to your advantage.<br/>
                            3. Be willing to walk away: If a provider isn't willing to negotiate, be prepared to walk away. This shows that you're not desperate and may cause the provider to reconsider their position.<br/>
                            4. Ask for promotional offers: Sometimes, providers offer promotional rates or discounts. Ask if they have any current promotions or if they can offer you a special deal.<br/>
                            5. Use a broker or agent: Consider working with a broker or agent who can negotiate on your behalf. They may have access to better deals or discounts due to their relationships with providers.<br/>
                            6. Show your loyalty: If you've been a loyal customer for a long time, highlight that when negotiating. Providers may be willing to offer better rates or fees to retain your business.<br/>
                            7. Be respectful and persistent: Negotiating can be a long process. Be respectful and persistent in your negotiations, and don't get discouraged if you don't get what you want immediately.<br/>
                            8. Consider alternative providers: If one provider isn't willing to negotiate, look for another that may offer better rates or fees. This can help you find a better deal and save you money in the long run.<br/>
                            <br/><i>By researching and comparing offers, leveraging your credit score, and being willing to walk away, you can negotiate better rates and fees on loans, credit cards, insurance premiums, and other financial products and services.</i>
                        </div>
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
                        <div>
                            <strong>Why Stay Informed?</strong><br/>
                            Staying informed about financial news and trends helps you make better decisions regarding your personal finances. It enables you to:<br/>
                            1. Adjust your investment strategy: Staying up-to-date with market trends and economic conditions can help you adjust your investment strategy to maximize returns and minimize risk.<br/>
                            2. Make informed savings decisions: Knowing about changes in interest rates, inflation, and economic conditions can help you decide how much to save, where to save it, and when to make adjustments.<br/>
                            3. Adjust your budget: Staying informed about economic changes and market trends can help you anticipate and adapt to changes that may impact your budget.<br/>
                            <br/><strong>How to Stay Informed:</strong><br/>
                            1. Read financial news articles and blogs: Websites like The Wall Street Journal, Financial Times, The Economist, and Forbes provide in-depth financial news and analysis.<br/>
                            2. Listen to financial podcasts: Podcasts like Planet Money, The Dave Ramsey Show, and The Motley Fool's Money Podcast offer engaging discussions and insights on personal finance and investing.<br/>
                            3. Follow financial experts on social media: Follow experts like Dave Ramsey, Suze Orman, and Warren Buffett on Twitter or LinkedIn to get their insights and opinions on financial matters.<br/>
                            4. Subscribe to financial newsletters: Newsletters like The Motley Fool's Daily Update, Seeking Alpha's Daily Newsletter, and Kiplinger's Personal Finance Newsletter provide daily or weekly summaries of market news and trends.<br/>
                            5. Attend financial seminars or workshops: Attend seminars or workshops in your community or online to learn about personal finance and investing from experts.<br/>
                            6. Join a financial community: Participate in online forums or social media groups focused on personal finance to learn from others, share your experiences, and stay motivated.<br/>
                            <br/><i>By staying informed about financial news and trends, you'll be better equipped to make intelligent decisions about your investments, savings, and budget, ultimately achieving your financial goals.</i>
                        </div>
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
                        <div>
                            <strong>When to Seek Professional Advice:</strong><br/>
                            1. Long-term planning: If you're unsure how to achieve long-term financial goals, such as saving for retirement or your children's education, seek professional guidance.<br/>
                            2. Complex financial situations: If you have multiple sources of income, investments, or debts, consider seeking advice to optimize your financial strategy and minimize tax liabilities.<br/>
                            3. Major life changes: Significant life changes, such as marriage, divorce, inheritance, or a career change, may require financial guidance to ensure you're making the best decisions for your future.<br/>
                            4. Investment planning: If you're unsure how to invest your money, seek advice from a financial advisor to create a diversified investment portfolio aligned with your risk tolerance and goals.<br/>
                            5. Retirement planning: A financial advisor can help you create a sustainable retirement income plan, ensuring your savings last throughout your retirement years.<br/>
                            6. Estate planning: If you have significant assets or a blended family, consider seeking professional advice to create a comprehensive estate plan, including wills, trusts, and beneficiary designations.<br/>
                            7. Tax planning: A financial advisor can help you optimize your tax strategy, minimizing your tax liabilities and ensuring you're taking advantage of available tax credits and deductions.<br/>
                            8. Insurance planning: If you're unsure about the type or amount of insurance coverage you need, seek advice from a financial advisor to create a personalized insurance plan.<br/>
                            9. College planning: A financial advisor can help you navigate the complexities of college savings plans and financial aid, ensuring you're prepared for your children's education expenses.<br/>
                            <br/>However, it's essential to choose the right financial advisor, as not all advisors are equally useful. Look for an advisor who is a good communicator, has experience working with clients with similar financial goals and situations, and is willing to work collaboratively with you.<br/>
                            <br/><strong>Finding the Right Financial Advisor:</strong><br/>
                            1. Ask for referrals: Ask friends, family, or colleagues for recommendations. They may have had positive experiences with financial advisors in the past.<br/>
                            2. Check credentials: Look for advisors with professional certifications like CFP (Certified Financial Planner), CFA (Chartered Financial Analyst), or CPA (Certified Public Accountant).<br/>
                            3. Check experience: Ensure the advisor has experience working with clients with similar financial goals and situations as yours.<br/>
                            4. Check their approach: Look for an advisor who takes a comprehensive approach to financial planning, considering all aspects of your financial life, including investments, taxes, retirement, and estate planning.<br/>
                            5. Check fees: Be aware of how the advisor is compensated. Look for an advisor who is transparent about their fees and has a fee structure that aligns with your needs.<br/>
                            6. Check for conflicts of interest: Ensure the advisor doesn't have any conflicts of interest that could impact their ability to provide unbiased advice.<br/>
                            7. Interview potential advisors: Meet with at least a few advisors before making a decision. Ask questions about their experience, approach, and fees.<br/>
                            8. Consider a fiduciary advisor: A fiduciary advisor is legally obligated to act in your best interests. Look for an advisor who is a registered<br/>
                        </div>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}
