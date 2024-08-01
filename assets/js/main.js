document.addEventListener('DOMContentLoaded', function() {
    // Highlight active nav item
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Populate recent blog posts on home page
    if (currentPage === '/' || currentPage === '/index.md') {
        const recentBlogPosts = [
            { title: 'Blog Post 1', url: '/blog/post1.md' },
            { title: 'Blog Post 2', url: '/blog/post2.md' },
            { title: 'Blog Post 3', url: '/blog/post3.md' },
        ];

        const blogPostsList = document.getElementById('recentBlogPosts');
        recentBlogPosts.forEach(post => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `<a href="${post.url}">${post.title}</a>`;
            blogPostsList.appendChild(li);
        });
    }

    // Populate projects on projects page
    if (currentPage === '/projects.md') {
        const projects = [
            { title: 'Spotify Visualizations', description: 'Interactive data visualizations of Spotify listening history.', image: '/img/project-thumbnails/spotify-viz.jpg', url: '/_projects/spotify-visualizations/' },
            // Add more projects here
        ];

        const projectsList = document.getElementById('projectsList');
        projects.forEach(project => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4 mb-4';
            col.innerHTML = `
                <div class="card h-100">
                    <img src="${project.image}" class="card-img-top" alt="${project.title}">
                    <div class="card-body">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text">${project.description}</p>
                        <a href="${project.url}" class="btn btn-primary">View Project</a>
                    </div>
                </div>
            `;
            projectsList.appendChild(col);
        });
    }

     // Populate blog posts on blog page
     if (currentPage === '/blog/' || currentPage === '/blog') {
        fetch('/blog/posts.json')
            .then(response => response.json())
            .then(blogPosts => {
                const blogPostsContainer = document.getElementById('blogPosts');
                blogPosts.forEach(post => {
                    const article = document.createElement('article');
                    article.className = 'mb-5';
                    article.innerHTML = `
                        <h2><a href="${post.url}">${post.title}</a></h2>
                        <p class="text-muted">${post.date}</p>
                        <p>${post.excerpt}</p>
                        <a href="${post.url}" class="btn btn-outline-primary">Read More</a>
                    `;
                    blogPostsContainer.appendChild(article);
                });
            });
    }

    // Handle contact form submission
    if (currentPage === '/contact.md') {
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            // For now, we'll just log it to the console
            console.log('Form submitted:', {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            });
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }
});