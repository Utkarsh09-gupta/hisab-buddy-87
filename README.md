# Hisab: Your Money. Simplified.

Build a modern, premium, mobile-first personal finance web app called "Hisab".

TAGLINE:

"Paise kahan gaye, kisne diye aur kis se lene hain — sab ek jagah."

IMPORTANT:

This is primarily a FRONTEND project. Build a polished, production-quality UI with realistic mock data and working frontend interactions. Do not build the backend/database/authentication yet. Structure the code cleanly so a backend can be connected later.

==================================================

1. PRODUCT CONCEPT

==================================================

Hisab is a personal money management app designed especially for students and young people.

It solves two problems in one app:

A) PERSONAL MONEY MANAGEMENT

- Track how much money comes from home or other sources each month.

- Track personal expenses such as rent, food, travel, recharge, shopping, etc.

- Automatically show how much money remains.

B) FRIEND EXPENSE TRACKING

- Track expenses shared with friends.

- Record who paid.

- Split expenses equally or manually.

- Automatically calculate who owes the user money and whom the user owes money.

- Keep a complete transaction history.

- Allow settlements when a friend pays the user back.

The core philosophy:

"Minimum input, maximum automatic calculation."

The user should be able to record an expense in 5-10 seconds.

==================================================

2. DESIGN DIRECTION

==================================================

Create a premium fintech-style interface.

The UI should feel:

- Modern

- Clean

- Minimal

- Trustworthy

- Professional

- Fast

- Mobile-first

- Easy to understand

Do NOT make it look like a generic admin dashboard.

Use:

- Spacious cards

- Rounded corners

- Subtle shadows

- Clean typography

- Clear hierarchy

- Elegant icons

- Smooth micro-interactions

- Professional empty states

- Excellent responsive behavior

Use a neutral/light background with a refined green/emerald accent for positive financial values.

Use red/orange carefully for money the user owes.

Use green for money the user should receive.

Use neutral colors for settled balances.

Typography should be modern and highly readable.

==================================================

3. APP STRUCTURE

==================================================

Create these main sections:

1. Dashboard

2. My Money

3. Friends

4. History

5. Settings/Profile

On mobile use a bottom navigation bar:

Home

Friends

History

+ Add

On desktop use a clean sidebar navigation.

The "+ Add" button should be visually prominent.

==================================================

4. DASHBOARD

==================================================

Create a beautiful dashboard.

Header:

"Good morning, Utkarsh 👋"

Below it:

"August 2026"

Show a monthly money overview card.

CARD 1 — MY MONEY

Title:

"My Money"

Show:

Money Received

₹15,000

Personal Spending

₹8,800

Remaining

₹6,200

Use a progress indicator showing spending vs received.

Add button:

"+ Add Money"

Secondary button:

"+ Add Expense"

--------------------------------------------------

CARD 2 — FRIEND BALANCE

Title:

"Friends"

Show:

You should receive

₹1,240

You should pay

₹430

Net Balance

+₹810

Below show a compact friend list:

Rahul          +₹320

Ankit          -₹200

Aman             ₹0

Yash           +₹450

Shivam         -₹100

Green = friend owes user.

Red/orange = user owes friend.

Gray = settled.

Button:

"View all friends"

--------------------------------------------------

CARD 3 — RECENT ACTIVITY

Show recent transactions:

🍕 Pizza with Rahul

You paid ₹500

Rahul owes ₹250

Today, 9:42 PM

🏠 August Rent

Personal expense

₹5,000

Today, 8:15 PM

☕ Chai with Ankit

Ankit paid ₹100

You owe ₹50

Yesterday, 6:30 PM

💰 Money from Home

Received

+₹15,000

15 Aug, 10:00 AM

Each transaction should be clickable.

==================================================

5. QUICK ADD EXPERIENCE

==================================================

This is one of the MOST IMPORTANT parts of the app.

Create a floating "+ Add" button.

When clicked, show an attractive action sheet/modal with:

+ Add Friend Expense

+ Add Personal Expense

+ Add Money Received

+ Settle Up

The user should be able to quickly choose the required action.

The UI must be optimized for mobile.

==================================================

6. ADD FRIEND EXPENSE

==================================================

Create a polished modal/page called:

"Add Expense"

Fields:

Who was this with?

[ Select Friend ]

Amount

[ ₹ 500 ]

Description

[ Pizza ]

Category

[ Food ]

Who paid?

( ) I paid

( ) Friend paid

Split:

( ) Equal

( ) Custom

Participants:

☑ You

☑ Rahul

If Equal is selected:

Total:

₹500

Your share:

₹250

Rahul's share:

₹250

Show a live calculation.

If Custom is selected, allow entering each person's share manually.

Date & Time:

Automatically use current date/time in the frontend mock implementation.

Note:

Optional.

Primary button:

"Save Expense"

After saving, show a success toast:

"Expense added successfully"

==================================================

7. ADD PERSONAL EXPENSE

==================================================

Create:

"Add Personal Expense"

Fields:

