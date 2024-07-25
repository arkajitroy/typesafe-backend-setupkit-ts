import cluster from 'cluster';
import os from 'os';

const numCPUs = os.cpus().length;

const startWorker = () => {
  const worker = cluster.fork();
  worker.on('exit', (code, signal) => {
    if (signal) console.log(`Worker was killed by signal: ${signal}`);
    else if (code !== 0) console.log(`Worker exited with error code: ${code}`);
    else console.log('Worker success!');

    // Restart the worker
    startWorker();
  });
};

const startCluster = (startServer: () => void) => {
  if (cluster.isPrimary) {
    console.log(`Primary Process ${process.pid} is running`);

    // Fork Workers
    for (let i = 0; i < numCPUs; i++) {
      startWorker();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    startServer();
    console.log(`Worker ${process.pid} started`);
  }
};

export default startCluster;
