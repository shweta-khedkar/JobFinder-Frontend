import React from 'react'
import { Link} from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { RiTeamFill } from "react-icons/ri";
import { MdCurrencyRupee } from "react-icons/md";
import styles from "./JobCard.module.scss"
import favicon from "/Favicon.png"
import { DeleteJobPost } from '../../APIs/JobApi';
import Button from '../Form/Button';

const JobCard = ({
    logoUrl = "",
    title,
    teamSize = "11-50",
    monthlySalary = 0,
    location = "",
    jobType,
    remoteOffice,
    skills = [],
    skillsLeft = 0,
    recruiter,
    jobId,
    user,

  }) => {
    
    
  return (
    <div className={`${styles.job_card}`}>
    <section className={`${styles.job_info}`}>
      <div className={`${styles.company_logo}`}>
        {logoUrl ? <img src={logoUrl} alt="logo here" /> : <img className={`${styles.logoimg}`} src={favicon}></img>}
      </div>
      <div>
        <h3>{title}</h3>
        <div>
          <p><RiTeamFill/> {teamSize}</p>
          <p><MdCurrencyRupee/> {monthlySalary!==0? monthlySalary : "Not disclosed"}</p>
          <p><FaLocationDot/> {location}</p>
        </div>
        <div>
          <p>{remoteOffice}</p>
          <p>{jobType}</p>
        </div>
      </div>
    </section>
    <section className={`${styles.skills_and_buttons}`}>
      <div className={`${styles.skills}`}>
        {skills.map((skill) => (
          <div key={skill}>{skill}</div>
        ))}
        {skillsLeft ? <span>+{skillsLeft} more</span> : null}
      </div>
      <div className={`${styles.job_buttons}`}>
      {user.id === recruiter && (
          
          <Link
            onClick={()=>{
              DeleteJobPost(jobId);
            }}
            style={{
              color: "var(--dark-pink)",
              border: "2px solid var(--dark-pink)",
              padding: "0.3rem 1.5rem",
            }}
          >
           Delete Job
          </Link>
        )}
        {user.id === recruiter && (
          
          <Link
            to={`/job/edit/${jobId}`}
            style={{
              color: "var(--dark-pink)",
              border: "2px solid var(--dark-pink)",
              padding: "0.3rem 1.5rem",
            }}
          >
            Edit Job
          </Link>
        )}
        <Link
          to={`/job/view/${jobId}`}
          style={{ color: "#FFF", backgroundColor: "var(--dark-pink)" }}
        >
          View Details
        </Link>
      </div>
    </section>
  </div>
  )
}

export default JobCard