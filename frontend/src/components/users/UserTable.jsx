import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Button from "../ui/Button";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/users?page=${page}&limit=5&search=${search}`
      );
      setUsers(res.data.data);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleExport = async () => {
  try {
    const response = await api.get("/users/export", {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    showToast("Export failed", "error");
  }
};

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-[#15173D]">
          User Listing
        </h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 border rounded-md text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Link to="/dashboard/add">
            <Button>Add User</Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-md shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-[#15173D] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Gender</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-3">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.gender}</td>
                <td className="px-4 py-3">{user.status}</td>
                <td className="px-4 py-3 flex gap-2">
                  <Link to={`/dashboard/view/${user._id}`}>
                    <Button variant="outline">View</Button>
                  </Link>

                  <Link to={`/dashboard/edit/${user._id}`}>
                    <Button variant="outline">Edit</Button>
                  </Link>

                  <Button variant="outline" onClick={handleExport}>
                       Export CSV
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <Button
            variant="outline"
            onClick={() => setPage(page - 1)}
            disabled={!pagination.hasPrevPage}
          >
            Prev
          </Button>

          <span className="text-sm px-2 py-2">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            disabled={!pagination.hasNextPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserTable;