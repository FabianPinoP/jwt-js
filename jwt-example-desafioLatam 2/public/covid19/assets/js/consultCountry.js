const country = (() => {
  const getCountry = async (country) => {
    const url = `http://localhost:3000/api/countries/${country}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  };
  {
    return { getCountry };
  }
})();
export default country;
