import { SimulationScenario } from '@/types/simulation';

export const financialAnalystSimulation: SimulationScenario = {
  id: 'financial-analyst',
  careerTitle: 'Financial Analyst',
  roleTitle: 'Junior Financial Analyst',
  scenarioTitle: 'Where Did the Profit Go?',
  badge: 'Business & Finance',
  estimatedTime: '3–5 min',
  shortDescription: 'Analyze business data, identify what caused the profit drop, and recommend the best strategic action.',
  fullOverview:
    'Shree Foods, a regional snack manufacturer in Maharashtra, recorded monthly revenue of ₹18.4L (stable), yet net profit plummeted 38% from ₹4.03L down to ₹2.5L. The Chief Financial Officer asks you: "Revenue is holding steady, but our bottom line is hemorrhaging cash. Dig into the financials, spot where margin erosion is happening, and recommend a corrective strategy."',
  whatYouWillDo: [
    'Analyze P&L statements, product revenue lines, expense breakdowns, and regional branch margins.',
    'Isolate cost anomalies vs revenue trends across operations.',
    'Identify trade-offs between pricing, transport logistics, and marketing spend.',
    'Recommend an actionable financial intervention to restore 20%+ net profit margin.',
    'Provide business rationale for your strategic recommendation.',
  ],
  skillsObserved: [
    'Analytical Thinking',
    'Pattern Recognition',
    'Financial Reasoning',
    'Risk Assessment',
  ],
  iconName: 'BarChart3',
  themeColor: {
    primary: '#D97706',
    border: 'rgba(217, 119, 6, 0.25)',
    bgSoft: '#FFFBEB',
    accent: '#B45309',
  },
  defaultSkills: [
    { name: 'Analytical Thinking', baseScore: 90 },
    { name: 'Pattern Recognition', baseScore: 86 },
    { name: 'Financial Reasoning', baseScore: 84 },
    { name: 'Risk Assessment', baseScore: 82 },
    { name: 'Communication', baseScore: 80 },
  ],
  stages: [
    {
      id: 'stage-1-investigate',
      stageNumber: 1,
      stageName: '01 Investigate',
      shortName: 'Investigate',
      objective: 'Inspect financial statements and branch metrics to isolate profit leaks.',
      description: 'Click on financial tools to analyze revenue, expense items, and regional data.',
      availableTools: [
        {
          id: 'tool-expenses',
          name: 'Expense Breakdown',
          iconName: 'PieChart',
          category: 'P&L Statement',
          description: 'Detailed operational cost categories for the current month.',
          badgeText: '+14% Total Cost',
          payload: {
            title: 'OPERATIONAL EXPENSE AUDIT (Current Month: ₹15.9L)',
            subtitle: 'Compared against Q2 Baseline (₹13.9L)',
            metrics: [
              { label: 'Total Operating Expenses', value: '₹15.9L', status: 'danger', trend: 'up' },
              { label: 'Net Profit Margin', value: '13.5% (was 21.9%)', status: 'danger', trend: 'down' },
              { label: 'Transport & Freight Cost', value: '₹3.8L (+31%)', status: 'danger', trend: 'up' },
            ],
            tableData: {
              headers: ['Expense Category', 'Current (₹)', 'Previous (₹)', 'Variance %', 'Status'],
              rows: [
                ['Logistics & Freight', '₹3,80,000', '₹2,90,000', '+31.0%', '🔴 Critical Spike'],
                ['Raw Materials (Flour/Oil)', '₹7,20,000', '₹6,10,000', '+18.0%', '🟡 Volume Impact'],
                ['Marketing & Ads', '₹1,50,000', '₹1,47,000', '+2.0%', '🟢 Normal'],
                ['Staff Salaries', '₹3,40,000', '₹3,27,000', '+4.0%', '🟢 Normal'],
              ],
            },
          },
        },
        {
          id: 'tool-sales',
          name: 'Sales Performance',
          iconName: 'TrendingUp',
          category: 'Revenue Analytics',
          description: 'Product-wise revenue, units sold, and average selling price.',
          badgeText: 'Revenue Stable',
          payload: {
            title: 'PRODUCT LINE REVENUE SUMMARY (Total ₹18.4L)',
            metrics: [
              { label: 'Total Gross Revenue', value: '₹18.4L', status: 'success', trend: 'neutral' },
              { label: 'Overall Unit Volume', value: '142,000 units', status: 'success' },
            ],
            chartData: [
              { label: 'Product A (Sev Puri Pack)', value: 820000, change: '+4.0%', highlight: true },
              { label: 'Product B (Bhujia 500g)', value: 610000, change: '-2.0%' },
              { label: 'Product C (Chakli 200g)', value: 410000, change: '+1.0%' },
            ],
            rawText: 'Sales volume across key SKUs is healthy. Product A saw strong +4% demand in urban centers. Top-line revenue drop is NOT the cause of the ₹1.53L profit loss.',
          },
        },
        {
          id: 'tool-regions',
          name: 'Regional Branch Audit',
          iconName: 'MapPin',
          category: 'Geography',
          description: 'Revenue, delivery costs, and profit margin per regional district.',
          badgeText: 'Nagpur Alert',
          payload: {
            title: 'REGIONAL DISTRIBUTION PERFORMANCE',
            tableData: {
              headers: ['Region', 'Revenue (₹)', 'Transport Cost (₹)', 'Sales Growth', 'Freight/Unit'],
              rows: [
                ['Mumbai Metro', '₹8,50,000', '₹1,10,000', '+5.0%', '₹1.29'],
                ['Pune Region', '₹5,20,000', '₹85,000', '+2.0%', '₹1.63'],
                ['Nashik Hub', '₹2,80,000', '₹55,000', '-3.0%', '₹1.96'],
                ['Nagpur Outlet', '₹1,90,000', '₹1,30,000', '-27.0%', '₹6.84 ⚠️'],
              ],
            },
            rawText: 'CRITICAL DISCOVERY: Nagpur branch transport cost surged to ₹6.84 per unit (85% freight-to-revenue ratio!). Investigation shows a temporary highway closure forced emergency expedited air/third-party freight to Nagpur.',
          },
        },
        {
          id: 'tool-inventory',
          name: 'Inventory & Storage',
          iconName: 'Package',
          category: 'Supply Chain',
          description: 'Warehouse holding costs, spoilage rates, and stock turnover.',
          badgeText: 'Normal Holding',
          payload: {
            title: 'WAREHOUSE & STORAGE COST REPORT',
            metrics: [
              { label: 'Spoilage Rate', value: '0.4%', status: 'success' },
              { label: 'Warehouse Rent', value: '₹85,000', status: 'success' },
              { label: 'Stock Turnover Days', value: '14 Days', status: 'success' },
            ],
            rawText: 'Storage and inventory holding metrics are strictly within standard 15-day targets. No stock loss or elevated storage penalties observed.',
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
      objective: 'Formulate a profit-recovery recommendation based on empirical cost data.',
      description: 'You identified that transport freight costs (especially Nagpur emergency routes) caused a ₹1.53L profit erosion. Select your recommended strategy.',
      availableTools: [
        {
          id: 'tool-expenses',
          name: 'Expense Breakdown',
          iconName: 'PieChart',
          category: 'P&L Statement',
          description: 'Operational cost summary.',
          payload: {
            title: 'FREIGHT SPIKE CONFIRMED',
            metrics: [{ label: 'Logistics Surge', value: '₹3.8L (+31%)', status: 'danger' }],
          },
        },
        {
          id: 'tool-regions',
          name: 'Regional Branch Audit',
          iconName: 'MapPin',
          category: 'Geography',
          description: 'Nagpur freight cost: ₹6.84/unit.',
          payload: {
            title: 'NAGPUR FREIGHT ANOMALY',
            rawText: 'Nagpur route emergency freight consumed ₹1.3L in transport against ₹1.9L revenue.',
          },
        },
      ],
      availableActions: [
        {
          id: 'action-renegotiate-logistics',
          label: 'Renegotiate Logistics Partner & Route Consolidation for Nagpur',
          description: 'Transition Nagpur shipping from emergency spot-rates to consolidated rail/road contract routing, saving ₹1.2L/month in freight.',
          outcomeQuality: 'optimal',
          consequenceTitle: 'Profit Recovered to 21.2% Margin! 📈',
          consequenceText:
            'Consolidating shipments via weekly rail freight reduced Nagpur logistics cost from ₹6.84/unit down to ₹1.85/unit. Monthly transport expenditure fell by ₹1.25L, immediately restoring net profit from ₹2.5L back up to ₹3.75L without raising product prices or sacrificing sales growth.',
          keyTakeaway:
            'Targeting the specific line-item operational anomaly (freight surge) fixed the profit leak directly without damaging top-line customer demand.',
          scoreImpact: {
            problemSolving: 96,
            logicalThinking: 94,
            evidenceEvaluation: 95,
            riskAssessment: 90,
            communication: 88,
          },
        },
        {
          id: 'action-raise-prices',
          label: 'Increase Product Prices by 8% Across All SKUs',
          description: 'Pass the increased costs to consumers to boost overall gross margin.',
          outcomeQuality: 'suboptimal',
          consequenceTitle: 'Short-term Revenue Bump, Long-term Customer Churn ⚠️',
          consequenceText:
            'An 8% price hike generated ₹1.47L in initial revenue boost. However, price-sensitive rural snack consumers reduced purchase frequency by 12% over the next 4 weeks. Overall volume dropped, and the underlying ₹3.8L transport inefficiency remained unfixed.',
          keyTakeaway:
            'Passing internal operational inefficiencies onto customers creates competitive risk and reduces total market share.',
          scoreImpact: {
            problemSolving: 68,
            logicalThinking: 70,
            evidenceEvaluation: 65,
            riskAssessment: 60,
            communication: 72,
          },
        },
        {
          id: 'action-cut-marketing',
          label: 'Cut Marketing Budget by 50%',
          description: 'Reduce monthly promotional expenditure from ₹1.5L to ₹75k.',
          outcomeQuality: 'poor',
          consequenceTitle: 'Failed to Fix Main Cost Driver & Damaged Growth Pipeline ❌',
          consequenceText:
            'Halving marketing saved ₹75,000, but did not address the ₹1.53L logistics hemorrhage. Worse, brand visibility dropped in Mumbai and Pune, resulting in a 6% drop in new store placements next month.',
          keyTakeaway:
            'Arbitrarily cutting growth investments (marketing) to cover operational waste hurts future earning capacity.',
          scoreImpact: {
            problemSolving: 48,
            logicalThinking: 52,
            evidenceEvaluation: 45,
            riskAssessment: 42,
            communication: 65,
          },
        },
      ],
      requiresReasoning: true,
      reasoningPrompt: 'Explain your financial reasoning. Why did you target this specific cost line-item or strategy over the alternatives?',
    },
    {
      id: 'stage-3-resolve',
      stageNumber: 3,
      stageName: '03 Resolve',
      shortName: 'Resolve',
      objective: 'Review financial outcome and post-intervention margin status.',
      description: 'Review the impact of your recommendation on Shree Foods profit margin.',
      availableTools: [],
      requiresReasoning: false,
    },
  ],
};
