import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import MoviesList from './components/HeroSlide/HeroSlide'
import ReleasesSlider from './components/ReleasesSlider/ReleasesSlider'
import ShowMore from './components/ShowMore/ShowMore'
import ShowSlider from './components/ShowSlider/ShowSlider'

import styles from './App.module.scss'

function App() {
  return <div>
    <Sidebar />
    <main className={styles.main}>
      <Header />
      <MoviesList />
      <div className={styles.newReleases}>
        <div className={styles.newReleasesHeader}>
          <ShowMore className={styles.newReleasesLink}>New Releases</ShowMore>
        </div>
        <ReleasesSlider />
      </div>
      <div className={styles.shows}>
        <div className={styles.showsHeader}>
          <ShowMore className={styles.showsLink}>Featured TV shows</ShowMore>
        </div>
        <ShowSlider />
      </div>
    </main>
  </div>
  ;
}

export default App;