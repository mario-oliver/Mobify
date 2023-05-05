import React from 'react'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'


const Landing = () => {
    return (
        <main>
            <nav>
                <img src={logo} alt='Mobify' className='logo'></img>
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
            </div>
            {/*Large image that will disappear on certain sized*/}
            <img src={main} alt='job hunt' className='img main-img'/>
        </main>
    )
}

export default Landing