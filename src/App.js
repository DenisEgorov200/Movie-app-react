import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import HeroSlide from './components/HeroSlide/HeroSlide'
import ReleasesSlider from './components/ReleasesSlider/ReleasesSlider'
import ShowMore from './components/ShowMore/ShowMore'
import GetMovies from './api/apiClient'

import styles from './App.module.scss'

function App() {
  return <div>
    <Sidebar />
    <main className={styles.main}>
      <Header />
      <HeroSlide />
      <div className={styles.newReleases}>
        <div className={styles.newReleasesHeader}>
          <ShowMore className={styles.newReleasesLink}>New Releases</ShowMore>
        </div>
        <ReleasesSlider />
        <GetMovies />
      </div>
    </main>
  </div>
  ;
}

export default App;