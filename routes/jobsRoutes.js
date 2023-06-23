import {
  createJob,
  deleteJob,
  showAllJobs,
  showStats,
  updateJob,
} from '../controller/jobsController.js';
import express from 'express';

const router = express.Router();
router.route('/').post(createJob).get(showAllJobs);
router.route('/showStats').get(showStats);
router.route('/:id').delete(deleteJob).patch(updateJob);

export default router;