Amount

Category

Description

Date & Time

Note

Categories:

🏠 Rent

🍱 Food

🚕 Travel

📱 Recharge

🛍 Shopping

🎬 Entertainment

📚 Education

💊 Health

📦 Other

Example:

Amount:

₹5,000

Category:

Rent

Description:

August Room Rent

Button:

"Save Expense"

==================================================

8. ADD MONEY RECEIVED

==================================================

Create:

"Add Money"

Fields:

Amount

Source

Note

Date & Time

Source options:

Home

Scholarship

Salary

Freelance

Other

Example:

₹15,000

Source: Home

Note: August monthly money

Button:

"Save Money"

==================================================

9. MY MONEY PAGE

==================================================

Create a complete monthly personal finance page.

Header:

"My Money"

Month selector:

< July 2026 >

< August 2026 >

Main summary:

Received

₹15,000

Spent

₹8,800

Remaining

₹6,200

Then create:

"Spending Breakdown"

Show category cards:

🏠 Rent

₹5,000

🍱 Food

₹2,000

🚕 Travel

₹1,000

📱 Recharge

₹300

Other

₹500

Add a clean visual chart for spending by category.

Also show:

"Money Timeline"

Example:

15 Aug

+₹15,000

Money from Home

15 Aug

-₹5,000

August Rent

14 Aug

-₹500

Dinner

12 Aug

-₹300

Recharge

Allow filtering by:

All

Income

Expenses

==================================================

10. FRIENDS PAGE

==================================================

Title:

"Friends"

Top summary:

You should receive:

₹1,240

You should pay:

₹430

Net:

+₹810

Add friend button:

"+ Add Friend"

Friend cards:

Rahul

You should receive ₹320

Ankit

You owe ₹200

Aman

Settled

Yash

You should receive ₹450

Each card should be clickable.

Add search:

"Search friends..."

==================================================

11. ADD FRIEND

==================================================

Create:

"Add Friend"

Fields:

Name

Phone number (optional)

Example:

Rahul

98XXXXXXXX

Button:

"Add Friend"

After adding, show the friend in the friends list.

==================================================

12. FRIEND DETAIL PAGE

==================================================

When clicking Rahul:

Header:

Rahul

Current Balance:

+₹400

Label:

"Rahul owes you"

Buttons:

"Add Expense"

"Settle Up"

Then show transaction history.

Example:

15 Aug

🍕 Pizza

You paid ₹500

Rahul's share ₹250

+₹250

13 Aug

☕ Chai

Rahul paid ₹100

Your share ₹50

-₹50

10 Aug

🍔 Burger

You paid ₹400

Rahul's share ₹200

+₹200

At the bottom:

Net Balance

₹400

"Rahul owes you ₹400"

==================================================

13. SETTLEMENT

==================================================

Create "Settle Up" interface.

Example:

Rahul owes you:

₹400

Amount received:

[ ₹400 ]

Button:

"Mark as Paid"

After settlement:

Balance becomes:

₹0

Show a success state:

"Balance settled"

Add settlement to history.

==================================================

14. HISTORY PAGE

==================================================

Create a complete transaction history.

Header:

"History"

Search bar:

"Search transactions..."

Filters:

All

Personal

Friends

Money Received

Settlements

Date filter:

Today

This Week

This Month

Custom

Transaction list:

🍕 Pizza with Rahul

₹250 receivable

15 Aug

🏠 Rent

₹5,000

15 Aug

💰 Money from Home

+₹15,000

15 Aug

☕ Chai with Ankit

₹50 payable

14 Aug

Use appropriate visual indicators for income, personal expense, receivable and payable.

==================================================

15. TRANSACTION DETAIL

==================================================

When clicking a transaction, open a detail modal/page.

Show:

Pizza with Rahul

₹500

Paid by:

Utkarsh

Participants:

Utkarsh — ₹250

Rahul — ₹250

Category:

Food

Date:

15 August 2026

Time:

9:42 PM

Note:

Pizza after college

Rahul owes you:

₹250

Buttons:

Edit

Delete

==================================================

16. MONTHLY HISTORY

==================================================

Allow the user to switch between months.

Example:

July 2026

Received ₹15,000

Spent ₹12,400

Remaining ₹2,600

August 2026

Received ₹15,000

Spent ₹8,800

Remaining ₹6,200

Use a clean month selector.

==================================================

17. ANALYTICS

==================================================

Create a simple analytics section inside My Money.

Show:

Monthly Spending

July:

₹12,400

August:

₹8,800

Category breakdown.

Use clean charts.

Do not overload the dashboard with charts.

Charts should be simple and readable.

==================================================

18. EMPTY STATES

==================================================

Create professional empty states.

No friends:

"You haven't added any friends yet."

Button:

"+ Add Friend"

No transactions:

"No transactions yet."

Button:

"+ Add Transaction"

No expenses:

"Your spending history will appear here."

==================================================

19. RESPONSIVE DESIGN

==================================================

This is extremely important.

The app must be mobile-first.

