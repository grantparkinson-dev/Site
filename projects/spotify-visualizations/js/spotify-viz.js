// spotify-viz.js
Promise.all([
    fetch('https://grantparkinson-dev.github.io/Site/projects/spotify-visualizations/data/artist_summary.json').then(response => response.json()),
    fetch('https://grantparkinson-dev.github.io/Site/projects/spotify-visualizations/data/song_summary.json').then(response => response.json())
  ]).then(([artistSummary, songSummary]) => {
    createTopArtistsChart(artistSummary);
    createTopTracksChart(songSummary);
  });
  
  function createTopArtistsChart(data) {
    const artistNames = data.map(item => item.master_metadata_album_artist_name);
    const playTime = data.map(item => item.total_ms_played / 60000); // Convert to minutes
  
    const trace = {
        x: artistNames,
        y: playTime,
        type: 'bar',
        marker: {
            color: 'rgba(50, 171, 96, 0.7)'
        }
    };
  
    const layout = {
        title: 'Top Artists by Listening Time',
        xaxis: { title: 'Artist' },
        yaxis: { title: 'Listening Time (minutes)' },
        updatemenus: [{
            buttons: [
                {
                    method: 'restyle',
                    args: ['y', [playTime]],
                    label: 'All Time'
                },
                {
                    method: 'restyle',
                    args: ['y', [playTime.slice(0, 5)]],
                    label: 'Top 5'
                }
            ],
            direction: 'down',
            showactive: true
        }]
    };
  
    Plotly.newPlot('topArtistsChart', [trace], layout);
  }
  
  function createTopTracksChart(data) {
    const trackNames = data.map(item => `${item.master_metadata_track_name} - ${item.master_metadata_album_artist_name}`);
    const playTime = data.map(item => item.total_ms_played / 60000); // Convert to minutes
  
    const trace = {
        x: trackNames,
        y: playTime,
        type: 'bar',
        marker: {
            color: 'rgba(255, 153, 51, 0.7)'
        },
        orientation: 'h'
    };
  
    const layout = {
        title: 'Top Tracks by Listening Time',
        xaxis: { title: 'Listening Time (minutes)' },
        yaxis: { title: 'Track' },
        updatemenus: [{
            buttons: [
                {
                    method: 'restyle',
                    args: ['x', [playTime]],
                    label: 'All Time'
                },
                {
                    method: 'restyle',
                    args: ['x', [playTime.slice(0, 5)]],
                    label: 'Top 5'
                }
            ],
            direction: 'down',
            showactive: true
        }]
    };
  
    Plotly.newPlot('topTracksChart', [trace], layout);
  }
  