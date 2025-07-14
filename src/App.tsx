
import { useEffect } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"

import { useToast } from "@/hooks/use-toast"
import Layout from "@/components/Layout"
import Home from "@/pages/Home"
import Recommendations from "@/pages/Recommendations"
import SkinType from "@/pages/SkinType"
import ProInfo from "@/pages/ProInfo"
import Auth from "@/pages/Auth"
import Profile from "@/pages/Profile"
import Settings from "@/pages/Settings"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const { toast } = useToast()

  // Prevent the toast from disappearing too quickly during development.
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      toast({
        title: "Welcome back!",
        description: "This toast will stick around.",
        duration: 5000,
      })
    }
  }, [toast])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="recommendations" element={<Recommendations />} />
            <Route path="skin-type" element={<SkinType />} />
            <Route path="pro-info" element={<ProInfo />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="auth" element={<Auth />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
