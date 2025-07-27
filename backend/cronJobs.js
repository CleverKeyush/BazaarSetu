const cron = require('node-cron');
const { updateMandiPrices } = require('./routes/prices');

// Initialize cron jobs
const initializeCronJobs = () => {
  console.log('🚀 Initializing cron jobs...');

  // Update mandi prices every hour (0 minutes of every hour)
  cron.schedule('0 * * * *', async () => {
    console.log('⏰ Hourly mandi price update triggered');
    await updateMandiPrices();
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });

  // Update mandi prices every 5 minutes for demo purposes
  cron.schedule('*/5 * * * *', async () => {
    console.log('⏰ Demo: 5-minute mandi price update triggered');
    await updateMandiPrices();
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });

  // Daily market summary at 6 AM
  cron.schedule('0 6 * * *', async () => {
    console.log('📊 Daily market summary generation triggered');
    // In production, this could generate and send daily reports
    console.log('Daily market summary would be generated here');
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });

  // Weekly price trend analysis every Sunday at 8 AM
  cron.schedule('0 8 * * 0', async () => {
    console.log('📈 Weekly price trend analysis triggered');
    // In production, this could analyze weekly trends
    console.log('Weekly price trend analysis would be performed here');
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });

  console.log('✅ Cron jobs initialized successfully');
  console.log('📅 Scheduled jobs:');
  console.log('   - Mandi price updates: Every hour');
  console.log('   - Demo price updates: Every 5 minutes');
  console.log('   - Daily summary: 6:00 AM IST');
  console.log('   - Weekly analysis: Sunday 8:00 AM IST');
};

// Function to stop all cron jobs
const stopCronJobs = () => {
  cron.getTasks().forEach((task) => {
    task.stop();
  });
  console.log('🛑 All cron jobs stopped');
};

// Function to get cron job status
const getCronJobStatus = () => {
  const tasks = cron.getTasks();
  return {
    totalJobs: tasks.size,
    activeJobs: Array.from(tasks.values()).filter(task => task.running).length,
    jobs: Array.from(tasks.entries()).map(([name, task]) => ({
      name,
      running: task.running,
      scheduled: task.scheduled
    }))
  };
};

module.exports = {
  initializeCronJobs,
  stopCronJobs,
  getCronJobStatus
};