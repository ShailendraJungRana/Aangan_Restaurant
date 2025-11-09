// Utility functions for the application

/**
 * Creates a URL for a given page name
 * @param {string} pageName - The name of the page
 * @returns {string} - The URL path for the page
 */
export const createPageUrl = (pageName) => {
  const pageMap = {
    Home: '/',
    About: '/about',
    Booking: '/booking',
    Delivery: '/delivery',
    Catering: '/catering',
    Order: '/order',
    OrderNow: '/ordernow'
  };
  
  return pageMap[pageName] || '/';
}; 