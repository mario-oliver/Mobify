import React from 'react'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import {Logo} from '../components'

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo/>
            </nav>
            {/*info details*/}
            <div className='container page'>
                <div className='info'>
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p> I'm a paragraph explaining the cool things we do at Jobify</p>
                    <button className='btn btn-hero'>Login/Register</button>
                </div>
                {/*Large image that will disappear on certain sized*/}
                <img src={main} alt='job hunt' className='img main-img' />
            </div>

        </Wrapper>
    )
}


export default Landing