Mobile:

- Bottom navigation

- Full-screen modals where appropriate

- Large touch-friendly buttons

- Compact cards

- Easy one-handed use

- Minimal typing

Tablet:

- Two-column layouts where appropriate

Desktop:

- Sidebar

- Spacious dashboard

- Multi-column cards

- Centered content with max width

Do not simply stretch the mobile UI onto desktop.

==================================================

20. MOCK DATA

==================================================

Use realistic mock data for the initial frontend.

User:

Utkarsh

Friends:

Rahul

Ankit

Aman

Yash

Shivam

Abhishek

August 2026:

Money received:

₹15,000 from Home

Personal expenses:

Rent ₹5,000

Food ₹2,000

Travel ₹1,000

Recharge ₹300

Other ₹500

Friend transactions:

Rahul:

Net +₹320

Ankit:

Net -₹200

Aman:

₹0

Yash:

Net +₹450

Shivam:

Net -₹100

Abhishek:

Net +₹120

Make the dashboard look populated and realistic.

==================================================

21. FRONTEND INTERACTIONS

==================================================

Even without a backend, make the frontend feel functional.

Implement:

- Add friend

- Add expense

- Add personal expense

- Add money

- Settle up

- Delete transaction

- Edit transaction where practical

- Search

- Filtering

- Month switching

- Modal opening/closing

- Toast notifications

- Dynamic balance updates using frontend state

- Dynamic remaining monthly balance

- Dynamic category totals

Use local state/localStorage if appropriate so changes persist during the session.

Keep the data layer clean and easy to replace with a real API later.

==================================================

22. CALCULATION LOGIC

==================================================

Implement correct frontend calculations.

For personal money:

Remaining =

Total Money Received - Total Personal Expenses

For friend expenses:

If user paid ₹500 and their share is ₹250:

Friend balance:

+₹250

If friend paid ₹100 and user's share is ₹50:

Friend balance:

-₹50

Net friend balance should be:

All money friend owes user

MINUS

All money user owes friend

Display:

Positive = friend owes user

Negative = user owes friend

Zero = settled

Do NOT mix personal expenses with friend receivables/payables.

==================================================

23. IMPORTANT UX RULE

==================================================

The user should never have to manually calculate balances.

Example:

User enters:

Bill = ₹600

People = You + Rahul + Aman

You paid

The UI should automatically calculate:

You = ₹200

Rahul = ₹200

Aman = ₹200

Rahul owes ₹200

Aman owes ₹200

Make these calculations visible immediately while entering the expense.

==================================================

24. SETTINGS

==================================================

Create a simple Settings page.

Sections:

Profile

Name

Email

Preferences

Currency: INR (₹)

Theme: Light / Dark

Notifications

Payment reminders

Monthly summary

Account

Logout

==================================================

25. VISUAL QUALITY

==================================================

The final result should look like a real startup product, not a college project.

Pay special attention to:

- Consistent spacing

- Consistent border radius

- Typography hierarchy

- Financial number formatting

- Icon consistency

- Button states

- Hover states

- Loading states

- Empty states

- Error states

- Success states

- Mobile responsiveness

Use subtle animations, but do not over-animate.

Avoid excessive gradients.

Avoid unnecessary glassmorphism.

Avoid huge hero sections.

This is a productivity/finance application, so prioritize clarity and usability.

==================================================

26. TECHNICAL REQUIREMENTS

==================================================

Use:

React

TypeScript

Tailwind CSS

React Router

Use reusable components.

Suggested component structure:

Dashboard

MyMoney

Friends

FriendDetail

History

AddExpenseModal

AddPersonalExpenseModal

AddMoneyModal

AddFriendModal

SettlementModal

TransactionDetail

MonthlySummary

BalanceCard

FriendCard

TransactionCard

CategoryCard

BottomNavigation

Sidebar

Header

Keep components modular.

Use a clean folder structure.

Do not hard-code every screen separately.

Create reusable financial components.

==================================================

27. IMPORTANT BACKEND PREPARATION

==================================================

Although this is frontend-only, structure the application so that later we can connect:

Authentication

Database

REST API

Cloud storage

Potential future backend:

Node.js + Express

MongoDB

Do not implement the backend now.

==================================================

28. FINAL EXPERIENCE

==================================================

When the app opens, the user should immediately understand:

1. How much money they received this month.

2. How much they personally spent.

3. How much remains.

4. How much friends owe them.

5. How much they owe friends.

6. What their latest transactions were.

The primary CTA should always be easy to find:

"+ Add"

The entire app should feel extremely simple even though it handles complex calculations.

Build this as a polished, professional fintech product called:

"HISAB"

Logo concept:

A minimal rupee symbol combined with a clean wallet/ledger concept.

Tagline:

"Paise kahan gaye, kisne diye aur kis se lene hain — sab ek jagah."

Start by building the complete responsive frontend with all the screens and interactions described above.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://hisab-buddy-87.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e34b4fe8-8f9c-4899-9926-5144171c6cd4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
