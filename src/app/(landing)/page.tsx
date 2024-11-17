import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import HomePage from '@/components/homepage/HomePage';
import { verifySession } from '@/helpers/verifySession';

const LandingPage = async () => {
  const session = await verifySession();

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="relative">
        <HomePage />
        <div className="absolute top-0 left-0 w-full">
          <Header isAuth={session.isAuth} />
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
