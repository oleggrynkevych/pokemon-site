import AnimateBall from './AnimateBall';
import TELEGRAMICON from '../assets/telegram-icon.svg';
import LINKEDINICON from '../assets/linkedin-icon.svg';

const Footer = () => (
    <footer className='footer' >
        <div className='footer-container'>
            <AnimateBall/>
            <h2>
                Waiting for your response :)
            </h2>
            <div className='footer-contacts-box'>
                <a href='https://t.me/grynkevych' target='_blank' rel="noreferrer">
                    <div className='footer-contact'>
                        <img src={TELEGRAMICON} alt={'Telegram'}/>
                        <span>@grynkevych</span>
                    </div>
                </a>

                <a href='https://www.linkedin.com/in/oleg-grynkevych-418a47251/' target='_blank' rel="noreferrer">
                    <div className='footer-contact'>
                        <img src={LINKEDINICON} alt={'Linkedin'}/>
                        <span>Oleg Grynkevych</span>
                    </div>
                </a>

            </div>
        </div>
    </footer>
);

export default Footer;
