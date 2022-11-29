import { useState, useEffect } from "react";
import FilterCountry from "../FilterCountry/FilterCountry";
import SearchInput from "../Search/SearchInput";
import { apiURL } from "../util/api";
import { Link } from "react-router-dom";

function AllCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getCountries = async () => {
    try {
      const res = await fetch(`${apiURL}/all`);
      if (!res.ok) throw new Error("Something went wrong!");
      const data = await res.json();
      console.log(data);
      setCountries(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);

      if (!res.ok) throw new Error("Not found any country");

      const data = await res.json();
      setCountries(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const getCountryByRegion = async (regionName) => {
    try {
      const res = await fetch(`${apiURL}/region/${regionName}`);

      if (!res.ok) throw new Error("Failed.....");

      const data = await res.json();
      setCountries(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="all__country__wrapper">
      <div className="country__top">
        <div className="search">
          <SearchInput onSearch={getCountryByName} />
        </div>
        <div className="filter">
          <FilterCountry onSelect={getCountryByRegion} />
        </div>
      </div>
      <div className="country__bottom">
        {loading && !error && <h4>Loading .......</h4>}
        {error && !loading && <h4>{error}</h4>}
        {countries.map((country) => (
          <Link to={`/country/${country.name}`}>
            <div className="country__card">
              <div className="country__img">
                <img src={country.flags.png} alt="" />
              </div>
              <div className="country__data">
                <h3>{country.name}</h3>
                <h5>
                  Population:{" "}
                  {new Intl.NumberFormat().format(country.population)}
                </h5>
                <h6>Region: {country.region}</h6>
                <h6>Capital: {country.capital}</h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllCountries;
