---
layout: default
title: My Blog
---

# Welcome to My Blog

Here you'll find my thoughts, experiences, and insights on various topics related to [your main blog topics, e.g., web development, data visualization, etc.].

<div id="blogPosts">
  <!-- Blog posts will be dynamically inserted here by JavaScript -->
  <p>Loading blog posts...</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const blogPostsContainer = document.getElementById('blogPosts');
  
  fetch('{{ site.baseurl }}/blog/posts.json')
    .then(response => response.json())
    .then(posts => {
      blogPostsContainer.innerHTML = ''; // Clear loading message
      posts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'blog-post mb-5';
        article.innerHTML = `
          <h2><a href="${post.url}">${post.title}</a></h2>
          <p class="text-muted">${post.date}</p>
          <p>${post.excerpt}</p>
          <a href="${post.url}" class="btn btn-outline-primary">Read More</a>
        `;
        blogPostsContainer.appendChild(article);
      });
    })
    .catch(error => {
      console.error('Error fetching blog posts:', error);
      blogPostsContainer.innerHTML = '<p>Error loading blog posts. Please try again later.</p>';
    });
});
</script>