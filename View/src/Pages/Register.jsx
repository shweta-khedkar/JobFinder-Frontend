import React from 'react'
import FormWrap from '../Components/FormWrap'
import RegisterComponent from '../Components/RegisterComponent'

const Register = () => {
  return (
    <div>
        <FormWrap posterHeading='Your Personal Job Finder' poster={"BannerImg.png"}>
            <RegisterComponent/>
        </FormWrap>
    </div>
  )
}

export default Register