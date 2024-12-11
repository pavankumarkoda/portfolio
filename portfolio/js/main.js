(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);

async function fetchLeetCodeData() {
    // This is the LeetCode profile URL (replace with actual username)
    const url = "https://leetcode.com/pavankoda/";

    // Fetching the page content
    const response = await fetch(url);
    const pageContent = await response.text();

    // Parsing HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(pageContent, 'text/html');

    // Scraping data (assuming the correct HTML structure on LeetCode)
    const streakElement = doc.querySelector('.profile__streak'); // Update this selector if necessary
    const ratingElement = doc.querySelector('.profile__rating'); // Update this selector if necessary

    // Fallback values if not found
    const streak = streakElement ? streakElement.textContent.trim() : "N/A";
    const rating = ratingElement ? ratingElement.textContent.trim() : "N/A";

    // Updating UI with fetched data
    document.getElementById('leetcode-streak').innerHTML = "Streak: <strong>" + streak + "</strong>";
    document.getElementById('leetcode-rating').innerHTML = "Rating: <strong>" + rating + "</strong>";
}

// Function to scrape Coding Ninjas Profile
async function fetchCodingNinjasData() {
    // This is the Coding Ninjas profile URL (replace with actual username)
    const url = "https://www.codingninjas.com/codestudio/profile/pavankoda/";

    // Fetching the page content
    const response = await fetch(url);
    const pageContent = await response.text();

    // Parsing HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(pageContent, 'text/html');

    // Scraping data (update selectors based on actual page structure)
    const streakElement = doc.querySelector('.profile-streak'); // Update this selector if necessary
    const levelElement = doc.querySelector('.profile-level'); // Update this selector if necessary

    // Fallback values if not found
    const streak = streakElement ? streakElement.textContent.trim() : "N/A";
    const level = levelElement ? levelElement.textContent.trim() : "N/A";

    // Updating UI with fetched data
    document.getElementById('codingninjas-streak').innerHTML = "Streak: <strong>" + streak + "</strong>";
    document.getElementById('codingninjas-level').innerHTML = "Level: <strong>" + level + "</strong>";
}

// Fetch profile data when the page loads
fetchLeetCodeData();
fetchCodingNinjasData();
document.getElementById('sendMessageButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    // Create the mailto link with pre-filled data
    var mailtoLink = `mailto:pavankumarkoda007@gmail.com?subject=${encodeURIComponent(subject)}&body=Name: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0AMessage: ${encodeURIComponent(message)}`;

    // Open the email client (Gmail or the default client)
    window.location.href = mailtoLink;
});
