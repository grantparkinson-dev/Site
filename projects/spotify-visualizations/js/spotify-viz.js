Promise.all([
  fetch('https://grantparkinson-dev.github.io/Site/projects/spotify-visualizations/data/top_artists_data.json').then(response => response.json()),
  fetch('https://grantparkinson-dev.github.io/Site/projects/spotify-visualizations/data/top_tracks_data.json').then(response => response.json())
]).then(([artistsData, tracksData]) => {
  createTopArtistsChart(artistsData);
  createTopTracksChart(tracksData);
  createListeningTrendsChart(artistsData, tracksData);
});

function filterDataByTime(data, startTime, endTime) {
  return data.filter(item => {
    const timestamp = new Date(item.ts);
    return timestamp >= startTime && timestamp <= endTime;
  });
}

function createTopArtistsChart(data) {
  const artistNames = data.map(item => item.master_metadata_album_artist_name);
  const playTime = data.map(item => item.ms_played); // Already in minutes

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
  const playTime = data.map(item => item.ms_played); // Already in minutes

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
      title: 'Top 10 Tracks by Listening Time',
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

function createListeningTrendsChart(artistsData, tracksData) {
  const dates = artistsData.map(item => new Date(item.ts));
  const playTime = artistsData.map(item => item.ms_played); // Already in minutes

  const trace = {
      x: dates,
      y: playTime,
      type: 'scatter',
      mode: 'lines+markers',
      marker: {
          color: 'rgba(93, 164, 214, 0.7)'
      }
  };

  const layout = {
      title: 'Listening Trends Over Time',
      xaxis: { title: 'Date' },
      yaxis: { title: 'Listening Time (minutes)' },
      updatemenus: [{
          buttons: [
              {
                  method: 'restyle',
                  args: ['x', [dates]],
                  label: 'All Time'
              },
              {
                  method: 'restyle',
                  args: ['x', [dates.slice(-14)]], // Last 2 weeks
                  label: 'Last 2 Weeks'
              },
              {
                  method: 'restyle',
                  args: ['x', [dates.slice(-30)]], // Last month
                  label: 'Last Month'
              },
              {
                  method: 'restyle',
                  args: ['x', [dates.slice(-182)]], // Last 6 months
                  label: 'Last 6 Months'
              },
              {
                  method: 'restyle',
                  args: ['x', [dates.slice(-365)]], // Last year
                  label: 'Last Year'
              }
          ],
          direction: 'down',
          showactive: true
      }]
  };

  Plotly.newPlot('listeningTrendsChart', [trace], layout);
}