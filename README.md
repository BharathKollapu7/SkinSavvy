SkinSavvy – Your Personalized Skincare Guide
Welcome to SkinSavvy, a modern web application that delivers personalized skincare recommendations, product education, and interactive tools to help users achieve their healthiest skin. Powered by React, Supabase, and a custom UI built with Tailwind CSS and Radix UI, SkinSavvy combines a beautiful user experience with robust, scalable technology.

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features
1) Personalized Product Recommendations:
Users receive skincare product suggestions tailored to their skin type and concerns, with direct links to official brand sites for easy purchasing.

2) Skin Quiz:
An interactive 10-question quiz helps users discover their skin type for more accurate recommendations.

3) Profile & Account Management:
Users can sign up, sign in, and manage their profile, including updating skin type and concerns. Routines related to their concerns are displayed on their profile.

4) Smart Chatbot:
An integrated chatbot answers skin-related queries, providing instant, expert-backed guidance.

5) Pro-Info Page:
Educational resources on skincare ingredients, product usage, and SPF information.

6) Favorites & Routines:
Users can save favorite products and view personalized skincare routines based on their profile.

## 🛠️ Tech Stack

| **Category**          | **Technology / Library**                                                |
|-----------------------|-------------------------------------------------------------------------|
| **Frontend**          | React, TypeScript, Vite                                                 |
| **UI Components**     | Radix UI, shadcn/ui, Lucide Icons, Embla Carousel                       |
| **Styling**           | Tailwind CSS, tailwindcss-animate, custom color palette                 |
| **State / Data**      | React Query, React Hook Form, Zod                                       |
| **Authentication**    | Supabase Auth                                                           |
| **Database**          | Supabase (Postgres)                                                     |
| **Routing**           | React Router DOM                                                        |
| **Notifications**     | Radix Toast, Sonner                                                     |
| **Other Utilities**   | clsx, class-variance-authority, date-fns, AOS                           |
| **Testing / Quality** | ESLint, TypeScript ESLint, Prettier                                     |


## 📁 Project Structure

| **Path**               | **Description**                                              |
|------------------------|--------------------------------------------------------------|
| `src/components/`      | Reusable UI components (e.g., `Button`, `Card`, `Toast`, etc.) |
| `src/pages/`           | Main app pages (e.g., `Home`, `Recommendations`, `Profile`)   |
| `src/hooks/`           | Custom React hooks (e.g., `useAuth`, `useRecommendations`)    |
| `src/contexts/`        | Context providers (e.g., `AuthContext`)                       |
| `src/integrations/`    | Supabase client and types                                     |
| `public/`              | Static assets (e.g., `logo`, `background` images)             |
| `src/App.tsx`          | Main app component and routing logic                          |
| `src/main.tsx`         | ReactDOM render and providers setup                           |


## 🚀 Getting Started (Prerequisites)

- Node.js (v18+ recommended)
- npm or yarn

---

## 📦 Installation

### Clone the repository:

```bash
git clone https://github.com/your-username/skinsavvy.git
cd skinsavvy
```

**Install dependencies:**

```bash
npm install
or
yarn install
```

**Configure environment variables:**
Copy .env.example to .env and fill in your Supabase credentials and any other required values.

**Start the development server:**

```bash
npm run dev
or
yarn dev
```
*Visit the app:*
Open http://localhost:8080 in your browser.

## Usage:
*Core User Flows*
1) Sign Up / Sign In:
Create an account or log in to access personalized features.

2) Take the Skin Quiz:
Answer 10 questions to determine your skin type.

3) Get Recommendations:
Browse and filter a curated list of 250+ products, tailored to your profile and concerns.

4) Save Favorites & View Routines:
Mark products as favorites and view routines that match your skin needs.

5) Chatbot:
Ask skin-related questions and receive instant, expert answers.

6) Profile Management:
Update your skin type, concerns, and personal information at any time.

7) Explore Pro-Info:
Learn about skincare ingredients, product usage, and SPF through interactive guides.


## Deployment
*Build for production:*

```bash
npm run build
or
yarn build
```


## 🤝 Contributing

We welcome contributions! To get started:

- Fork the repository.  
- Create a new branch:  
  `git checkout -b feature/your-feature`  
- Commit your changes:  
  `git commit -m 'Add new feature'`  
- Push to your branch:  
  `git push origin feature/your-feature`  
- Open a pull request.

*Please follow the code style and include tests where applicable.*


## License
This project is licensed under the MIT License.
