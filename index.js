document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-btn')
  const infoSections = document.querySelectorAll('.info-section')

  // Default active button and section setup
  const defaultButton = document.querySelector('.nav-btn.active-button')
  if (defaultButton) {
    const targetId = defaultButton.getAttribute('data-target')
    const defaultSection = document.getElementById(targetId)
    if (defaultSection) {
      defaultSection.classList.add('active')
    }
  }

  // Event listener for button clicks
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target')

      // Remove 'active-button' class from all buttons
      navButtons.forEach(btn => btn.classList.remove('active-button'))

      // Add 'active-button' class to the clicked button
      button.classList.add('active-button')

      // Hide all sections
      infoSections.forEach(section => section.classList.remove('active'))

      // Show the target section
      const targetSection = document.getElementById(targetId)
      if (targetSection) {
        targetSection.classList.add('active')
       
      }
    })
  })

  // Image Gallery Switching
  const thumbnails = document.querySelectorAll('.thumbnail')
  const mainImage = document.getElementById('main-image')

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function () {
      // Remove 'active' class from all thumbnails
      thumbnails.forEach(thumb => thumb.classList.remove('active'))

      // Add 'active' class to the clicked thumbnail
      this.classList.add('active')

      // Change the main image source to the clicked thumbnail's source
      mainImage.src = this.src
    })
  })

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn')
  const menu = document.querySelector('.menu')
  const menuItems = document.querySelectorAll('.menu-item')

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      menu.classList.toggle('show')
    })
  }

  if (menuItems) {
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        menu.classList.remove('show')
      })
    })
  }

  // Add scroll effect to navbar
  const navbar = document.querySelector('.navbar')
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled')
      } else {
        navbar.classList.remove('scrolled')
      }
    })
  }

  // JavaScript for filtering projects
  const techFilter = document.getElementById('tech-filter')
  if (techFilter) {
    techFilter.addEventListener('change', () => {
      const selectedFilter = techFilter.value
      const projects = document.querySelectorAll('.project-item')

      projects.forEach(project => {
        const matchesFilter = project
          .getAttribute('data-tech')
          .includes(selectedFilter)
        project.style.display =
          selectedFilter === 'all' || matchesFilter ? 'block' : 'none'
      })
    })
  }

  // Event listeners for filtering blogs
  const filterDate = document.getElementById('filter-date')
  const filterCategory = document.getElementById('filter-category')

  const filterBlogs = () => {
    const selectedDate = filterDate ? filterDate.value : 'all'
    const selectedCategory = filterCategory ? filterCategory.value : 'all'
    const blogItems = document.querySelectorAll('.blog-item')

    blogItems.forEach(item => {
      const itemDate = item.getAttribute('data-date')
      const itemCategory = item.getAttribute('data-category')

      const dateMatches = selectedDate === 'all' || selectedDate === itemDate
      const categoryMatches =
        selectedCategory === 'all' || selectedCategory === itemCategory

      item.style.display = dateMatches && categoryMatches ? 'block' : 'none'
    })
  }

  if (filterDate) filterDate.addEventListener('change', filterBlogs)
  if (filterCategory) filterCategory.addEventListener('change', filterBlogs)

  // Carousel functionality
  const carouselItems = document.querySelectorAll('.carousel-item')
  const prevButton = document.querySelector('.carousel-control.prev')
  const nextButton = document.querySelector('.carousel-control.next')
  let currentIndex = 0

  const updateCarousel = index => {
    carouselItems.forEach((item, i) => {
      item.classList.toggle('active', i === index)
    })
  }

  const showNextSlide = () => {
    currentIndex = (currentIndex + 1) % carouselItems.length
    updateCarousel(currentIndex)
  }

  const showPrevSlide = () => {
    currentIndex =
      (currentIndex - 1 + carouselItems.length) % carouselItems.length
    updateCarousel(currentIndex)
  }

  if (prevButton) {
    prevButton.addEventListener('click', showPrevSlide)
  }

  if (nextButton) {
    nextButton.addEventListener('click', showNextSlide)
  }

  // Initialize the carousel
  updateCarousel(currentIndex)
})


// Handle Skills Navigation
document.querySelectorAll('.skills-nav-btn').forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all categories
    document.querySelectorAll('.category').forEach(category => category.classList.remove('active'));

    // Remove 'active' class from all navigation buttons
    document.querySelectorAll('.skills-nav-btn').forEach(btn => btn.classList.remove('active'));

    // Add 'active' class to the target category
    const targetId = button.dataset.target;
    document.getElementById(targetId).classList.add('active');

    // Add 'active' class to the clicked button
    button.classList.add('active');
  });
});

// Set default active category in Skills section
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#frontend').classList.add('active'); // Default category
  document.querySelector('.skills-nav-btn[data-target="frontend"]').classList.add('active'); // Default button
});

