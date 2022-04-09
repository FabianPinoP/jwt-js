const consult = (() => {
  const url = "http://localhost:3000/api/total";
  const getData = async () => {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  };
  {
    return { getData };
  }
})();

export default consult;
