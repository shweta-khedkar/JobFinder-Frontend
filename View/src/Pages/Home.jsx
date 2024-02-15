import React, { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from '../Components/Home/Navbar'
import JobCard from '../Components/Home/JobCard';
import { getJobsByFilter } from '../APIs/JobApi';
import Filter from '../Components/Home/Filter';
import styles from './Home.module.scss'
import { useAuth } from '../Context/UserContext';
const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [skills, setSkills] = useState([]);
    const applyRef = useRef();
    const {user} = useAuth();

    useEffect(()=> {
       if(skills.length) applyRef.current.disabled = false
       else fetchJobs();
    }, [skills])

    const fetchJobs = async ()=> {
      setLoading(true);
      try {
        const {data: jobsData, error} = await getJobsByFilter({title, skills});
        if(!error) {
            setJobs(jobsData);
        }
      } finally {
        setLoading(false);
      }
    }

    const findMatchSkills = useCallback((jobSkills)=> {
        if(jobSkills.length <= 4) return {skills: jobSkills, skillsLeft: 0}
        else if(!skills.length) return {skills: jobSkills.slice(0,4), skillsLeft: jobSkills.length-4}
        
        const commonSkills = skills
        .map((skill)=> skill.toLowerCase())
        .filter((skill)=> jobSkills.includes(skill.toLowerCase()));
        
        let additionalSkills = [];
        if(commonSkills.length < 4) {
            additionalSkills = jobSkills.filter((skill)=> !commonSkills.includes(skill));
        }

        return {skills: [...commonSkills, ...additionalSkills].slice(0, 4), skillsLeft: jobSkills.length-4}
    }, [jobs])

    const addSkill = (skill)=> {
        !skills.includes(skill) && setSkills((prev)=> [...prev, skill])
    }

    const removeSkill = (skill)=> {
        setSkills((prev)=> prev.filter((item)=> item!==skill));
    }

    const clearSkills = ()=> {setSkills([])}

  return (
    <>
    <Navbar/>
    <main className={`${styles.home}`}>
        <Filter
          user={user}
          addSkill={addSkill}
          removeSkill={removeSkill}
          clearSkills={clearSkills}
          title={title}
          updateTitle={(value) => setTitle(value)}
          applyRef={applyRef}
          skills={skills}
          fetchJobs={fetchJobs}
        />
        <section>
          {loading ? (
            <h1>Wait a minute ...fetching Job</h1>
          ) : jobs.length ? (
            jobs.map((job) => (
              <JobCard
                key={job._id}
                {...job}
                {...findMatchSkills(job.skillsRequired)}
                jobId={job._id}
                user={user}
              />
            ))
          ) : (
            <h1>Not Found Any Matched Jobs</h1>
          )}
        </section>
      </main>
    </>
  )
}

export default Home