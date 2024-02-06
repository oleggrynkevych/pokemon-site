import { Link } from 'react-scroll';

const HeroSection = () => (
    <section className='hero-section'>
        <div></div>
        <Link smooth spy to='catalog' className='hero-section-link'>
            <span>catalog</span>
        </Link>
    </section>
);

export default HeroSection;
