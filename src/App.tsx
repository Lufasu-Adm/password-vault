import { useState, useEffect } from 'react'

interface PasswordEntry {
  id: number;
  website: string;
  username: string;
  password: string;
  isVisible: boolean;
}

function App() {
  // --- STATE UTAMA ---
  const [passwords, setPasswords] = useState<PasswordEntry[]>(() => {
    const savedData = localStorage.getItem("password-vault-data")
    return savedData ? JSON.parse(savedData) : []
  })

  // State Form
  const [website, setWebsite] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  // State Pencarian [FITUR BARU]
  const [searchTerm, setSearchTerm] = useState('')

  // Simpan ke LocalStorage tiap ada perubahan
  useEffect(() => {
    localStorage.setItem("password-vault-data", JSON.stringify(passwords))
  }, [passwords])

  // --- LOGIC ---

  // 1. Fitur Generate Password Acak
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let result = ""
    for (let i = 0; i < 12; i++) { // Panjang password 12 karakter
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
  }

  // 2. Fitur Copy to Clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Password berhasil disalin! 📋")
  }

  const handleSimpan = (e: React.FormEvent) => {
    e.preventDefault()
    if (!website || !username || !password) {
      alert("Mohon isi semua data!")
      return
    }
    const newEntry: PasswordEntry = {
      id: Date.now(),
      website, username, password, isVisible: false
    }
    setPasswords([newEntry, ...passwords]) // Data baru taruh paling atas
    setWebsite('')
    setUsername('')
    setPassword('')
  }

  const handleDelete = (id: number) => {
    if (window.confirm("Yakin hapus data ini?")) {
      setPasswords(passwords.filter(item => item.id !== id))
    }
  }

  const toggleVisibility = (id: number) => {
    setPasswords(passwords.map(item => item.id === id ? { ...item, isVisible: !item.isVisible } : item))
  }

  // 3. Logic Filter Pencarian
  // Kita tidak menampilkan 'passwords' langsung, tapi 'filteredPasswords'
  const filteredPasswords = passwords.filter(item => 
    item.website.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 font-sans pb-20">
      
      {/* HEADER */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          🔐 Password Vault Pro
        </h1>
        <p className="text-slate-400 text-sm mt-2">Create. Save. Secure.</p>
      </div>

      {/* FORM CONTAINER */}
      <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-6 mb-8 relative overflow-hidden">
        {/* Hiasan background */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

        <form onSubmit={handleSimpan} className="space-y-4 relative z-10">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Website</label>
            <input 
              type="text" 
              placeholder="ex: Google" 
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 mt-1 focus:border-blue-500 outline-none transition"
              value={website} onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Username</label>
              <input 
                type="text" 
                placeholder="User" 
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 mt-1 focus:border-blue-500 outline-none transition"
                value={username} onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Pass" 
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 mt-1 focus:border-blue-500 outline-none transition font-mono text-blue-300"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                {/* Tombol Generate Password */}
                <button 
                  type="button"
                  onClick={generatePassword}
                  className="mt-1 bg-purple-600 hover:bg-purple-500 text-white px-3 py-2 rounded-lg text-lg transition"
                  title="Generate Random Password"
                >
                  🎲
                </button>
              </div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-500/20 transition transform active:scale-95">
            + Simpan Password Baru
          </button>
        </form>
      </div>

      {/* SEARCH BAR & LIST */}
      <div className="max-w-md w-full space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="🔍 Cari password..." 
            className="w-full bg-slate-800 border border-slate-700 rounded-full px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-end px-2">
          <h2 className="text-xl font-bold text-slate-300">Daftar Akun</h2>
          <span className="text-xs text-slate-500">{filteredPasswords.length} ditemukan</span>
        </div>

        {/* List Passwords */}
        <div className="space-y-3">
          {filteredPasswords.length === 0 ? (
            <div className="text-center p-8 text-slate-600">
              <p>Tidak ada data ditemukan.</p>
            </div>
          ) : (
            filteredPasswords.map((item) => (
              <div key={item.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-blue-500/50 transition group relative overflow-hidden">
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-white">{item.website}</h3>
                    <p className="text-slate-400 text-sm mb-2">@{item.username}</p>
                    
                    <div className="flex items-center gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
                      <p className={`font-mono text-sm ${item.isVisible ? "text-blue-300" : "text-slate-600"}`}>
                        {item.isVisible ? item.password : "••••••••••••••••"}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => toggleVisibility(item.id)}
                      className="text-slate-400 hover:text-white p-2 hover:bg-slate-700 rounded-lg transition"
                      title={item.isVisible ? "Sembunyikan" : "Lihat"}
                    >
                      {item.isVisible ? "👁️" : "🙈"}
                    </button>
                    
                    {/* Tombol Copy */}
                    <button 
                      onClick={() => copyToClipboard(item.password)}
                      className="text-slate-400 hover:text-green-400 p-2 hover:bg-slate-700 rounded-lg transition"
                      title="Copy Password"
                    >
                      📋
                    </button>

                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-slate-400 hover:text-red-400 p-2 hover:bg-slate-700 rounded-lg transition"
                      title="Hapus"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App