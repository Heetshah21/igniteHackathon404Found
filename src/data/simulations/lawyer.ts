import { SimulationScenario } from '@/types/simulation';

export const lawyerSimulation: SimulationScenario = {
  id: 'lawyer',
  careerTitle: 'Lawyer',
  roleTitle: 'Junior Legal Associate',
  scenarioTitle: 'Build the Strongest Case',
  badge: 'Legal & Compliance',
  estimatedTime: '3–5 min',
  shortDescription: 'Examine evidence, identify key facts, and build the strongest legal argument for your client.',
  fullOverview:
    'Case #2048: Apex Electronics is being sued before the Consumer Disputes Redressal Forum by customer Rajesh Kumar. The customer claims Apex wrongfully rejected a ₹65,000 laptop warranty claim for a device that stopped working 2 days after purchase. Senior Partner Meera Sharma asks you: "Review the case dossier, cross-examine the evidence documents, and construct our strongest legal defense strategy."',
  whatYouWillDo: [
    'Examine customer claims, technician reports, warranty terms, and email records.',
    'Identify key contradictions and factual admissions in documented evidence.',
    'Evaluate admissibility and legal strength of Clause exclusions.',
    'Construct an airtight argument to defend Apex Electronics against unfair trade claim.',
    'Summarize your legal reasoning and risk confidence.',
  ],
  skillsObserved: [
    'Critical Thinking',
    'Evidence Evaluation',
    'Argumentation',
    'Communication',
  ],
  iconName: 'Scale',
  themeColor: {
    primary: '#7C3AED',
    border: 'rgba(124, 58, 237, 0.25)',
    bgSoft: '#F5F3FF',
    accent: '#6D28D9',
  },
  defaultSkills: [
    { name: 'Critical Thinking', baseScore: 92 },
    { name: 'Evidence Evaluation', baseScore: 89 },
    { name: 'Argumentation', baseScore: 87 },
    { name: 'Communication', baseScore: 84 },
    { name: 'Decision Making', baseScore: 81 },
  ],
  stages: [
    {
      id: 'stage-1-investigate',
      stageNumber: 1,
      stageName: '01 Investigate',
      shortName: 'Investigate',
      objective: 'Cross-examine case files to discover critical legal facts.',
      description: 'Open the legal dossier files to review statements, contracts, and technical inspections.',
      availableTools: [
        {
          id: 'tool-customer-statement',
          name: 'Customer Complaint',
          iconName: 'UserCheck',
          category: 'Consumer Claim',
          description: 'Official legal notice filed by customer Rajesh Kumar.',
          badgeText: 'Claimant Notice',
          payload: {
            title: 'DISTRICT CONSUMER FORUM NOTICE — CASE #2048',
            subtitle: 'Claimant: Rajesh Kumar vs. Apex Electronics Pvt Ltd',
            documentContent: {
              author: 'Rajesh Kumar (Claimant)',
              date: 'Oct 18',
              sections: [
                { heading: '1. Fact of Purchase', body: 'Purchased Apex ProBook 15 on Oct 12 for ₹65,000 (Invoice #INV-8812).' },
                { heading: '2. Alleged Defect', body: 'On Oct 14, device suddenly failed to power on. Device was handled with extreme care and kept on desk at all times.' },
                { heading: '3. Wrongful Denial', body: 'Apex service center rejected warranty replacement on Oct 16 claiming "customer damage". I never spilled liquid or damaged the unit. Demanding full refund + ₹50,000 compensation for harassment.' },
              ],
            },
          },
        },
        {
          id: 'tool-tech-report',
          name: 'Technician Inspection',
          iconName: 'FileCheck',
          category: 'Forensic Evidence',
          description: 'Official diagnostic report from Certified Hardware Engineer.',
          badgeText: 'Physical Drop Found',
          payload: {
            title: 'APEX SERVICE CENTER — FORENSIC TECHNICAL REPORT',
            subtitle: 'Device Serial: LP-9081-XP | Lead Tech: A. Deshmukh',
            metrics: [
              { label: 'Exterior Inspection', value: 'Severe Drop Impact Dent', status: 'danger' },
              { label: 'Motherboard Status', value: 'Fractured PCB Trace', status: 'danger' },
              { label: 'Liquid Sensor Test', value: 'NEGATIVE (Clean)', status: 'success' },
            ],
            documentContent: {
              sections: [
                { heading: 'Physical Damage Findings', body: 'Deep 4mm corner dent and chassis fracture near power port consistent with high-velocity floor drop impact.', highlighted: true },
                { heading: 'Internal Circuit Diagnostics', body: 'Motherboard multi-layer copper trace is physically severed directly underlying the exterior corner dent.' },
                { heading: 'Moisture/Liquid Test', body: 'Internal liquid contact indicators (LCI) remain white/clean. NO liquid ingress detected.' },
              ],
            },
          },
        },
        {
          id: 'tool-emails',
          name: 'Customer Email History',
          iconName: 'Mail',
          category: 'Pre-litigation Records',
          description: 'Support ticket emails prior to legal notice.',
          badgeText: 'Direct Admission',
          payload: {
            title: 'SUPPORT TICKET EMAIL ARCHIVE — TICKET #88391',
            documentContent: {
              author: 'rajesh.k***@gmail.com',
              date: 'Oct 13, 11:42 PM',
              sections: [
                {
                  heading: 'Email Subject: Help! Laptop dropped off table',
                  body: '"Hi Support, my toddler accidentally pulled the charging cord and knocked the laptop off our dining table onto the concrete floor tonight. It has a dent near the port and won\'t turn on. Will warranty cover this repair or replacement?"',
                  highlighted: true,
                },
                {
                  heading: 'Support Response (Oct 14, 09:00 AM)',
                  body: '"Dear Rajesh, warranty terms cover manufacturing defects but exclude physical drop impact damage per Clause 4.2. Please bring the unit to our service center for inspection."',
                },
              ],
            },
          },
        },
        {
          id: 'tool-warranty-contract',
          name: 'Warranty Agreement',
          iconName: 'FileText',
          category: 'Legal Contract',
          description: 'Standard 1-Year Limited Hardware Warranty Terms.',
          badgeText: 'Clause 4.2',
          payload: {
            title: 'APEX ELECTRONICS — LIMITED WARRANTY TERMS & CONDITIONS',
            documentContent: {
              sections: [
                { heading: 'Section 2.1 Coverage Scope', body: 'Apex Electronics warrants that the hardware product is free from defects in materials and workmanship under normal consumer use for 12 months.' },
                { heading: 'Clause 4.2 Specific Exclusions', body: 'This warranty DOES NOT apply to: (a) damage caused by accident, abuse, misuse, drop impact, fire, or earthquake; (b) damage caused by operating outside permitted uses; (c) cosmetic damage including dents, scratches, and broken plastic ports.', highlighted: true },
              ],
            },
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
      objective: 'Evaluate evidence strength and choose legal defense strategy.',
      description: 'You discovered the customer sent an email admitting their toddler dropped the laptop on concrete, matching the technician report. Select the legal strategy.',
      availableTools: [
        {
          id: 'tool-tech-report',
          name: 'Technician Inspection',
          iconName: 'FileCheck',
          category: 'Forensic Evidence',
          description: 'Forensic drop damage report.',
          payload: {
            title: 'DROP DAMAGE CONFIRMED',
            metrics: [{ label: 'Motherboard', value: 'Trace Fractured by Impact', status: 'danger' }],
          },
        },
        {
          id: 'tool-emails',
          name: 'Customer Email History',
          iconName: 'Mail',
          category: 'Pre-litigation Records',
          description: 'Admission email from Oct 13.',
          payload: {
            title: 'CUSTOMER ADMISSION DISCOVERED',
            documentContent: {
              sections: [{ body: '"...knocked the laptop off our dining table onto the concrete floor tonight..."' }],
            },
          },
        },
      ],
      availableActions: [
        {
          id: 'action-clause-42-defense',
          label: 'File Defense Citing Clause 4.2 Exclusion + Oct 13 Email Admission',
          description: 'Submit written response containing the technician report and customer\'s written admission email proving physical drop impact under Clause 4.2 exclusion.',
          outcomeQuality: 'optimal',
          consequenceTitle: 'Case Dismissed by Consumer Forum! ⚖️',
          consequenceText:
            'The Consumer Redressal Forum magistrate ruled in favor of Apex Electronics. The customer\'s own written Oct 13 email admission coupled with the technician\'s physical dent audit conclusively established that the failure was caused by drop impact (excluded under Clause 4.2), not a manufacturing defect.',
          keyTakeaway:
            'Combining physical forensic evidence with written party admissions creates an unassailable legal defense.',
          scoreImpact: {
            problemSolving: 95,
            logicalThinking: 96,
            evidenceEvaluation: 98,
            riskAssessment: 92,
            communication: 90,
          },
        },
        {
          id: 'action-settle-50-percent',
          label: 'Offer Out-of-Court Settlement (50% Repair Subsidy)',
          description: 'Offer to repair the unit at half price to avoid tribunal proceedings.',
          outcomeQuality: 'suboptimal',
          consequenceTitle: 'Unnecessary Financial Concession Made ⚠️',
          consequenceText:
            'Apex settled by paying ₹18,000 toward repair costs. While it ended the lawsuit quickly, Senior Partner Meera noted that Apex conceded money unnecessarily when the defense evidence was 100% airtight.',
          keyTakeaway:
            'Settling out of fear of tribunal process when holding conclusive written admissions wastes client resources.',
          scoreImpact: {
            problemSolving: 72,
            logicalThinking: 70,
            evidenceEvaluation: 68,
            riskAssessment: 65,
            communication: 75,
          },
        },
        {
          id: 'action-argues-liquid',
          label: 'Argue That Liquid Ingress Caused the Failure',
          description: 'Focus defense on claiming the customer spilled liquid on the keyboard.',
          outcomeQuality: 'poor',
          consequenceTitle: 'Credibility Ruined in Court ❌',
          consequenceText:
            'The Magistrate reviewed the technician report which stated internal liquid indicators were clean (NEGATIVE). Making false assertions contradicted Apex\'s own expert report, resulting in strict judicial reprimand for misleading court.',
          keyTakeaway:
            'Arguing unverified claims that contradict your own physical evidence destroys legal credibility.',
          scoreImpact: {
            problemSolving: 42,
            logicalThinking: 45,
            evidenceEvaluation: 40,
            riskAssessment: 38,
            communication: 55,
          },
        },
      ],
      requiresReasoning: true,
      reasoningPrompt: 'Explain your legal strategy. Why does your chosen evidence combination legally defeat the customer\'s claim under consumer law?',
    },
    {
      id: 'stage-3-resolve',
      stageNumber: 3,
      stageName: '03 Resolve',
      shortName: 'Resolve',
      objective: 'Review judicial outcome and legal defense evaluation.',
      description: 'Review the tribunal ruling and defense evaluation.',
      availableTools: [],
      requiresReasoning: false,
    },
  ],
};
