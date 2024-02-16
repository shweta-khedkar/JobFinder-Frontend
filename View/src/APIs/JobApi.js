import axios from "axios";

const backendUrl = "https://jobfiner-backend.onrender.com/api/v1";

export const getJobsByFilter = async ({ title, skills }) => {
  const params = {
    title,
  };

  if (skills.length) params.skills = skills.toString();

  try {
    const response = await axios.get(`${backendUrl}/jobs`, {
      params: {
        ...params,
      },
    });

    const { jobs } = response.data.data;
    return { data: jobs, error: "" };
  } catch (error) {
    return { data: null, error: "Something went wrong!" };
  }
};

export const getJobPost = async (jobId) => {
  try {
    const response = await axios.get(`${backendUrl}/jobs/getJob/${jobId}`);

    const { job } = response.data.data;
    return { data: job, error: "" };
  } catch (error) {
    return {
      data: null,
      error: error?.response?.data?.message || "Something went wrong!",
    };
  }
};

export const createJobPost = async (jobData) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.post(
      `${backendUrl}/jobs/addJob`,
      {
        ...jobData,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { job } = response.data.data;
    return { data: job, error: "" };
  } catch (error) {
    return { data: null, error: "Something went wrong!" };
  }
};

export const updateJobPost = async (jobData, jobId) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.put(
      `${backendUrl}/jobs/updateJob/${jobId}`,
      {
        ...jobData,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { job } = response.data.data;
    return { data: job, error: "" };
  } catch (error) {
    return { data: null, error: "Something went wrong!" };
  }
};

export const DeleteJobPost = async (jobId) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    await axios.delete(`${backendUrl}/jobs/deleteJob/${jobId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { error: "" };
  } catch (error) {
    return {
      data: null,
      error: error?.response?.data?.message || "Something went wrong!",
    };
  }
};
