import React from 'react'
import LoginComponents from '../Components/LoginComponents'
import FormWrap from '../Components/FormWrap'

const Login = () => {
  return (
    <div>
    <FormWrap posterHeading='Your Personal Job Finder' poster={"BannerImg.png"}>
        <LoginComponents/>
    </FormWrap>
</div>
  )
}

export default Login