import React, { useEffect, useState } from 'react'
import FormWrap from '../Components/FormWrap';
import JobPost from '../Components/JobPost';
import { getJobPost } from '../APIs/JobApi';
import { useParams } from 'react-router-dom';

const UpdateJob = () => {
    const [error, setError] = useState("");
    const [job, setJob] = useState(null);
    const {jobId} = useParams();
  
    useEffect(()=> {
      if(!jobId) setError("No Job Post Found");
  
      ;(async ()=> {
        const {data: job, error} = await getJobPost(jobId);
        if(error) setError("No Job Post Found")
        else setJob(job);
      })();
  
    }, [])
  
    if(error) {
      return <h1 className='center'>{error}</h1>
    }
  return (
    job ? 
    <div>
        <FormWrap posterHeading='Recruiter Update Job Details Here' poster={"BannerImg2.png"}>
            <JobPost job={job} />
        </FormWrap>
    </div> : <></>
  )
}

export default UpdateJob