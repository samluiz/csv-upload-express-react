import { useEffect, useState } from "react";
import { User } from "../@types/user";
import api from "../api/api";

const List = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<any>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('name');
  const [search, setSearch] = useState('');

  async function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilter(e.target.value);
  }

  async function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  async function getUsers() {
    try {
      const response = await api.get('/users', {
        params: {
          page: currentPage,
          limit: 4,
          name: filter === 'name' ? search : undefined,
          city: filter === 'city' ? search : undefined,
          country: filter === 'country' ? search : undefined,
          favorite_sport: filter === 'favorite_sport' ? search : undefined,
        }
      });
      setTotalPages(response.data.total_pages);
      setCurrentPage(response.data.current.page);
      setUsers(response.data.results);
    } catch (error: any) {
      setError(error.response.data.error);
    }
  }

  useEffect(() => {
    getUsers();
  }, [currentPage, search]);

  return (
    <>
    <section className="w-full p-2">
      <div className="flex justify-center items-center gap-2">
        <div className="flex justify-center items-center gap-2">
            <select id="filter" className="px-2 py-1 bg-transparent text-black rounded-md shadow border border-gray-300 hover:bg-gray-100" onChange={onSelectChange} >
              <option value="name">Name</option>
              <option value="city">City</option>
              <option value="country">Country</option>
              <option value="favorite_sport">Favorite Sport</option>
            </select>
          </div>
          <div className="flex justify-center items-center gap-2">
            <label htmlFor="search">Search</label>
            <input onChange={onInputChange} id="search" type="text" className="px-2 w-42 py-1 bg-transparent text-black rounded-md shadow border border-gray-300 hover:bg-gray-100" />
          </div>
      </div>
      <div className="grid place-items-center h-full">
        <ul className="flex flex-wrap flex-row justify-start flex-1 items-center">
        {users.map((user) => (
          <li key={user.id} className="w-full p-4 border rounded-lg shadow-md mx-4 my-2 text-sm">
            <div className="grid grid-flow-row gap-2 place-items-start">
              <div className="grid gap-2 grid-flow-col">
                <label className="text-gray-600">Name:</label>
                <span className="text-gray-900">{user.name}</span>
              </div>

              <div className="grid gap-2 grid-flow-col">
                <label className="text-gray-600">City:</label>
                <span className="text-gray-900">{user.city}</span>
              </div>

              <div className="grid gap-2 grid-flow-col">
                <label className="text-gray-600">Country:</label>
                <span className="text-gray-900">{user.country}</span>
              </div>

              <div className="grid gap-2 grid-flow-col">
                <label className="text-gray-600">Favorite Sport:</label>
                <span className="text-gray-900">{user.favorite_sport}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {error && <p className="text-red-500">Error while retrieving the users: {error}</p>}
      </div>
    </section>
    </>
  );
}
 
export default List;