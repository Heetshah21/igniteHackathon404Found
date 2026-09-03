// ============================================================
// CAREERMitra — Document Verification Types
// Prepares architecture for DigiLocker integration
// ============================================================

/**
 * Verification status for an academic document (marksheet, certificate, etc.)
 *
 * - 'not_uploaded': No document has been uploaded yet.
 * - 'uploaded': Document uploaded but no verification attempted.
 * - 'pending_verification': Document uploaded; verification is in progress or awaiting a trusted source.
 * - 'verified': Document authenticity confirmed by an authorized verification source (e.g. DigiLocker).
 */
export type DocumentVerificationStatus =
  | 'not_uploaded'
  | 'uploaded'
  | 'pending_verification'
  | 'verified';

/**
 * Metadata associated with a verified or pending document.
 */
export interface DocumentVerificationResult {
  status: DocumentVerificationStatus;
  /** Human-readable source of verification, e.g. "DigiLocker", "Manual Upload" */
  source?: string;
  /** ISO timestamp of when verification status was last updated */
  verifiedAt?: string;
  /** Any extracted data from the document (e.g. marks, institution name) */
  extractedData?: Record<string, string | number>;
  /** Error message if verification failed */
  error?: string;
}

/**
 * Abstract interface for document verification providers.
 *
 * Current implementation: ManualUploadVerificationProvider
 * Future implementation: DigiLockerVerificationProvider
 *
 * IMPORTANT: DigiLocker integration requires:
 * - Server-side OAuth 2.0 credentials (client_id, client_secret)
 * - Redirect URI registered with DigiLocker
 * - User consent flow via DigiLocker authorization endpoint
 * - All secrets must remain server-side (never exposed to frontend)
 */
export interface DocumentVerificationProvider {
  /** Unique identifier for this provider */
  readonly providerId: string;

  /** Human-readable name */
  readonly displayName: string;

  /** Whether this provider is currently available/configured */
  isAvailable(): boolean;

  /**
   * Get the current verification status for a student's document.
   * @param studentId - The authenticated student's user ID
   * @param documentType - Type of document, e.g. 'marksheet_10th', 'marksheet_12th'
   */
  getVerificationStatus(
    studentId: string,
    documentType: string
  ): Promise<DocumentVerificationResult>;
}
