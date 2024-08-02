---
layout: default
title: My Projects
---

# My Projects

<div class="row" id="projectsList">
  <!-- This will be populated by JavaScript -->
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const projects = [
        {
            title: 'Spotify Visualizations',
            description: 'Interactive data visualizations of Spotify listening history.',
            image: '/img/project-thumbnails/spotify-viz.jpg',
            url: 'projects/spotify-visualizations/index.html',
            tags: ['Data Visualization', 'JavaScript', 'Spotify API']
        },
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
                    <div class="mb-2">
                        ${project.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
                    </div>
                    <a href="${project.url}" class="btn btn-primary">View Project</a>
                </div>
            </div>
        `;
        projectsList.appendChild(col);
    });
});
</script>