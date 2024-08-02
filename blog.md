---
layout: default
title: Blog
---

# Blog

<div id="blogPosts">
    <!-- This will be populated by JavaScript -->
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const blogPosts = [
        {
            title: 'Lorem Ipsum Post 1',
            date: '2023-05-01',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            url: '/blog/post1'
        },
        {
            title: 'Lorem Ipsum Post 2',
            date: '2023-05-15',
            excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            url: '/blog/post2'
        },
        // Add more blog posts here
    ];

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
</script>