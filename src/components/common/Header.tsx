import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import Modal from './Modal';
import Toast from './Toast';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import LanguageSwitcher from './LanguageSwitcher';
import { useToast } from '../../hooks/useToast';

export default function Header() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { toast, showToast, hideToast } = useToast();

  const handleLogout = async () => {
    await logout();
    showToast(t('auth.logoutSuccess'), 'success');
  };

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-primary">
              {t('common.appName')}
            </Link>
            <nav className="flex items-center gap-6">
              <Link to="/" className="text-sm text-gray-600 hover:text-primary transition-colors">
                {t('common.home')}
              </Link>
              <Link to="/favorites" className="text-sm text-gray-600 hover:text-primary transition-colors">
                {t('common.favorites')}
              </Link>
              <Link to="/my-reviews" className="text-sm text-gray-600 hover:text-primary transition-colors">
                {t('common.myReviews')}
              </Link>
              <LanguageSwitcher />
              {user ? (
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                      {user.email?.[0].toUpperCase()}
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {t('common.logout')}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="text-sm text-primary hover:text-primary-hover transition-colors"
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
            onSuccess={() => {
              setShowAuthModal(false);
              showToast(t('auth.loginSuccess'), 'success');
            }}
            onSwitchToSignup={() => setAuthMode('signup')}
          />
        ) : (
          <SignupForm
            onSuccess={() => {
              setShowAuthModal(false);
              showToast(t('auth.signupSuccess'), 'success');
            }}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )}
      </Modal>

      {toast.isVisible && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </>
  );
}
