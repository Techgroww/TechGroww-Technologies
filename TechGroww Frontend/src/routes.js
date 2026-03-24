import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { HomePage } from './Pages/HomePage';
import { ServicesPage } from './Pages/ServicesPage';
import ServiceDetailPage from './Components/ServiceDetailPage';
import { AboutPage } from './pages/AboutPage'; // ✅ Check case sensitivity
import { TechnologiesPage } from './Pages/TechnologiesPage';
import { CareersPage } from './Pages/CarrersPage';
import PortfolioPage from './Pages/PortfolioPage';
import { BlogPage } from './pages/BlogPage'; // ✅ Check case sensitivity
import { BlogDetailPage } from './Pages/BlogDetail';
import { ContactPage } from './pages/ContactPage'; // ✅ Check case sensitivity
import PortfolioDetails from './Pages/PortfolioDetails';
import { JobDetailPage } from './Pages/CareerDetail';
import { NotFoundPage } from './pages/NotFoundPage'; // ✅ Check case sensitivity

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'services', Component: ServicesPage },
      { path: 'services/:serviceId', Component: ServiceDetailPage },
      { path: 'about', Component: AboutPage },
      { path: 'technologies', Component: TechnologiesPage },
      { path: 'careers', Component: CareersPage },
      { path: 'careers/:slug', Component: JobDetailPage },
      { path: 'portfolio', Component: PortfolioPage },
      { path: 'portfolio/:slug', Component: PortfolioDetails },
      { path: 'blog', Component: BlogPage },
      { path: 'blog/:slug', Component: BlogDetailPage },
      { path: 'contact', Component: ContactPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);