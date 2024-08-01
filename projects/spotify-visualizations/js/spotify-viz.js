Promise.all([
  fetch('https://grantparkinson-dev.github.io/Site/projects/spotify-visualizations/data/top_artists_data.json').then(response => response.json()),
  fetch('https://grantparkinson-dev.github.io/Site/projects/spotify-visualizations/data/top_tracks_data.json').then(response => response.json())
]).then(([artistsData, tracksData]) => {
  createTopArtistsChart(artistsData);
  createTopTracksChart(tracksData);
});

function createTopArtistsChart(data) {
  const artistNames = data.map(item => item.master_metadata_album_artist_name);
  const playTime = data.map(item => item.ms_played);

  const trace = {
      x: artistNames,
      y: playTime,
      type: 'bar',
      marker: {
          color: 'rgba(50, 171, 96, 0.7)'
      }
  };

  const layout = {
      title: 'Top 10 Artists by Listening Time',
      xaxis: { title: 'Artist' },
      yaxis: { title: 'Listening Time (minutes)' }
  };

  Plotly.newPlot('topArtistsChart', [trace], layout);
}

function createTopTracksChart(data) {
  const trackNames = data.map(item => `${item.master_metadata_track_name} - ${item.master_metadata_album_artist_name}`);
  const playTime = data.map(item => item.ms_played);

  const trace = {
      x: trackNames,
      y: playTime,
      type: 'bar',
      marker: {
          color: 'rgba(255, 153, 51, 0.7)'
      }
  };

  const layout = {
      title: 'Top 10 Tracks by Listening Time',
      xaxis: { 
          title: 'Track',
          tickangle: -45
      },
      yaxis: { title: 'Listening Time (minutes)' }
  };

  Plotly.newPlot('topTracksChart', [trace], layout);
}
