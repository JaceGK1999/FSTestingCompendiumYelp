import { useEffect, useState } from 'react';
import { RestaurantListItem } from './components/RestaurantListItem';
import { fetchRestaurantZip } from './services/FetchYelp';

export default function App() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zip, setZip] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRestaurantZip();
      setBusinesses(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    const searchData = await fetchRestaurantZip(zip, search);
    setBusinesses(searchData);
  };
  return (
    <div className="App">
      <h1>Alchemy Restaurant Finder</h1>
      <div className="query-form">
        <div className="form-control">
          <label>Zip:</label>
          <input
            type="text"
            placeholder="zip"
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <label>Query:</label>
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <div className="loader"></div>}
      {!loading &&
        businesses.map((b) => <RestaurantListItem key={b.id} {...b} />)}
    </div>
  );
}
