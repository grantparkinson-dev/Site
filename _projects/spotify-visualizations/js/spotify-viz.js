// Load data and create visualizations
Promise.all([
  fetch('data/top_artists_data.json').then(response => response.json()),
  fetch('data/top_tracks_data.json').then(response => response.json())
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







// Load your Spotify data
// fetch('data/spotify-data.json')
//   .then(response => response.json())
//   .then(data => {
//     // Create your visualizations using Plotly
//     // Example:
//     const topArtists = data.topArtists;
    
//     const trace = {
//       x: topArtists.map(artist => artist.name),
//       y: topArtists.map(artist => artist.playCount),
//       type: 'bar',
//       marker: {
//         color: '#1DB954'  // Spotify green
//       }
//     };

//     const layout = {
//       title: 'Top Artists by Play Count',
//       paper_bgcolor: '#121212',  // Dark background
//       plot_bgcolor: '#121212',
//       font: {
//         color: '#ffffff'  // White text
//       },
//       xaxis: {
//         title: 'Artist',
//         tickangle: -45
//       },
//       yaxis: {
//         title: 'Play Count'
//       }
//     };

//     Plotly.newPlot('spotifyCharts', [trace], layout);
//   });

// // Add more visualization code as needed



// document.addEventListener('DOMContentLoaded', function() {
//   // Load visualization data
//   Promise.all([
//       fetch('data/viz1_data.json').then(response => response.json()),
//       fetch('data/viz2_data.json').then(response => response.json()),
//       // Add more fetch calls for additional visualizations
//   ]).then(([viz1Data, viz2Data]) => {
//       // Parse the JSON strings into Plotly figure objects
//       const viz1Figure = JSON.parse(viz1Data);
//       const viz2Figure = JSON.parse(viz2Data);

//       // Render visualizations
//       Plotly.newPlot('viz1', viz1Figure.data, viz1Figure.layout);
//       Plotly.newPlot('viz2', viz2Figure.data, viz2Figure.layout);

//       // Implement time selection functionality
//       setupTimeSelector([viz1Figure, viz2Figure]);
//   });
// });

// function setupTimeSelector(figures) {
//   // Implement your time selection logic here
//   // This function should update the visualizations based on the selected time range
// }