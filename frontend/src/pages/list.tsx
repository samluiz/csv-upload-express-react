import { useEffect, useState } from "react";
import { User } from "../@types/user";
import api from "../api/api";

const List = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<any>(null);

  async function getUsers() {
    try {
      const response = await api.get('/users');
      setUsers(response.data.results);
    } catch (error: any) {
      setError(error.response.data.error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
    <div className="w-[80%] h-[70%]">
      <ul className="flex flex-wrap flex-row justify-center flex-1 items-start">
      {users.map((user) => (
        <li key={user.id} className="p-4 border rounded-lg shadow-md mx-4 my-2 text-sm">
          <div className="grid grid-flow-row gap-2 place-items-center">
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
    </>
  );
}
 
export default List;