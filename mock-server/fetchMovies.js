const fs = require('fs');

const EXTERNAL_API_URL = 'https://moviesapi.ir/api/v1/movies';
const TOTAL_MOVIES_NEEDED = 1000;

async function fetchAllMovies() {
    let fetchedMovies = [];
    let page = 1;

    console.log('در حال دریافت اطلاعات...');
    while (true) {
        try {
            const response = await fetch(`${EXTERNAL_API_URL}?page=${page}`);
            const result = await response.json();
            
            const moviesInPage = result.data;
            
            if (!moviesInPage || moviesInPage.length === 0) {
                console.log('تمام فیلم‌های موجود در API دریافت شد. پایان دریافت.');
                break;
            }

            fetchedMovies = [...fetchedMovies, ...moviesInPage];
            console.log(`صفحه ${page} دریافت شد. (مجموع: ${fetchedMovies.length} فیلم)`);
            
            page++;

            await new Promise(resolve => setTimeout(resolve, 500));
            
        } catch (error) {
            console.error(`خطا در دریافت صفحه ${page}:`, error);
            break;
        }
    }

    if (fetchedMovies.length === 0) {
        console.log('هیچ فیلمی دریافت نشد!');
        return;
    }

    console.log(`در حال تولید ${TOTAL_MOVIES_NEEDED} فیلم و اضافه کردن وضعیت انتشار...`);
    
    let finalMovies = [];
    const fetchedCount = fetchedMovies.length;

    for (let i = 0; i < TOTAL_MOVIES_NEEDED; i++) {
        let movie = { ...fetchedMovies[i % fetchedCount] }; 
        movie.id = i + 1;
        movie.is_published = Math.random() > 0.5;
        finalMovies.push(movie);
    }
    const dbData = {
        movies: finalMovies 
    };

    fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
    console.log('✅ فایل db.json با موفقیت ساخته شد و شامل ۱۰۰۰ فیلم است!');
}

fetchAllMovies();
