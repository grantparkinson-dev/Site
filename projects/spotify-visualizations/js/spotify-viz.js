














const timeRangeSelect = document.getElementById('timeRange');

timeRangeSelect.addEventListener('change', (event) => {
  const timeRange = event.target.value;
  loadAndCreateCharts(timeRange);
});

function loadAndCreateCharts(timeRange) {
  Promise.all([
    fetch(`https://grantparkinson-dev.github.io/Site/projects/spotify-visualizations/data/artist_summary_${timeRange}.json`).then(response => response.json()),
    fetch(`https://grantparkinson-dev.github.io/Site/projects/spotify-visualizations/data/song_summary_${timeRange}.json`).then(response => response.json())
  ]).then(([artistSummary, songSummary]) => {
    // Sort artistSummary by total_ms_played in descending order and slice the top 10
    const sortedArtistSummary = artistSummary.sort((a, b) => b.total_ms_played - a.total_ms_played).slice(0, 10);
  
    // Sort songSummary by total_ms_played in descending order and slice the top 10
    const sortedSongSummary = songSummary.sort((a, b) => b.total_ms_played - a.total_ms_played).slice(0, 10);
    
    // Sort songSummary by total_ms_played in descending order and slice the top 150 for table
    const sortedSongSummaryTable = songSummary.sort((a, b) => b.total_ms_played - a.total_ms_played).slice(0, 150);
  
    createTopArtistsChart(sortedArtistSummary, timeRange);
    createTopTracksChart(sortedSongSummary, timeRange);
    createTopResultsTable(sortedSongSummaryTable);
  });
}

function createTopArtistsChart(data, timeRange) {
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
    title: `Top Artists by Listening Time (${timeRange.replace('_', ' ').toUpperCase()})`,
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

function createTopTracksChart(data, timeRange) {
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
    title: `Top Tracks by Listening Time (${timeRange.replace('_', ' ').toUpperCase()})`,
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


function updateChartColors(layout) {
  const isDarkMode = document.body.classList.contains('dark-mode');
  layout.paper_bgcolor = isDarkMode ? 'rgba(18, 18, 18, 0.1)' : 'rgba(255, 255, 255, 0.1)';
  layout.plot_bgcolor = isDarkMode ? 'rgba(18, 18, 18, 0.1)' : 'rgba(255, 255, 255, 0.1)';
  layout.font = { color: isDarkMode ? '#ffffff' : '#333333' };
  layout.xaxis.gridcolor = isDarkMode ? '#535353' : '#e0e0e0';
  layout.yaxis.gridcolor = isDarkMode ? '#535353' : '#e0e0e0';
}

updateChartColors(layout);

function createTopResultsTable(data) {
    const trackNames = data.map(item => item.master_metadata_track_name);
    const artistNames = data.map(item => item.master_metadata_album_artist_name);
    const playTime = data.map(item => Math.round(item.total_ms_played / 60000)); // Convert to minutes and round to nearest integer
    const totalPlays = data.map(item => item.total_plays);
    const isDarkMode = document.body.classList.contains('dark-mode');
    const headerColor = isDarkMode ? '#535353' : 'grey';
    const cellColor = isDarkMode ? 
      ['rgba(83, 83, 83, 0.65)', 'rgba(66, 66, 66, 0.65)'] : 
      ['rgba(228, 222, 249, 0.65)', 'rgba(222, 235, 247, 0.65)'];
    const fontColor = isDarkMode ? 'white' : 'black';
    
    const trace = {
      type: 'table',
      header: {
        values: [["<b>Track Name</b>"], ["<b>Artist Name</b>"], ["<b>Listening Time (minutes)</b>"], ["<b>Total Plays</b>"]],
        align: "center",
        line: { width: 1, color: 'black' },
        fill: { color: "grey" },
        font: { family: "Arial", size: 12, color: "white" }
      },
      cells: {
        values: [trackNames, artistNames, playTime, totalPlays],
        align: "center",
        line: { color: "black", width: 1 },
        fill: { color: ['rgba(228, 222, 249, 0.65)', 'rgba(222, 235, 247, 0.65)'] },
        font: { family: "Arial", size: 11, color: ["black"] }
      }
    };
  
    const layout = {
      title: 'Top 150 Tracks',
      responsive: true  // Ensure the table is responsive
    };
  
    Plotly.newPlot('topResultsTable', [trace], layout);
  }

// Initial load with default time range

function redrawCharts() {
  const timeRange = document.getElementById('timeRange').value;
  loadAndCreateCharts(timeRange);
}
// Redraw charts on window resize to adjust layout based on screen size
window.onresize = () => {
  loadAndCreateCharts(timeRangeSelect.value);
};
const darkModeObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      redrawCharts();
    }
  });
});

darkModeObserver.observe(document.body, {
  attributes: true,
  attributeFilter: ['class']
});
loadAndCreateCharts('all_time');
