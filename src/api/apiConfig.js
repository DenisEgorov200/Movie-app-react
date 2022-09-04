const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '7aa6ab113cae070e154dd8daaaf3cbe8',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig