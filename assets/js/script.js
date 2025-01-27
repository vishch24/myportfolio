(function () {
    'use strict';

    setTimeout(function () {
        $("#preloader").fadeOut("slow");
    }, 800); // 2-second delay for demonstration

    $(".nav-link").on("click", function (event) {
        event.preventDefault(); // Prevent default anchor click behavior

        let offcanvasNavbar = document.getElementById('offcanvasNavbar');
        let offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasNavbar);

        if(offcanvasNavbar.classList.contains('show'))
        {
            console.log("Offcanvas is now open");
            offcanvasInstance.hide();
        }
        
        let target = $(this).attr("href"); // Get the target section's ID
        setTimeout(function () {
            $("html, body").animate(
                {
                    scrollTop: $(target).offset().top
                },
                100 // Animation duration in milliseconds
            );
        }, 400); // Delay to ensure offcanvas closes first
    });

    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        navText:['<i class="bi bi-chevron-left"></i>','<i class="bi bi-chevron-right"></i>'],
        dots:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:2
            }
        }
    });

    $('#myContactForm').on('submit', function (e)
    {
        e.preventDefault(); // Prevent the default form submission

        // Collect form data dynamically using serializeArray()
        let formDataArray = $(this).serializeArray();
        let formData = {};

        // Convert array to key-value object
        $.each(formDataArray, function (index, field) {
            formData[field.name] = field.value;
        });

        // Send data to the PHP script using AJAX
        $.ajax({
            url: 'save_form.php',  // PHP file to handle the data
            type: 'POST',
            data: formData,  // Send form data to PHP
            dataType: "json",
            success: function (response) {
                console.log(response);
                $('#response').html(
                    `<div class="alert alert-${response.type} alert-dismissible" role="alert"> 
                        <div>${response.message}</div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`
                );
                $('#myContactForm')[0].reset(); // Clear the form after submission
            },
            error: function (response) {
                $('#response').html(
                    `<div class="alert alert-error alert-dismissible" role="alert">`,
                    `   <div>${response}</div>`,
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    '</div>'
                );
            }
        });
    });

    /**** Scroll to top *****/
    $("#scroll-top").on("click", function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 100);
        return false;
    });

    $(window).scroll(function()
    {
        if ($(this).scrollTop() != 0) {
            $("#scroll-top").fadeIn();
        } else {
            $("#scroll-top").fadeOut();
        }
    });
})()