let activeButton = null;
const loadCategories = async () => {
    const response  =  await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    const categories = data.data.news_category;
    const allCategoriesButtonContainer = document.getElementById('allCategoriesButtonContainer');
    categories.forEach(category => {
    const div = document.createElement('div');
    div.innerHTML = `
    <button class="bg-green-500 py-3 px-5 rounded text-white category-button" onclick="loadNews('${category.category_id}'),changeBG(this)">
        ${category.category_name}
    </button>
    `;
    allCategoriesButtonContainer.appendChild(div);
    });
}
const loadNews = async (categoryId) => {
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.classList.remove('hidden');
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();
    const allNews = data.data;
    const allNewsContainer = document.getElementById('allNewsContainer');
    const errorContainer = document.getElementById('errorContainer');
    if(allNews.length === 0){
        errorContainer.classList.remove('hidden');
    }else{
        errorContainer.classList.add('hidden');
    }
    allNewsContainer.textContent = '';
    if(allNews.length > 0){
        loadingSpinner.classList.add('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
    allNews.forEach(news => {
        const div = document.createElement('div');
        div.className = 'flex gap-4 items-center justify-between shadow-lg rounded border-[2px] border-green-500 w-2/3';
        div.innerHTML = `
        <img src="${news.thumbnail_url ? news.thumbnail_url : 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg'}" alt="Image" class="max-w-[300px] h-full object-cover rounded">
        <div class="pr-2 py-2">
            <div class="flex justify-between gap-6">
                <h2 class="font-bold text-black text-lg">
                    ${news.title ? news.title : 'No Data Found'}
                </h2>
                <div>
                    <span class="text-lg text-green-600 font-bold">
                        ${news.rating.number ? news.rating.number : 'No Data Found'}
                    </span>
                    <p class="text-base text-black font-normal">
                    ${news.rating.badge ? news.rating.badge : 'No Data Found'}
                    </p>
                </div>
            </div>
            <p class="font-normal text-base text-slate-700 my-4" style="display:-webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis; white-space: normal;">
                ${news.details ? news.details : 'No Data Found'}
            </p>
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <img src="${news.author.img ? news.author.img : 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg'}" alt="Image" class="h-[80px] w-[80px] rounded-[50%] object-cover">
                    <div>
                        <h6 class="font-bold text-black text-base">
                            ${news.author.name ? news.author.name : 'No Data Found'}
                        </h6>
                        <p class="font-normal text-black text-base">
                            Date - <span>
                            ${news.author.published_date ? news.author.published_date.slice(0, 10) : 'No Data Found'}
                            </span>
                        </p>
                    </div>
                </div>
                <div class="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                    </svg>
                    <span class="text-black font-bold text-base">
                        ${news.total_view ? news.total_view : 'No Data Found'}
                    </span>
                </div>
                <div>
                    <button class="bg-green-500 py-3 px-5 rounded text-white" onclick="handleDetail('${news._id}')">
                        Details
                    </button>
                </div>
            </div>
        </div>
        `;
        allNewsContainer.appendChild(div);
    });
}
const handleSearch = () => {
    const input = document.getElementById('input');
    const inputValue = input.value;
    if(inputValue){
        loadNews(inputValue);
        input.value = '';
    }else{
        alert('Please Enter A Valid Category ID');
    }
}
const handleDetail = async (newsId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const data = await response.json();
    const newsDetail = data.data[0];
    showDetail(newsDetail);
}
const showDetail = (newsDetail) => {
    const newsDetailContainer =  document.getElementById('newsDetailContainer');
    newsDetailContainer.innerHTML = `
    <p class="mb-2">${newsDetail?.others_info?.is_trending ? 'Trending' : '' }</p>
    <p class="mb-2">
    Category Id : ${newsDetail?.category_id ? newsDetail.category_id : 'No Data Found'}
    </p>
    <p class="mb-2">
    Rating : ${newsDetail?.rating?.number ? newsDetail.rating.number : 'No Data Found'}
    </p>
    <p class="mb-2">${newsDetail?.rating?.badge ? newsDetail.rating.badge : 'No Data Found'}</p>
    <p class="mb-2">${newsDetail?.total_view ? newsDetail.total_view : 'No Data Found'}</p>
    <p class="mb-2">${newsDetail?.title ? newsDetail.title : 'No Data Found'}</p>
    <p class="mb-2">
    ${newsDetail?.author?.name ? newsDetail.author.name : 'No Data Found'}
    </p>
    <p class="mb-2">
    ${newsDetail?.author?.published_date ? newsDetail.author.published_date.slice(0, 10) : 'No Data Found'}
    </p>
    <img src="${newsDetail?.author?.img ? newsDetail.author.img : 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg'}" alt="Image" class="w-[50%]">
    <img src="${newsDetail?.thumbnail_url ? newsDetail.thumbnail_url : 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg'}" alt="Image" class="w-[50%] my-2">
    <img src="${newsDetail?.image_url ? newsDetail.image_url : 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg'}" alt="Image" class="w-[50%]">
    <p class="mt-2">${newsDetail?.details ? newsDetail.details : 'No Data Found'}</p>
    `;
    modal.showModal();
}
const changeBG = (element) => {
    if (activeButton) {
        activeButton.style.background = '';
    }
    element.style.background = 'black';
    activeButton = element;
}
loadNews('01');
loadCategories();