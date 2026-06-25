import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Globe2,
  MonitorSmartphone,
  Sparkles,
  Target,
} from "lucide-react";
import "./style.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [services, setServices] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [showAdmin, setShowAdmin] = useState(
    localStorage.getItem("token") ? true : false
  );

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.log(err));

    fetch("http://localhost:5000/api/contact")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    alert("Message saved successfully!");

    const res = await fetch("http://localhost:5000/api/contact");
    const data = await res.json();
    setContacts(data);

    setContact({
      name: "",
      email: "",
      message: "",
    });
  };

  const openAdminDashboard = () => {
    setShowAdmin(true);

    setTimeout(() => {
      document
        .getElementById("admin-dashboard")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const deleteContact = async (id) => {
  await fetch(`http://localhost:5000/api/contact/${id}`, {
    method: "DELETE",
  });

  setContacts(contacts.filter((item) => item._id !== id));
  alert("✅ Contact deleted successfully");
};

const exportToExcel = () => {
  const excelData = contacts.map((item) => ({
    Name: item.name,
    Email: item.email,
    Message: item.message,
    Submitted: new Date(item.createdAt).toLocaleString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
  XLSX.writeFile(workbook, "Outpro_Contacts.xlsx");
};

  const todayContacts = contacts.filter((item) => {
    const today = new Date().toDateString();
    const contactDate = new Date(item.createdAt).toDateString();
    return today === contactDate;
  });

  const filteredContacts = contacts.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <header className="header">
        <nav className="nav container">
          <h2 className="logo">
            Outpro<span>.India</span>
          </h2>

          <div className="links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <section id="home" className="hero container">
        <div>
          <p className="tag">
            <Sparkles size={18} /> Corporate Website Platform
          </p>

          <h1>Build a premium digital identity for your business.</h1>

          <p className="heroText">
            A modern, responsive and high-performance corporate profile website
            for showcasing services and portfolio.
          </p>

          <a className="btn" href="#contact">
            Get Started <ArrowRight size={18} />
          </a>
        </div>

        <div className="heroCard">
          <Globe2 size={70} />
          <h2>Outpro Digital Presence</h2>
          <p>Fast, scalable and secure business solutions.</p>
        </div>
      </section>

      <section id="about" className="section container">
        <div>
          <p className="tag">About Us</p>

          <h2>We create premium corporate websites.</h2>

          <p>
            Our mission is to help companies build strong online presence with
            modern technology.
          </p>
        </div>

        <div className="box">
          <p>✅ Mission: Build trust online</p>
          <p>✅ Vision: Scalable digital growth</p>
          <p>✅ Values: Quality, Speed and Innovation</p>
        </div>
      </section>

      <section id="services" className="section container">
        <p className="tag">Services</p>

        <h2>Our Core Services</h2>

        <div className="grid">
          {services.map((item) => (
            <div className="card" key={item.id}>
              <MonitorSmartphone />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="portfolio" className="section container">
        <p className="tag">Portfolio</p>

        <h2>Case Studies</h2>

        <div className="grid">
          <div className="card">
            <Target />
            <h3>Retail Growth Platform</h3>
            <p>E-commerce website with analytics dashboard.</p>
          </div>

          <div className="card">
            <BarChart3 />
            <h3>Business Dashboard</h3>
            <p>Professional admin analytics system.</p>
          </div>

          <div className="card">
            <Globe2 />
            <h3>Corporate Website</h3>
            <p>Responsive company portfolio website.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="section container">
        <p className="tag">Contact</p>

        <h2>Let's Build Together</h2>

        <form className="contact" onSubmit={handleContactSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            required
          />

          <textarea
            rows="5"
            placeholder="Message"
            value={contact.message}
            onChange={(e) =>
              setContact({ ...contact, message: e.target.value })
            }
            required
          ></textarea>

          <button className="btn">Send Message</button>
        </form>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            className="btn"
            onClick={() => {
              if (localStorage.getItem("token")) {
                openAdminDashboard();
              } else {
                window.location.href = "/login";
              }
            }}
          >
            📊 Open Admin Dashboard
          </button>
        </div>
      </section>

      {showAdmin && (
        <section id="admin-dashboard" className="section container">
          <h2
            style={{
              textAlign: "center",
              marginBottom: "40px",
              fontSize: "40px",
              color: "#ffffff",
            }}
          >
            📊 Admin Dashboard
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                color: "#fff",
                padding: "30px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
              }}
            >
              <h1 style={{ fontSize: "48px", margin: 0 }}>
                {contacts.length}
              </h1>
              <p style={{ fontSize: "18px", marginTop: "10px" }}>
                👥 Total Contacts
              </p>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg,#16a34a,#22c55e)",
                color: "#fff",
                padding: "30px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
              }}
            >
              <h1 style={{ fontSize: "48px", margin: 0 }}>
                {todayContacts.length}
              </h1>
              <p style={{ fontSize: "18px", marginTop: "10px" }}>
                📬 Today's Messages
              </p>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg,#f97316,#facc15)",
                color: "#111827",
                padding: "30px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
              }}
            >
              <h1 style={{ fontSize: "48px", margin: 0 }}>
                {services.length}
              </h1>
              <p style={{ fontSize: "18px", marginTop: "10px" }}>
                🛠️ Total Services
              </p>
            </div>
          </div>

    <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  }}
>
  <button
    className="btn"
    onClick={exportToExcel}
    style={{ background: "#16a34a" }}
  >
    📊 Export Excel
  </button>

  <button
    className="btn"
    onClick={() => {
      localStorage.removeItem("token");
      setShowAdmin(false);
      window.location.href = "/login";
    }}
  >
    🚪 Logout
  </button>
</div>

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "25px",
              borderRadius: "12px",
              border: "1px solid #374151",
              background: "#111827",
              color: "white",
            }}
          />

          {filteredContacts.map((item) => (
            <div
              key={item._id}
              style={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "18px",
                padding: "25px",
                marginBottom: "25px",
                boxShadow: "0 8px 20px rgba(0,0,0,.35)",
              }}
            >
              <h3 style={{ color: "#22c55e", marginBottom: "15px" }}>
                👤 {item.name}
              </h3>

              <p style={{ color: "#fff" }}>
                <strong>📧 Email :</strong> {item.email}
              </p>

              <p style={{ color: "#fff" }}>
                <strong>💬 Message :</strong> {item.message}
              </p>

              <p style={{ color: "#cbd5e1" }}>
                <strong>🕒 Submitted:</strong>{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>

              <button
                className="btn"
                style={{
                  marginTop: "15px",
                  background: "#ef4444",
                }}
                onClick={() => deleteContact(item._id)}
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </section>
      )}
    </>
  );
}

export default App;