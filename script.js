// script.js
document.addEventListener('DOMContentLoaded', function() {
    const schedule = {
        "Monday": [
            { start: "00:00", show: "KCLR Through The Night" },
            { start: "07:00", show: "KCLR Breakfast with John Walsh" },
            { start: "10:00", show: "The KCLR Daily with Brian Redmond" },
            { start: "13:00", show: "The John Keane Show" },
            { start: "16:00", show: "The Home Run with Shannon Redmond" },
            { start: "19:00", show: "Full Time with Eddie Scally" },
            { start: "20:00", show: "Fully Loaded with Eoin Carey" },
            { start: "22:00", show: "Late Night on KCLR" }
        ],
        "Tuesday": [
            { start: "00:00", show: "KCLR Through The Night" },
            { start: "01:00", show: "The Collection" },
            { start: "02:00", show: "KCLR Through The Night" },
            { start: "07:00", show: "KCLR Breakfast with John Walsh" },
            { start: "10:00", show: "The KCLR Daily with Brian Redmond" },
            { start: "13:00", show: "The John Keane Show" },
            { start: "16:00", show: "The Home Run with Shannon Redmond" },
            { start: "19:00", show: "A Journey Through The Climate Crisis" },
            { start: "20:00", show: "Fully Loaded with Eoin Carey" },
            { start: "22:00", show: "Late Night on KCLR" }
        ],
        "Wednesday": [
            { start: "00:00", show: "Ceol Anocht" },
            { start: "01:00", show: "The Jazz Show" },
            { start: "02:00", show: "KCLR Through The Night" },
            { start: "07:00", show: "KCLR Breakfast with John Walsh" },
            { start: "10:00", show: "The KCLR Daily with Brian Redmond" },
            { start: "13:00", show: "The John Keane Show" },
            { start: "16:00", show: "The Home Run with Shannon Redmond" },
            { start: "19:00", show: "Documentaries on KCLR: Full Circle" },
            { start: "20:00", show: "Fully Loaded with Eoin Carey" },
            { start: "22:00", show: "Irish Music Show with Roddie Cleere" }
        ],
        "Thursday": [
            { start: "00:00", show: "KCLR Through The Night" },
            { start: "07:00", show: "KCLR Breakfast with John Walsh" },
            { start: "10:00", show: "The KCLR Daily with Brian Redmond" },
            { start: "13:00", show: "The John Keane Show" },
            { start: "16:00", show: "The Home Run with Shannon Redmond" },
            { start: "19:00", show: "The Farm Show with Matt O’Keeffe" },
            { start: "20:00", show: "Fully Loaded with Eoin Carey" },
            { start: "22:00", show: "Ceol Anocht with Martin Bridgeman" }
        ],
        "Friday": [
            { start: "00:00", show: "Ceol Anocht with Martin Bridgeman" },
            { start: "01:00", show: "KCLR Through The Night" },
            { start: "07:00", show: "KCLR Breakfast with John Walsh" },
            { start: "10:00", show: "The KCLR Daily with Brian Redmond" },
            { start: "13:00", show: "The John Keane Show" },
            { start: "16:00", show: "The Home Run with Shannon Redmond" },
            { start: "19:00", show: "Friday Scoreline with Robbie Dowling" },
            { start: "20:00", show: "Friday Night Live with Eddie Hughes" },
            { start: "22:00", show: "Late Night with Brendan Hennessy" }
        ],
        "Saturday": [
            { start: "00:00", show: "KCLR Through The Night" },
            { start: "07:00", show: "The Breakfast Buffet with Natesshalie Lennon" },
            { start: "10:00", show: "The Saturday Show with Edward Hayden" },
            { start: "12:00", show: "Saturday Brunch with Eddie Hughes" },
            { start: "14:00", show: "Saturday Scorelines" },
            { start: "18:00", show: "Saturday Night Party" },
            { start: "20:00", show: "Transmission with Eleanor Malone" },
            { start: "22:00", show: "Late Night with Brendan Hennessy" }
        ],
        "Sunday": [
            { start: "00:00", show: "KCLR Through The Night" },
            { start: "07:00", show: "The Farm Show" },
            { start: "08:00", show: "The Lake Country" },
            { start: "11:00", show: "KCLR Classics with Carol Dooley" },
            { start: "14:00", show: "Sunday Scoreline" },
            { start: "18:00", show: "Nathalie Lennon on KCLR" },
            { start: "20:00", show: "Sunday Evenings with Tara Byrne" },
            { start: "22:00", show: "Late Night with Eoin Carey" }
        ]
    };

    function getCurrentShow() {
        const now = new Date();
        const dayOfWeek = now.toLocaleString('en-us', {weekday: 'long'});
        const currentTime = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);
    
        const todaysSchedule = schedule[dayOfWeek];
        let currentShow = "Show information not available";
    
        for (let i = 0; i < todaysSchedule.length; i++) {
            const show = todaysSchedule[i];
            if (currentTime >= show.start && (i === todaysSchedule.length - 1 || currentTime < todaysSchedule[i + 1].start)) {
                currentShow = show.show;
                break;
            }
        }
    
        return currentShow;
    }
    
    function updateBanner() {
        const textSpan = document.getElementById('now-playing-text');
        textSpan.textContent = "Now Playing: " + getCurrentShow();
    }
    
    updateBanner();
    setInterval(updateBanner, 60000);

    const carouselContainer = document.querySelector('.carousel-items');
    Object.keys(schedule).forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'carousel-item';
        dayDiv.innerHTML = `<h3>${day}</h3>` + schedule[day].map(show => `<p>${show.start}: ${show.show}</p>`).join('');
        carouselContainer.appendChild(dayDiv);
    });

    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    items[currentIndex].style.display = 'block';

    document.querySelector('.prev').addEventListener('click', function() {
        changeSlide(-1);
    });

    document.querySelector('.next').addEventListener('click', function() {
        changeSlide(1);
    });

    function changeSlide(move) {
        items[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + move + items.length) % items.length;
        items[currentIndex].style.display = 'block';
    }

    
});
