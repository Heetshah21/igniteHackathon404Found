// ============================================================
// CAREERMitra — Document Verification Providers
// Clean architecture supporting current manual upload & future DigiLocker
// ============================================================

import {
  DocumentVerificationProvider,
  DocumentVerificationResult,
} from './types';

/**
 * Manual Upload Verification Provider (Current MVP)
 *
 * When a student provides/uploads marksheet data or documents,
 * this provider records that a document is present, but marks it as
 * 'pending_verification' because manual upload / OCR cannot independently
 * verify authenticity without an authorized issuing source.
 */
export class ManualUploadVerificationProvider
  implements DocumentVerificationProvider
{
  readonly providerId = 'manual_upload';
  readonly displayName = 'Manual Document Upload';

  isAvailable(): boolean {
    return true;
  }

  async getVerificationStatus(
    studentId: string,
    documentType: string
  ): Promise<DocumentVerificationResult> {
    // Current MVP status for student-uploaded documents
    return {
      status: 'pending_verification',
      source: 'Student Upload',
      verifiedAt: new Date().toISOString(),
    };
  }
}

/**
 * DigiLocker Verification Provider (Future Integration Architecture)
 *
 * Ready for future backend OAuth 2.0 DigiLocker integration.
 * DigiLocker enables government-authorized digital document verification
 * directly from educational boards (CBSE, State Boards, CISCE, etc.).
 *
 * Requirements when enabling:
 * - Server-side OAuth 2.0 flow
 * - Endpoints: /api/verification/digilocker/auth, /api/verification/digilocker/callback
 * - Consent-driven document retrieval
 */
export class DigiLockerVerificationProvider
  implements DocumentVerificationProvider
{
  readonly providerId = 'digilocker';
  readonly displayName = 'DigiLocker (Govt of India)';

  isAvailable(): boolean {
    // Feature flag: disabled until server credentials and OAuth endpoints are active
    return false;
  }

  async getVerificationStatus(
    studentId: string,
    documentType: string
  ): Promise<DocumentVerificationResult> {
    if (!this.isAvailable()) {
      return {
        status: 'not_uploaded',
        source: 'DigiLocker',
        error: 'DigiLocker integration coming soon.',
      };
    }

    // Future implementation: call secure backend route
    return {
      status: 'pending_verification',
      source: 'DigiLocker',
    };
  }
}

// Default provider instance for current application use
export const defaultVerificationProvider: DocumentVerificationProvider =
  new ManualUploadVerificationProvider();

export const digiLockerProvider: DocumentVerificationProvider =
  new DigiLockerVerificationProvider();
