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
      xaxis: { title: 'Artist' },
      yaxis: { title: 'Listening Time (minutes)' },
    };
  
    Plotly.newPlot('topArtistsChart', [trace], layout);
  }
  
  function createTopTracksChart(data) {
    const trackNames = data.map(item => `${item.master_metadata_track_name} - ${item.master_metadata_album_artist_name}`);
    const playTime = data.map(item => item.total_ms_played / 60000); // Convert to minutes
  
    const trace = {
      x: playTime,
      y: trackNames,
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
    };
  
    Plotly.newPlot('topTracksChart', [trace], layout);
  }
  