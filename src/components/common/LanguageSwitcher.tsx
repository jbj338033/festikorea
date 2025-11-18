import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
      className="text-sm text-gray-600 bg-transparent border-none outline-none cursor-pointer hover:text-primary transition-colors"
    >
      <option value="ko">KO</option>
      <option value="en">EN</option>
    </select>
  );
};

export default LanguageSwitcher;
