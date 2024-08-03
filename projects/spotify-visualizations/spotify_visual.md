---
layout: default
title: Spotify Visuals
---

<div class="container mt-5">
        <h1>Spotify Visualizations</h1>
        <div class="mb-3">
            <label for="timeRange" class="form-label">Select Time Range:</label>
            <select class="form-select" id="timeRange">
                <option value="all_time">All Time</option>
                <option value="past_year">Past Year</option>
                <option value="past_6_months">Past 6 Months</option>
            </select>
        </div>
        <div id="topArtistsChart" class="chart-container"></div>
        <div id="topTracksChart" class="chart-container"></div>
        <div id="topResultsTable" class="table-container"></div>
    </div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="/Site/projects/spotify-visualizations/js/spotify-viz.js"></script>
</html>
