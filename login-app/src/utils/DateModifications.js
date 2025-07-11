const getYear = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return year;
  };

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  export { getYear, convertDate };