import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Campaigns, Deposit, DonateNow, FundraiseDetails, GetStarted, Home, NotFound, Profile, ReviewUs } from "./Pages";
import { Layout, ProtectedRoute, ScrollToTop, ScrollToTopButton } from "./components";
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>      
      <ScrollToTopButton />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/" element={<Layout home={true}><Home /></Layout>} />
          <Route path="/campaigns" element={<Layout campaigns={true}><Campaigns /></Layout>} />
          <Route path="/campaigns/fundraise/:slug" element={<Layout><FundraiseDetails /></Layout>} />
          <Route path="/campaigns/fundraise/:slug/donate-now" element={<Layout><ProtectedRoute component={DonateNow} /></Layout>} />
          <Route path="/user/:username/" element={<Layout><ProtectedRoute component={Profile} /></Layout>} />
          <Route path="/user/:username/deposit" element={<Layout><ProtectedRoute component={Deposit} /></Layout>} />
          <Route path="/review-us" element={<Layout><ProtectedRoute component={ReviewUs} /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="bottom-center" reverseOrder={false} />
      </Router>
    </AuthProvider>
  )
}

export default App