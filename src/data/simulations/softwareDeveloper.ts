import { SimulationScenario } from '@/types/simulation';

export const softwareDeveloperSimulation: SimulationScenario = {
  id: 'software-developer',
  careerTitle: 'Software Developer',
  roleTitle: 'Junior Software Developer',
  scenarioTitle: 'College Portal Outage',
  badge: 'Technical & Engineering',
  estimatedTime: '3–5 min',
  shortDescription: 'Investigate a real production issue, identify the root cause, and decide how to restore the system.',
  fullOverview:
    'It is 9:15 AM on Monday during exam registration week. 2,300 students are unable to log into the College Student Portal. The Engineering Team Lead leaves you a message: "The auth service is failing and students are getting 504 errors. Investigate the system metrics, find the root cause, and execute a fix."',
  whatYouWillDo: [
    'Inspect live application logs, database connection pools, and deployment history.',
    'Correlate system metric spikes with recent code deployments.',
    'Formulate a diagnostic hypothesis based on empirical evidence.',
    'Choose the best operational action to restore portal availability.',
    'Explain your technical reasoning and assess confidence.',
  ],
  skillsObserved: [
    'Problem Solving',
    'Logical Thinking',
    'Technical Reasoning',
    'Decision Making',
  ],
  iconName: 'Code',
  themeColor: {
    primary: '#1677FF',
    border: 'rgba(22, 119, 255, 0.25)',
    bgSoft: '#F0F7FF',
    accent: '#0958D9',
  },
  defaultSkills: [
    { name: 'Problem Solving', baseScore: 85 },
    { name: 'Logical Thinking', baseScore: 80 },
    { name: 'Technical Reasoning', baseScore: 88 },
    { name: 'Decision Making', baseScore: 82 },
    { name: 'Communication', baseScore: 78 },
  ],
  stages: [
    {
      id: 'stage-1-investigate',
      stageNumber: 1,
      stageName: '01 Investigate',
      shortName: 'Investigate',
      objective: 'Gather clues by inspecting system tools and telemetry.',
      description: 'Explore the developer tools to find where the breakdown is occurring.',
      availableTools: [
        {
          id: 'tool-logs',
          name: 'Application Logs',
          iconName: 'FileText',
          category: 'Telemetry',
          description: 'Live log stream from Auth Service and API Gateways.',
          badgeText: 'CRITICAL WARNING',
          payload: {
            title: 'AUTH-SERVICE LOG TAIL (Last 5 mins)',
            subtitle: 'Node Cluster: auth-prod-asia-south1',
            logs: [
              { timestamp: '09:14:02', level: 'INFO', message: 'API Gateway forwarding /api/v1/auth/login requests' },
              { timestamp: '09:14:15', level: 'WARN', message: 'DB Connection Pool high utilization: 48/50 active connections' },
              { timestamp: '09:14:30', level: 'ERROR', message: 'DB Connection Pool Exhausted. Timeout waiting for connection (5000ms)', details: 'at Pool.acquire (pool.js:142)' },
              { timestamp: '09:14:48', level: 'ERROR', message: 'HTTP 504 Gateway Timeout returned to client', details: 'User ID: 19482 connection dropped' },
              { timestamp: '09:15:00', level: 'ERROR', message: 'Avg query execution time: 4,800ms (Normal baseline: 320ms)', details: 'Query: SELECT * FROM users JOIN student_registrations...' },
            ],
            metrics: [
              { label: 'Active Pool Connections', value: '50 / 50', status: 'danger', trend: 'up' },
              { label: 'Avg Query Duration', value: '4.8s', status: 'danger', trend: 'up' },
              { label: 'Error Rate', value: '94.2%', status: 'danger', trend: 'up' },
            ],
          },
        },
        {
          id: 'tool-deployments',
          name: 'Recent Deployments',
          iconName: 'GitCommit',
          category: 'Release History',
          description: 'Git release logs and production build history.',
          badgeText: 'Updated 18m ago',
          payload: {
            title: 'PRODUCTION DEPLOYMENT LOGS',
            subtitle: 'Repository: college-portal-backend',
            logs: [
              { timestamp: '08:57:00 (18m ago)', level: 'INFO', message: 'RELEASE v2.4.2 Deployed to Production', details: 'Commit #a8f3b92 by @dev_sanjay: "Optimize student search query & join filters"' },
              { timestamp: '08:30:00 (45m ago)', level: 'INFO', message: 'RELEASE v2.4.1 Deployed to Staging - All green', details: 'Passed 142 automated unit & integration tests' },
              { timestamp: 'Yesterday', level: 'INFO', message: 'RELEASE v2.4.0 Deployed', details: 'Standard weekly maintenance release' },
            ],
            rawText: `Commit #a8f3b92 Diff:
- SELECT id, name FROM users WHERE role = 'student';
+ SELECT users.*, registrations.*, exams.* FROM users 
+ LEFT JOIN registrations ON users.id = registrations.student_id 
+ LEFT JOIN exams ON registrations.exam_id = exams.id 
+ WHERE users.status = 'ACTIVE'; -- Missing index on registrations.student_id!`,
          },
        },
        {
          id: 'tool-database',
          name: 'Database Telemetry',
          iconName: 'Database',
          category: 'Infrastructure',
          description: 'PostgreSQL metrics, connection count, and query latency.',
          badgeText: 'High CPU',
          payload: {
            title: 'POSTGRES DB METRICS — INSTANCE db-primary-01',
            metrics: [
              { label: 'DB CPU Utilization', value: '99.4%', status: 'danger', trend: 'up' },
              { label: 'Sequential Table Scans', value: '14,200/sec', status: 'warning', trend: 'up' },
              { label: 'Connection Pool Limit', value: '50 max', status: 'warning' },
              { label: 'Lock Wait Time', value: '3,410ms', status: 'danger', trend: 'up' },
            ],
            tableData: {
              headers: ['Query Signature', 'Execution Time', 'Calls/min', 'Scan Type'],
              rows: [
                ['SELECT * FROM users LEFT JOIN registrations...', '2,800ms', '420', 'Seq Scan (Unindexed)'],
                ['SELECT * FROM sessions WHERE token = ?', '12ms', '1,800', 'Index Scan (Fast)'],
                ['UPDATE users SET last_login = NOW()', '45ms', '350', 'Index Scan (Fast)'],
              ],
            },
          },
        },
        {
          id: 'tool-network',
          name: 'Network Traffic',
          iconName: 'Activity',
          category: 'Network',
          description: 'Ingress traffic, DNS query response time, DDoS protection state.',
          badgeText: 'Traffic Normal',
          payload: {
            title: 'CLOUDFLARE INGRESS & NETWORK MONITOR',
            metrics: [
              { label: 'Ingress Requests', value: '210 req/s', status: 'success', trend: 'neutral' },
              { label: 'DDoS Attack Status', value: 'No Attack Detected', status: 'success' },
              { label: 'Bandwidth Utilization', value: '14.2 Mbps', status: 'success' },
              { label: 'Edge Latency', value: '18ms', status: 'success' },
            ],
            rawText: 'Network traffic is stable and within expected baseline limits for Monday morning (200-250 req/s). No volumetric surge or malicious IP traffic detected.',
          },
        },
      ],
      requiresReasoning: false,
    },
    {
      id: 'stage-2-diagnose',
      stageNumber: 2,
      stageName: '02 Diagnose',
      shortName: 'Diagnose',
      objective: 'Formulate the root cause based on your findings.',
      description: 'You have inspected system evidence. What is causing the connection pool exhaustion?',
      availableTools: [
        {
          id: 'tool-logs',
          name: 'Application Logs',
          iconName: 'FileText',
          category: 'Telemetry',
          description: 'Live log stream from Auth Service.',
          payload: {
            title: 'AUTH-SERVICE LOG TAIL (Active)',
            metrics: [{ label: 'Status', value: 'Exhausted (50/50)', status: 'danger' }],
          },
        },
        {
          id: 'tool-deployments',
          name: 'Recent Deployments',
          iconName: 'GitCommit',
          category: 'Release History',
          description: 'Git release logs.',
          payload: {
            title: 'RELEASE v2.4.2 (18 mins ago)',
            rawText: 'Unindexed 3-way SQL JOIN added in v2.4.2 auth login path causing 2.8s queries.',
          },
        },
      ],
      availableActions: [
        {
          id: 'action-rollback',
          label: 'Rollback Deployment to v2.4.1',
          description: 'Revert production code to the stable v2.4.1 build deployed yesterday before the query change.',
          outcomeQuality: 'optimal',
          consequenceTitle: 'Portal Fully Restored! 🎉',
          consequenceText:
            'Rolling back v2.4.2 removed the unindexed SQL join from the login pathway. Query execution times dropped from 2,800ms back to 320ms. The database connection pool instantly freed up 45 idle connections, and all 2,300 students logged in successfully.',
          keyTakeaway:
            'Correlation with release timestamps revealed that a recent code change—not load or infra failure—caused the issue. Reverting introduced code is the fastest MTTR (Mean Time to Resolution).',
          scoreImpact: {
            problemSolving: 95,
            logicalThinking: 92,
            evidenceEvaluation: 96,
            riskAssessment: 90,
            communication: 85,
          },
        },
        {
          id: 'action-scale-db',
          label: 'Increase Database Connection Pool to 150',
          description: 'Raise max allowed connections in PostgreSQL configuration file without modifying code.',
          outcomeQuality: 'suboptimal',
          consequenceTitle: 'Temporary Relief, Underlying Query Issue Remains ⚠️',
          consequenceText:
            'Increasing pool limit to 150 allows more incoming login requests to open DB threads, temporarily lowering HTTP 504 errors. However, because each unindexed query takes 2.8 seconds, DB CPU remains pegged at 99%, causing severe slowness across all other portal pages.',
          keyTakeaway:
            'Scaling infrastructure capacity masks the symptom without fixing the underlying inefficient software query.',
          scoreImpact: {
            problemSolving: 70,
            logicalThinking: 68,
            evidenceEvaluation: 72,
            riskAssessment: 65,
            communication: 70,
          },
        },
        {
          id: 'action-restart-auth',
          label: 'Restart Authentication Microservice',
          description: 'Perform a full system reboot of the Auth Service container cluster.',
          outcomeQuality: 'poor',
          consequenceTitle: 'Outage Recurred Immediately ❌',
          consequenceText:
            'Restarting the service cleared active connections for 45 seconds. However, as thousands of queued students retried logging in, the slow v2.4.2 query re-filled the 50 connection slots within 90 seconds, causing immediate 504 errors again.',
          keyTakeaway:
            'Restarting a service without addressing root cause only provides brief placebo relief for stateful DB pool exhaustion.',
          scoreImpact: {
            problemSolving: 45,
            logicalThinking: 50,
            evidenceEvaluation: 48,
            riskAssessment: 40,
            communication: 60,
          },
        },
      ],
      requiresReasoning: true,
      reasoningPrompt: 'Why did you select this diagnostic action? Explain what telemetry clues (logs, commit history, DB metrics) guided your choice.',
    },
    {
      id: 'stage-3-resolve',
      stageNumber: 3,
      stageName: '03 Resolve',
      shortName: 'Resolve',
      objective: 'Review system resolution state and confirm post-fix stability.',
      description: 'Review the outcome of your chosen action and finalize your engineering report.',
      availableTools: [],
      requiresReasoning: false,
    },
  ],
};
