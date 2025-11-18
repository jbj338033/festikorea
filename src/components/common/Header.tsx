import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import Modal from './Modal';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleLogout = async () => {
    if (confirm(t('auth.logoutSuccess'))) {
      await logout();
    }
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-primary">
              {t('common.appName')}
            </Link>
            <nav className="flex items-center gap-4 sm:gap-6">
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
                {t('common.home')}
              </Link>
              <Link to="/favorites" className="text-gray-700 hover:text-primary transition-colors">
                {t('common.favorites')}
              </Link>
              <Link to="/my-reviews" className="text-gray-700 hover:text-primary transition-colors">
                {t('common.myReviews')}
              </Link>
              <LanguageSwitcher />
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {t('common.logout')}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
                >
                  {t('common.login')}
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <Modal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title={authMode === 'login' ? t('auth.loginTitle') : t('auth.signupTitle')}
      >
        {authMode === 'login' ? (
          <LoginForm
            onSuccess={() => setShowAuthModal(false)}
            onSwitchToSignup={() => setAuthMode('signup')}
          />
        ) : (
          <SignupForm
            onSuccess={() => setShowAuthModal(false)}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )}
      </Modal>
    </>
  );
}
