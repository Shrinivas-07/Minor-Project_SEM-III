import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../config";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyEntries, setHistoryEntries] = useState([]);
  const [form, setForm] = useState({ name: "", bio: "", location: "", phone: "" });

  const token = localStorage.getItem("token");
  const authHeader = token ? { Authorization: token } : {};

  useEffect(() => {
    const storedHistory = localStorage.getItem('sahichayan_history');
    if (storedHistory) {
      try {
        setHistoryEntries(JSON.parse(storedHistory));
      } catch {
        setHistoryEntries([]);
      }
    }

    if (!token) return setLoading(false);
    axios
      .get(apiUrl("/api/auth/me"), { headers: authHeader })
      .then((res) => {
        setProfile(res.data);
        setForm({
          name: res.data.name || "",
          bio: res.data.bio || "",
          location: res.data.location || "",
          phone: res.data.phone || "",
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const loadHistory = () => {
    const storedHistory = localStorage.getItem('sahichayan_history');
    if (storedHistory) {
      try {
        setHistoryEntries(JSON.parse(storedHistory));
      } catch {
        setHistoryEntries([]);
      }
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('sahichayan_history');
    setHistoryEntries([]);
  };

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(apiUrl("/api/auth/me"), form, { headers: authHeader });
      setProfile(res.data);
      alert("Profile updated");
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  };

  const uploadAvatar = async (e) => {
    e.preventDefault();
    if (!file) return alert("Choose a file");
    const fd = new FormData();
    fd.append("avatar", file);
    try {
      const res = await axios.post(apiUrl("/api/auth/me/avatar"), fd, {
        headers: { ...authHeader, "Content-Type": "multipart/form-data" },
      });
      setProfile(res.data);
      alert("Avatar updated");
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!token) return <div className="p-8">Not logged in.</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <div className="mb-6">
        <img
          src={profile?.avatarUrl || "https://www.gravatar.com/avatar/?d=mp&s=200"}
          alt="avatar"
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-slate-400">Update your info, avatar, and view your recent course history.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowHistory((prev) => {
              if (!prev) loadHistory();
              return !prev;
            });
          }}
          className="rounded-full bg-white/10 px-5 py-3 text-sm text-white hover:bg-white/15 transition-all duration-300"
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
      </div>

      <form onSubmit={saveProfile} className="space-y-4 max-w-md">
        <input name="name" value={form.name} onChange={handleChange} className="w-full p-3 rounded" placeholder="Name" />
        <input name="location" value={form.location} onChange={handleChange} className="w-full p-3 rounded" placeholder="Location" />
        <input name="phone" value={form.phone} onChange={handleChange} className="w-full p-3 rounded" placeholder="Phone" />
        <textarea name="bio" value={form.bio} onChange={handleChange} className="w-full p-3 rounded" placeholder="Short bio" />
        <button className="px-4 py-2 bg-cyan-500 rounded">Save profile</button>
      </form>

      <hr className="my-6" />

      <form onSubmit={uploadAvatar} className="space-y-4">
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0])} />
        <button className="px-4 py-2 bg-purple-500 rounded">Upload avatar</button>
      </form>

      {showHistory && (
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">Course History</h2>
              <p className="text-slate-400 text-sm">Your recently visited courses and resources.</p>
            </div>
            <button
              type="button"
              onClick={clearHistory}
              className="rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15 transition-all duration-300"
            >
              Clear history
            </button>
          </div>

          {historyEntries.length === 0 ? (
            <p className="text-slate-400">No history yet. Open learning resources to build your history.</p>
          ) : (
            <div className="space-y-4">
              {historyEntries.map((entry, index) => (
                <div key={`${entry.careerName}-${index}`} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                  <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
                    <div>
                      <p className="font-semibold text-white">{entry.careerName}</p>
                      <p className="text-sm text-slate-400">{entry.resourceType}</p>
                    </div>
                    <p className="text-xs text-slate-500">{new Date(entry.visitedAt).toLocaleString()}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.open(entry.url, '_blank')}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-500/25 transition-all duration-300"
                  >
                    Reopen Resource
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
