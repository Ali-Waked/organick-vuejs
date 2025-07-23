const useFormats = () => {
  const currencyFormat = (amount, type = "fixed", locale = "en-US", currency = "USD") => {
    if (type === "percentage") {
      return `${amount}%`;
    }
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const dateFormat = (date, locale = "en-US", options = {}) => {
    if (!date) return "";
    const defaultOptions = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      ...options,
    };
    return new Intl.DateTimeFormat(locale, defaultOptions).format(new Date(date));
  };
  const dateFormatForNews = (date, locale = "en-US", options = {}) => {
    if (!date) return "";
    const defaultOptions = {
      // year: "numeric",
      day: "2-digit",
      month: "short",
      ...options,
    };
    return new Intl.DateTimeFormat(locale, defaultOptions).format(new Date(date));
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    // return string.charAt(0).toUpperCase() + string.slice(1);
    return string
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const getSingularName = (word) => {
    if (word.endsWith('ies')) {
      return word.slice(0, -3) + 'y'; // e.g. "categories" → "category"
    } else if (word.endsWith('ses') || word.endsWith('xes') || word.endsWith('zes') || word.endsWith('ches') || word.endsWith('shes')) {
      return word.slice(0, -2); // e.g. "boxes" → "box"
    } else if (word.endsWith('s') && !word.endsWith('ss')) {
      return word.slice(0, -1); // e.g. "cars" → "car"
    }
    return word; // fallback if it's already singular
  }


  return { currencyFormat, dateFormat, capitalizeFirstLetter, getSingularName, dateFormatForNews };
}

export default useFormats;