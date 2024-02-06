import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import PokemonSection from '../components/PokemonSection';
import { useAppSelector, useScrollToTopOrSection } from '../hooks';

const Home = () => {
  const dataType = useAppSelector((state) => state.types);
  const nameType = dataType.type;

  const scrollToSection = useScrollToTopOrSection();

  useEffect(() => {
    if (nameType) {
      scrollToSection('catalog');
    }
  }, [nameType]);

  return (
        <main className='home-page'>
            <div className='home-page-container'>
                <HeroSection/>
                <PokemonSection/>
            </div>
        </main>
  );
};

export default Home;
