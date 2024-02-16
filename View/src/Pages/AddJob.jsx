import React from 'react'
import FormWrap from '../Components/FormWrap'
import JobPost from '../Components/JobPost'

const AddJob = () => {
  return (
    <div>
        <FormWrap posterHeading='Recruiter Add Job Details Here' poster={"BannerImg2.png"}>
            <JobPost />
        </FormWrap>
    </div>
  )
}

export default AddJob