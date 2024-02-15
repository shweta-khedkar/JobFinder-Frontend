import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Context/UserContext';
import Button from '../Components/Form/Button';
import Navbar from '../Components/Home/Navbar';
import {PiMoneyFill} from 'react-icons/pi'
import styles from './ViewJob.module.scss'
import { FaCalendar, FaPencil } from 'react-icons/fa6';
import { formatDistanceToNow } from 'date-fns'
import { getJobPost } from '../APIs/JobApi';
const ViewJob = () => {
    const [error, setError] = useState("");
    const [job, setJob] = useState(null);
    const {jobId} = useParams();
    const navigate = useNavigate();
    const {user} = useAuth()
    const {state: jobData} = useLocation();
  
    useEffect(()=> {
      console.log(jobData);
      if(!jobData) {
        if(!jobId) setError("No Job Post Found");
    
        ;(async ()=> {
          const {data: job, error} = await getJobPost(jobId);
          if(error) setError("No Job Post Found")
          else setJob(job);
        })();
      } else setJob(jobData);
  
    }, [])
  
    const convertDateToNowFormat = (date)=> {
      const parsedDate = new Date(date);
      const distanceToNow = formatDistanceToNow(parsedDate, { addSuffix: true });
  
      return distanceToNow;
    }
  
    const getJobMode = (jobType)=> {
      let jobMode = "";
      switch (jobType) {
        case "Remote":
          jobMode = "Work From Home"
          break;
        case "Office":
          jobMode = "On Site"
          break;
        case "Hybrid": 
          jobMode = "Hybrid Mode"
          break;
  
        default:
          break;
      }
  
      return jobMode
    }
    const getJobType = (jobType)=> {
        let jobtype = "";
        switch (jobType) {
          case "Full Time":
            jobtype = "Full Time"
            break;
          case "Part Time":
            jobtype = "Part Tim"
            break;
          case "Contract": 
            jobtype = "Contract Mode"
            break;
          case "Internship": 
            jobtype = "Internship Mode"
            break;
    
          default:
            break;
        }
    
        return jobtype
      }
  
    if(error) {
      return <h1 className='center'>{error}</h1>
    }
  return (
    job ? 
    <div className={`${styles.view_job}`}>
        <Navbar />
        <section className={`${styles.job_basic_info}`}>
            <h3>
              {job.title} {getJobMode(job.remoteOffice)} On {job.jobType} At {job.company}
            </h3>
        </section>
        <section className={`${styles.job_main}`}>
          <p>{convertDateToNowFormat(job.createdAt)} • {job.jobType} • {job.company}</p>
          <div className={`${styles.title}`}>
            <h1>{job.title}</h1>
            {(user.id===job.recruiter._id || user.id===job.recruiter)
            && <Button onClick={()=> navigate(`/job/edit/${job._id}`)}><FaPencil/> Edit Job</Button>}
          </div>
          {job.location? <p>{job.location} | India</p> : <p>Location Not Mentioned"</p>}
          <div className={`${styles.money_duration}`}>
            <div>
              <span><PiMoneyFill/> Stipend </span><span>{job.monthlySalary? `Rs ${job.monthlySalary}/month` : "Not Disclosed"}</span>
            </div>
            <div>
              <span><FaCalendar/> Duration </span><span>{job.duration ? `${job.duration} Months` : "Not Mentioned"}</span>
            </div>
          </div>
          {
            job.aboutCompany && 
            <div>
              <h3>About Company</h3>
              <p>{job.aboutCompany}</p>
            </div>
          }
          <div>
            <h3>About the job/internship</h3>
            <p>{job.description}</p>
          </div>
          <div className={`${styles.skills_required}`}>
            <h3>Skill&#40;s&#41; required</h3>
            <div>
              {job.skillsRequired.map((skill)=> (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
          {
            job.information && 
            <div>
              <h3>Additional Information</h3>
              <p>{job.information}</p>
            </div>
          }
        </section>
    </div> : <></>
  )
}

export default ViewJob