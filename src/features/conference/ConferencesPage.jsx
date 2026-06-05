import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getConferences } from "./conferenceService";   // ⭐ NEW
import confImage from '../../assets/it_conference.jpg';  // ⭐ NEW
import magnifyingGlass from '../../assets/magnifier.png'; // ⭐ NEW
import filterIcon from '../../assets/filter.png'; // ⭐ NEW
import calendarIcon from '../../assets/calendar.png'; // ⭐ NEW
import locationIcon from '../../assets/location-pin.png'; // ⭐ NEW

function formatTime(time) {
  return new Date(`1970-01-01T${time}:00`).toLocaleTimeString("en-NZ", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

const ConferencesPage = () => {
  const navigate = useNavigate();

  const [conferences, setConferences] = useState([]);   // ⭐ NEW
  const [loading, setLoading] = useState(true);         // ⭐ NEW

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('quick');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [selectedConference, setSelectedConference] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [isHovered, setIsHovered] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [selectedTags, setSelectedTags] = useState([]);
  const [tagsDropdownOpen, setTagsDropdownOpen] = useState(false); 

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // TEMPORARY TAGS (replace with real tags later)
  const tags = ["AI", "Cloud", "Security", "Education", "Business", "Research"];


  const openModal = (conf) => {
    setSelectedConference(conf);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedConference(null);
    setShowModal(false);
  };


  // ⭐ Load conferences from Firebase
  useEffect(() => {
    async function load() {
      const data = await getConferences();
      setConferences(data);
      setLoading(false);
    }
    load();
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLocation, showOnlyOpen, activeTab]);

  const handleViewDetail = (id) => {
    navigate(`/conference-detail/${id}`);
  };

  // ⭐ Replace MOCK_CONFERENCES with real data
  const filteredConferences = conferences.filter(conf => {
    const title = (conf.title || "").toLowerCase();
    const location = (conf.location || "").toLowerCase();
    const search = searchTerm.toLowerCase();

        // DATE FILTERS
    const matchesStartDate =
      startDate ? new Date(conf.startDate) >= new Date(startDate) : true;

    const matchesEndDate =
      endDate ? new Date(conf.startDate) <= new Date(endDate) : true;

    // TAG FILTER
    const matchesTags =
      selectedTags.length > 0
        ? selectedTags.every(tag => conf.tags?.includes(tag))
        : true;

    // STATUS FILTER
    const matchesStatusDropdown =
      selectedStatus === "all" ? true : conf.status === selectedStatus;


    // ⭐ Only show confirmed conferences
    const isConfirmed = conf.reviewStatus === "confirmed";

    const matchesSearch =
      activeTab === 'quick'
        ? title.includes(search) || location.includes(search)
        : true;

    const matchesLocation =
      activeTab === 'advanced' && selectedLocation !== 'All Locations'
        ? conf.location === selectedLocation
        : true;

    const matchesStatus =
      activeTab === 'advanced' && showOnlyOpen
        ? conf.status === 'Open'
        : true;

    return (
      isConfirmed &&
      matchesSearch &&
      matchesLocation &&
      matchesStatus &&
      matchesStartDate &&
      matchesEndDate &&
      matchesTags &&
      matchesStatusDropdown
    );
  });



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentConferences = filteredConferences.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredConferences.length / itemsPerPage);

  // ⭐ Build locations list from real data
  const locations = ['All Locations', ...new Set(conferences.map(c => c.location))];

  if (loading) {
    return <p style={{ padding: 20 }}>Loading conferences…</p>;
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.mainContainer}>

        {/* MODERN SEARCH + FILTERS */}
        <section style={styles.filterContainer}>

          {/* SEARCH BAR */}
          <div style={styles.searchBar}>
            <span style={styles.searchIcon}>
              <img src={magnifyingGlass} alt="Search" style={{ width: "20px", height: "20px" }} />
            </span>
            <input
              type="text"
              placeholder="Search conferences"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          <button 
            style={styles.searchButton}
            onClick={(e) => setSearchTerm(e.target.value)}
          >
            Search
          </button>
          </div>
          <button 
            style={styles.filterButton}
            onClick={() => setActiveTab(activeTab === "filters" ? "none" : "filters")}
          >
            <img src={filterIcon} alt="Filters" style={{ width: "20px", height: "20px" }} />
          </button>
          {/* FILTER PANEL */}
          {activeTab === "filters" && (
            <div style={styles.filterPanel}>

              <div style={styles.filterGroup}>
                <div style={styles.filterItem}>
                  <label style={styles.filterLabel}>Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    style={styles.filterSelect}
                  >
                    {locations.map(loc => (
                      <option key={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                {/* START DATE */}
                <div style={styles.filterGroup}>
                  <div style={styles.filterItem}>
                    <label style={styles.filterLabel}>Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={styles.filterSelect}
                    />
                  </div>

                </div>

                {/* END DATE */}
                <div style={styles.filterGroup}>
                  <div style={styles.filterItem}>
                  <label style={styles.filterLabel}>End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={styles.filterSelect}
                  />
                  </div>

                </div>

                {/* TAGS */}
                <div style={styles.filterGroup}>
                  <div style={styles.filterItem}>
                    <label style={styles.filterLabel}>Tags</label>
                    <div 
                      style={styles.dropdownBox}
                      onClick={() => setTagsDropdownOpen(!tagsDropdownOpen)}
                    >
                      {selectedTags.length === 0 
                        ? "Select tags…" 
                        : selectedTags.join(", ")
                      }
                    </div>

                    {tagsDropdownOpen && (
                      <div style={styles.dropdownMenu}>
                        {tags.map(tag => (
                          <label key={tag} style={styles.dropdownItem}>
                            <input
                              type="checkbox"
                              checked={selectedTags.includes(tag)}
                              onChange={() => {
                                if (selectedTags.includes(tag)) {
                                  setSelectedTags(selectedTags.filter(t => t !== tag));
                                } else {
                                  setSelectedTags([...selectedTags, tag]);
                                }
                              }}
                            />
                            <span>{tag}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  
                </div>

                {/* STATUS */}
                <div style={styles.filterGroup}>
                  <div style={styles.filterItem}>
                    <label style={styles.filterLabel}>Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      style={styles.filterSelect}
                    >
                      <option value="all">All</option>
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                {/* SORT BY */}
                <div style={styles.filterGroup}>
                  <div style={styles.filterItem}>
                    <label style={styles.filterLabel}>Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      style={styles.filterSelect}
                    >
                      <option value="date">Start Date</option>
                      <option value="location">Location</option>
                      <option value="title">Title</option>
                    </select>
                  </div>
                </div>

              </div>
              <button>
                Apply Filters
              </button>
            </div>
          )}

        </section>

        <h1 style={styles.mainTitle}>Upcoming Conferences</h1>

        {/* CONTENT AREA */}
        <main style={styles.contentArea}>

          {/* AIRBNB‑STYLE GRID */}
          <div style={styles.cardGrid}>
            {currentConferences.map(conf => (
              <div
                key={conf.id}
                style={{
                  ...styles.card,
                  ...(hoveredCard === conf.id ? styles.cardHover : {})
                }}
                onMouseEnter={() => setHoveredCard(conf.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleViewDetail(conf.id)}
              >
                <div style={styles.cardImageWrapper}>
                  <img 
                    src={confImage}
                    alt={conf.title}
                    style={styles.cardImage}
                  />
                </div>

                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{conf.title}</h3>

                  <p style={styles.cardMeta}>
                    <img src={locationIcon} alt="Location" style={{ width: "16px", height: "16px", marginRight: "8px" }} />
                    {conf.location}<br/>
                    <img src={calendarIcon} alt="Date" style={{ width: "16px", height: "16px", marginRight: "8px", marginTop: "5px" }} />
                    {new Date(conf.startDate).toLocaleDateString("en-NZ")}<br/>
                  </p>
                </div>
              </div>

            ))}
          </div>

          {/* NO RESULTS */}
          {filteredConferences.length === 0 && (
            <p style={styles.noResults}>No conferences found.</p>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div style={styles.paginationContainer}>
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                style={currentPage === 1 ? styles.pageBtnDisabled : styles.pageBtn}
              >
                Previous
              </button>
              
              <span style={styles.pageInfo}>
                Page <strong>{currentPage}</strong> of {totalPages}
              </span>

              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                style={currentPage === totalPages ? styles.pageBtnDisabled : styles.pageBtn}
              >
                Next
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  )};


const styles = {
  pageWrapper: { 
    display: 'flex', 
    flexDirection: 'column', 
    minHeight: '100vh', 
    fontFamily: 'system-ui, sans-serif', 
    paddingLeft: '1rem', 
    paddingRight: '1rem',
    maxWidth: '1200px', 
    margin: '0 auto', 
    width: '100%', 
    boxSizing: 'border-box' 
  },

  mainTitle: { 
    textAlign: 'left', 
    margin: '0rem 0 0rem 0',
    fontSize: '2.2rem', 
    fontWeight: '700', 
    color: '#2D3748', 
  },

  mainContainer: { 
    display: 'flex', 
    flexDirection: 'column', 
    padding: '20px 0',
    gap: '2rem' 
  },

  /* SEARCH COMPONENT */
  searchComponent: { 
    backgroundColor: '#133860', 
    borderRadius: '15px', 
    overflow: 'hidden', 
    width: '100%' 
  },

  tabHeader: { 
    display: 'flex', 
    width: '100%', 
    borderBottom: '1px solid #a0aec0'
  },

  tabActive: { 
    flex: 1, 
    padding: '1.5rem 1rem', 
    backgroundColor: 'transparent', 
    border: 'none', 
    borderBottom: '4px solid #58a5cc', 
    cursor: 'pointer', 
    fontWeight: '700', 
    fontSize: '1rem', 
    color: '#FFFFFF' 
  },

  tabInactive: { 
    flex: 1, 
    padding: '1.5rem 1rem', 
    backgroundColor: 'transparent', 
    border: 'none', 
    borderBottom: '4px solid transparent', 
    cursor: 'pointer', 
    fontWeight: '600', 
    fontSize: '1rem',
    color: '#ffffffad'
  },

  tabContent: { 
    padding: '1.25rem 1rem', 
    height: '80px' 
  },

  inputContainer: { 
    display: 'flex', 
    justifyContent: 'center' 
  },

  searchInputTabbed: { 
    padding: '0.6rem 0.9rem', 
    borderRadius: '8px', 
    border: '1px solid #a0aec0', 
    width: '100%', 
    maxWidth: '900px', 
    backgroundColor: 'white', 
    fontSize: '1rem' 
  },

  searchButton: {
    marginLeft: '10px',
    padding: '0.5rem 1.5rem',
    backgroundColor: '#3182CE',
    border: 'none',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
  },

  advancedLabel: { 
    fontSize: '0.9rem', 
    fontWeight: '600', 
    color: '#ffffff', 
    textTransform: 'uppercase' 
  },

  advancedSelect: { 
    padding: '1rem', 
    borderRadius: '8px', 
    border: '1px solid #a0aec0', 
    backgroundColor: 'white' 
  },

  advancedCheckboxContainer: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px', 
    cursor: 'pointer', 
    height: '52px', 
    backgroundColor: 'white', 
    padding: '0 1rem', 
    borderRadius: '8px', 
    border: '1px solid #a0aec0' 
  },

  checkbox: { width: '18px', height: '18px' },

  // filterLabelTabbed: { 
  //   fontSize: '0.95rem', 
  //   color: '#2D3748' 
  // },

  /* CONTENT AREA */
  contentArea: {
    backgroundColor: '#f0f0f0',
    borderRadius: '15px',
    width: '100%',
    padding: '20px 0'
  },

  /* AIRBNB GRID — FIXED */
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "25px",
    width: "100%",
    padding: "20px",
    boxSizing: "border-box"
  },

  /* CARD */
  // card: {
  //   backgroundColor: 'white',
  //   padding: '20px',
  //   borderRadius: '12px',
  //   boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   gap: '12px',
  //   cursor: 'pointer',
  //   transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  // },

  cardHover: {
    transform: 'translateY(-6px) scale(1.02)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    display: 'flex',
    flexDirection: 'column'
  },

cardImageWrapper: {
  width: '100%',
  height: '180px',
  overflow: 'hidden'
},

cardImage: {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
},

cardContent: {
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '8px'
},

cardTitle: {
  fontSize: '1.1rem',
  fontWeight: '700',
  margin: 0,
  color: '#2D3748'
},

cardDescription: {
  fontSize: '0.9rem',
  color: '#4A5568',
  margin: 0
},

cardMeta: {
  fontSize: '0.85rem',
  color: '#718096',
  marginTop: '6px',
  lineHeight: '1.4',
  textAlign: 'left'   // also works
},



  details: { 
    margin: 0, 
    color: '#718096', 
    fontSize: '0.9rem', 
    lineHeight: '1.4' 
  },

  statusOpen: { 
    backgroundColor: '#C6F6D5', 
    color: '#22543D', 
    padding: '4px 12px', 
    borderRadius: '20px', 
    fontSize: '0.75rem', 
    fontWeight: 'bold', 
    width: 'fit-content' 
  },

  statusClosed: { 
    backgroundColor: '#FED7D7', 
    color: '#822727', 
    padding: '4px 12px', 
    borderRadius: '20px', 
    fontSize: '0.75rem', 
    fontWeight: 'bold', 
    width: 'fit-content' 
  },

  /* PAGINATION */
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    padding: '30px 20px'
  },

  pageBtn: {
    padding: '8px 16px',
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },

  pageBtnDisabled: {
    padding: '8px 16px',
    backgroundColor: '#cbd5e0',
    color: '#718096',
    border: 'none',
    borderRadius: '6px',
    cursor: 'not-allowed'
  },

  pageInfo: {
    fontSize: '0.9rem',
    color: '#4A5568'
  },

  noResults: { 
    textAlign: 'center', 
    padding: '40px', 
    color: '#718096' 
  },

  /* MODERN FILTER CONTAINER */
filterContainer: {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginBottom: "1rem"
},

/* SEARCH BAR */
searchBar: {
  display: "flex",
  alignItems: "center",
  backgroundColor: "white",
  padding: "0.3rem 1rem",
  border: "1.5px solid #000000",
  borderRadius: "10px",
  // boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  gap: "12px"
},

searchIcon: {
  fontSize: "1.2rem",
  opacity: 0.6
},

searchInput: {
  flex: 1,
  border: "none",
  outline: "none",
  fontSize: "1rem"
},

filterButton: {
  backgroundColor: "#e8e8e8",
  color: "white",
  padding: "0.6rem 1rem",
  borderRadius: "25px",
  border: "none",
  cursor: "pointer",
  fontWeight: "600"
},

/* FILTER PANEL */
filterPanel: {
  backgroundColor: "white",
  // padding: "1.2rem",
  borderRadius: "15px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem"
},

filterGroup: {
  display: "flex",
  flexDirection: "row",
  gap: "8px",
  padding: "0 1rem",
},
filterItem: { 
  display: "flex", 
  flexDirection: "column", 
  gap: "6px", 
  padding: "1rem" 
},

filterLabel: {
  fontSize: "0.9rem",
  fontWeight: "600",
  color: "#2D3748"
},

filterSelect: {
  padding: "0.4rem",
  borderRadius: "0px",
  border: "1px solid #CBD5E0",
  fontSize: "0.7rem",
  backgroundColor: "white"
},

/* MODERN TOGGLE SWITCH */
toggleWrapper: {
  position: "relative",
  width: "50px",
  height: "26px",
  display: "inline-block"
},

toggleCheckbox: {
  opacity: 0,
  width: 0,
  height: 0
},

toggleSlider: {
  position: "absolute",
  cursor: "pointer",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#CBD5E0",
  borderRadius: "34px",
  transition: "0.3s"
},

/* When checked */
toggleCheckboxChecked: {
  backgroundColor: "#3182CE"
},
dropdownBox: {
  padding: "0.8rem",
  borderRadius: "10px",
  border: "1px solid #CBD5E0",
  backgroundColor: "white",
  cursor: "pointer",
  userSelect: "none"
},

dropdownMenu: {
  marginTop: "6px",
  backgroundColor: "white",
  borderRadius: "10px",
  border: "1px solid #CBD5E0",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  maxHeight: "160px",
  overflowY: "auto"
},

dropdownItem: {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
  fontSize: "0.95rem"
}


};


export default ConferencesPage;