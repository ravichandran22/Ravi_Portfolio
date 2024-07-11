document.addEventListener("DOMContentLoaded", function () {
    const postBlocksContainer = document.querySelector(".posts-container");
    const tagButtons = document.querySelectorAll(".tag-button");
    const loadMoreButton = document.getElementById("loadMoreButton");
    const postBlocks = document.querySelectorAll(".post");

    let selectedTag = "all"; // Initially, "all" tag is selected
    let currentPage = 1;
    const itemsPerPage = 4;

    function filterPostsByTag(tag) {
        selectedTag = tag;
        currentPage = 1; // Reset current page when changing tags

        // Clear existing posts in the container
        postBlocksContainer.innerHTML = '';

        const filteredPostBlocks = Array.from(postBlocks).filter((block) => {
            const tags = block.getAttribute("data-tags").split(",");
            return selectedTag === "all" || tags.includes(selectedTag);
        });

        showPostsForPage(currentPage, filteredPostBlocks);
        updateLoadMoreButton(filteredPostBlocks);
    }

    function showPostsForPage(pageNumber, postBlocks) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, postBlocks.length);

        for (let i = startIndex; i < endIndex; i++) {
            postBlocksContainer.appendChild(postBlocks[i].cloneNode(true));
        }
    }

    function updateLoadMoreButton(filteredPostBlocks) {
        const visiblePostCount = filteredPostBlocks.length;

        if (visiblePostCount <= currentPage * itemsPerPage) {
            loadMoreButton.style.display = "none";
        } else {
            loadMoreButton.style.display = "block";
        }
    }

    function loadMorePosts() {
        currentPage++;
        const filteredPostBlocks = Array.from(postBlocks).filter((block) => {
            const tags = block.getAttribute("data-tags").split(",");
            return selectedTag === "all" || tags.includes(selectedTag);
        });

        showPostsForPage(currentPage, filteredPostBlocks);
        updateLoadMoreButton(filteredPostBlocks);
    }

    tagButtons.forEach((button) => {
        button.addEventListener("click", () => {
            tagButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            const tag = button.getAttribute("data-tag");
            filterPostsByTag(tag);
        });
    });

    loadMoreButton.addEventListener("click", loadMorePosts);

    // Initial setup
    filterPostsByTag(selectedTag);
});

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
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


    // Smooth scrolling to section
    $(".btn-scroll").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 0
            }, 1500, 'easeInOutExpo');
        }
    });
    
    
    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // // Portfolio isotope and filter
    // var portfolioIsotope = $('.portfolio-container').isotope({
    //     itemSelector: '.portfolio-item',
    //     layoutMode: 'fitRows'
    // });
    // $('#portfolio-flters li').on('click', function () {
    //     $("#portfolio-flters li").removeClass('active');
    //     $(this).addClass('active');

    //     portfolioIsotope.isotope({filter: $(this).data('filter')});
    // });

    // Load More functionality
    const itemsToShowInitially = 4;
    const loadMoreBtn = $('#load-more');
    let itemsToShow = itemsToShowInitially;

    const showItems = () => {
        let hiddenItems = portfolioIsotope.find('.portfolio-item.hidden');
        hiddenItems.slice(0, itemsToShow).removeClass('hidden');
        portfolioIsotope.isotope('layout');

        if (hiddenItems.length <= itemsToShow) {
            loadMoreBtn.hide();
        }
    };

    // Initially hide items beyond the initial limit
    portfolioIsotope.find('.portfolio-item').slice(itemsToShow).addClass('hidden');

    // Load more button click event
    loadMoreBtn.on('click', function () {
        itemsToShow += itemsToShowInitially;
        showItems();
    });

    showItems(); // Initial call to show items



    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
})(jQuery);

