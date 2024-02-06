import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import LOGO from '../assets/pokemon-logo.png';
import { useScrollDirection, useScrollToTopOrSection } from '../hooks';

const Header = () => {
  const scrollDirection = useScrollDirection();
  const scrollToTop = useScrollToTopOrSection();
  const navigate = useNavigate();

  const handleStartPosition = () => {
    scrollToTop();
    navigate('/');
  };

  const headerClasses = classNames('header', {
    hide: scrollDirection === 'down',
  });

  return (
        <header className={headerClasses}>
            <div className='header-container'>
                <img src={LOGO} alt='logo' onClick={handleStartPosition}/>

                <Link smooth spy to='footer' className='header-link'>Contacts</Link>
            </div>
        </header>
  );
};

export default Header;
