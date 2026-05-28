export const ROUTES = {
  HOME: '/',
  ORDER_NOW: '/ordernow',
};

export const createPageUrl = (pageName) => {
  const pageMap = {
    Home: ROUTES.HOME,
    OrderNow: ROUTES.ORDER_NOW,
    About: '/about',
    Booking: '/booking',
    Delivery: '/delivery',
    Catering: '/catering',
    Order: '/order',
  };

  return pageMap[pageName] || ROUTES.HOME;
};
