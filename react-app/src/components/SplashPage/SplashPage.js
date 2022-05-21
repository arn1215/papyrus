
import { Link, useHistory } from 'react-router-dom'
import image from '../Papyrus-logos_transparent.png'



const SplashPage = () => {

  const history = useHistory()

  return (
    <>
      <div className="splash-page">
        <div>
          <div className='splash-c'>
            <img src={image} className='splash-image' />
            <h3 className='white'>
              Everyone could use a little help getting and staying organized -- <br></br>
              at Papyrus we can help you do just that. Create notebooks on your dashboard and add notes to them.
            </h3>
            <button
              className='form-button'
              onClick={() => {history.push('/login')}}
            >
              Get Started
            </button>
          </div>

        </div>
      </div>
      {/* <div className='reviews'>
            <p className='white'><br></br><i>"Papyrus slaps!"</i>-- Review Person</p>
            <p className='white'><br></br><i>"Great for journaling."</i>-- Journal Person</p>
            <p className='white'><br></br><i>"Part of my routine"</i>-- Routine Person</p>
          </div> */}

    </>
  )
}

export default SplashPage
