const getToday = () => {
   return new Date().toLocaleDateString();
};

const getYesterday = () => {
   const yesterday = new Date();
   yesterday.setDate(yesterday.getDate() - 1);
   return yesterday.toLocaleDateString();
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getToday, getYesterday };
