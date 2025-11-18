import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 rounded-lg bg-secondary text-white hover:bg-secondary-hover transition-colors"
      aria-label="Toggle language"
    >
      {i18n.language === 'ko' ? 'EN' : 'KO'}
    </button>
  );
};

export default LanguageSwitcher;
