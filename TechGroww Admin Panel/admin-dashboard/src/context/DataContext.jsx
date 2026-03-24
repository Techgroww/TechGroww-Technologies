import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }

  return context;
};

export const DataProvider = ({ children }) => {

  const API_URL = "http://localhost:3000/api";

  const [blogs, setBlogs] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [leads, setLeads] = useState([]);

  const [loading, setLoading] = useState(false);

  const getToken = () => localStorage.getItem("token");

  /* =========================
        AUTO LOAD DATA
  ========================= */

  useEffect(() => {
    fetchBlogs();
    fetchJobs();
    fetchPortfolio();
    fetchLeads();  // ADD THIS LINE
  }, []);



  /* =========================
        BLOG FUNCTIONS
  ========================= */

  const fetchBlogs = async () => {

    try {

      const res = await fetch(`${API_URL}/blogs`);

      const data = await res.json();

      if (res.ok) {
        setBlogs(data.blogs);
      }

    } catch (error) {
      console.error(error);
    }

  };


  const addBlog = async (blog) => {

    try {

      const res = await fetch(`${API_URL}/blogs`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },

        body: JSON.stringify(blog)

      });

      const data = await res.json();

      if (res.ok) {
        setBlogs(prev => [data, ...prev]);
      }

    } catch (error) {
      console.error(error);
    }

  };


  const updateBlog = async (id, blog) => {

    try {

      const res = await fetch(`${API_URL}/blogs/${id}`, {

        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },

        body: JSON.stringify(blog)

      });

      const data = await res.json();

      if (res.ok) {

        setBlogs(prev =>
          prev.map(b => b._id === id ? data : b)
        );

      }

    } catch (error) {
      console.error(error);
    }

  };


  const deleteBlog = async (id) => {

    try {

      await fetch(`${API_URL}/blogs/${id}`, {

        method: "DELETE",

        headers: {
          Authorization: `Bearer ${getToken()}`
        }

      });

      setBlogs(prev => prev.filter(blog => blog._id !== id));

    } catch (error) {
      console.error(error);
    }

  };

  const getBlogById = (id) => {
    return blogs.find(blog => blog._id === id);
  };



  /* =========================
        JOB FUNCTIONS
  ========================= */

  const fetchJobs = async () => {

    try {

      const res = await fetch(`${API_URL}/jobs`);

      const data = await res.json();

      setJobs(data);

    } catch (error) {
      console.error(error);
    }

  };


  const addJob = async (job) => {

    const res = await fetch(`${API_URL}/jobs`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },

      body: JSON.stringify(job)

    });

    const data = await res.json();

    setJobs(prev => [data, ...prev]);

  };


  const updateJob = async (id, job) => {

    const res = await fetch(`${API_URL}/jobs/${id}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },

      body: JSON.stringify(job)

    });

    const data = await res.json();

    setJobs(prev =>
      prev.map(j => j._id === id ? data : j)
    );

  };


  const deleteJob = async (id) => {

    await fetch(`${API_URL}/jobs/${id}`, {

      method: "DELETE",

      headers: {
        Authorization: `Bearer ${getToken()}`
      }

    });

    setJobs(prev => prev.filter(job => job._id !== id));

  };

  const getJobById = (id) => {
    return jobs.find((job) => job._id === id);
  };



  /* =========================
        PORTFOLIO FUNCTIONS
  ========================= */

  /* =========================
      PORTFOLIO FUNCTIONS
========================= */

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/portfolio`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Fetched portfolio data:", data); // Debug log

      // Ensure data is an array
      setPortfolio(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("Portfolio fetch error:", error);
      setPortfolio([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const addPortfolio = async (project) => {
    try {
      console.log("Adding portfolio:", project);

      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found. Please login again.");
      }

      const res = await fetch(`${API_URL}/portfolio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(project)
      });

      // Log the response status
      console.log("Response status:", res.status);

      // Parse the response
      const data = await res.json();
      console.log("Response data:", data);

      // Check if response is ok
      if (!res.ok) {
        throw new Error(data.message || `HTTP error! status: ${res.status}`);
      }

      // Update state with the new portfolio
      setPortfolio(prev => [data.data || data, ...prev]);

      // Return the data for the component to use
      return data.data || data;

    } catch (error) {
      console.error("Add portfolio error:", error);
      throw error;
    }
  };

  const updatePortfolio = async (id, project) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Please login to update portfolio items");
      }

      const res = await fetch(`${API_URL}/portfolio/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(project)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Portfolio updated successfully:", data);

      setPortfolio(prev =>
        prev.map(p => p._id === id ? data : p)
      );

    } catch (error) {
      console.error("Update portfolio error:", error);
      throw error;
    }
  };

  const deletePortfolio = async (id) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Please login to delete portfolio items");
      }

      const res = await fetch(`${API_URL}/portfolio/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }

      setPortfolio(prev => prev.filter(p => p._id !== id));
      console.log("Portfolio deleted successfully");

    } catch (error) {
      console.error("Delete portfolio error:", error);
      throw error; // Re-throw to handle in component
    }
  };

  const getPortfolioById = (id) => {
    return portfolio.find((project) => project._id === id);
  };


  /* =========================
        LEADS
  ========================= */

  const fetchLeads = async () => {

    try {

      const res = await fetch(`${API_URL}/contacts`, {

        headers: {
          Authorization: `Bearer ${getToken()}`
        }

      });

      const data = await res.json();

      setLeads(data);

    } catch (error) {

      console.error(error);

    }

  };



  /* =========================
        AUTO LOAD DATA
  ========================= */

  useEffect(() => {

    fetchBlogs();
    fetchJobs();
    fetchPortfolio();

  }, []);



  return (

    <DataContext.Provider

      value={{

        blogs,
        portfolio,
        jobs,
        leads,

        fetchBlogs,
        addBlog,
        updateBlog,
        deleteBlog,
        getBlogById,

        fetchJobs,
        addJob,
        updateJob,
        deleteJob,
        getJobById,

        fetchPortfolio,
        addPortfolio,
        updatePortfolio,
        deletePortfolio,
        getPortfolioById,

        fetchLeads,

        loading

      }}

    >

      {children}

    </DataContext.Provider>

  );

};