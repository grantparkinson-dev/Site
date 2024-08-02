Promise.all([
    fetch('https://grantparkinson-dev.github.io/Site/projects/spotify-visualizations/data/artist_summary.json').then(response => response.json()),
    fetch('https://grantparkinson-dev.github.io/Site/projects/spotify-visualizations/data/song_summary.json').then(response => response.json())
  ]).then(([artistSummary, songSummary]) => {
    // Sort artistSummary by total_ms_played in descending order and slice the top 10
    const sortedArtistSummary = artistSummary.sort((a, b) => b.total_ms_played - a.total_ms_played).slice(0, 10);
  
    // Sort songSummary by total_ms_played in descending order and slice the top 10
    const sortedSongSummary = songSummary.sort((a, b) => b.total_ms_played - a.total_ms_played).slice(0, 10);
  
    createTopArtistsChart(sortedArtistSummary);
    createTopTracksChart(sortedSongSummary);
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
      xaxis: {
        title: 'Artist',
        tickangle: window.innerWidth < 768 ? -90 : -45  // Rotate the x-axis labels based on screen size
      },
      yaxis: { title: 'Listening Time (minutes)' },
      margin: {
        l: 50,
        r: 30,
        b: window.innerWidth < 768 ? 200 : 150,  // Adjust the bottom margin based on screen size
        t: 50
      },
      responsive: true  // Ensure the chart is responsive
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
      }
    };
  
    const layout = {
      title: 'Top Tracks by Listening Time',
      xaxis: {
        title: 'Track',
        tickangle: window.innerWidth < 768 ? -90 : -45  // Rotate the x-axis labels based on screen size
      },
      yaxis: { title: 'Listening Time (minutes)' },
      margin: {
        l: 50,
        r: 30,
        b: window.innerWidth < 768 ? 200 : 150,  // Adjust the bottom margin based on screen size
        t: 50
      },
      responsive: true  // Ensure the chart is responsive
    };
  
    Plotly.newPlot('topTracksChart', [trace], layout);
  }
  
  // Redraw charts on window resize to adjust layout based on screen size
  window.onresize = () => {
    fetch('https://grantparkinson-dev.github.io/Site/projects/spotify-visualizations/data/artist_summary.json')
      .then(response => response.json())
      .then(artistSummary => {
        const sortedArtistSummary = artistSummary.sort((a, b) => b.total_ms_played - a.total_ms_played).slice(0, 10);
        createTopArtistsChart(sortedArtistSummary);
      });
  
    fetch('https://grantparkinson-dev.github.io/Site/projects/spotify-visualizations/data/song_summary.json')
      .then(response => response.json())
      .then(songSummary => {
        const sortedSongSummary = songSummary.sort((a, b) => b.total_ms_played - a.total_ms_played).slice(0, 10);
        createTopTracksChart(sortedSongSummary);
      });
  };
  