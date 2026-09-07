import { Router } from 'express';
import { getAdminDashboardMetrics } from '../controllers/adminController.js';
import { getProblems } from '../controllers/problemController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
const router = Router();
router.get('/dashboard', getAdminDashboardMetrics);
router.get('/reports', authenticateToken, requireRole(['ADMIN', 'EVALUATOR']), getProblems);
router.get('/analytics', getAdminDashboardMetrics);
export default router;
