/**
 * File Upload Validation Utility
 *
 * Validates file uploads using magic numbers (file signatures) to prevent
 * users from bypassing MIME type checks by renaming files.
 *
 * @example
 * import { validateFileType } from '@/app/lib/fileValidation';
 *
 * const buffer = Buffer.from(await file.arrayBuffer());
 * if (!validateFileType(buffer, ['pdf', 'doc', 'docx'])) {
 *   return NextResponse.json({ error: "Invalid file type" });
 * }
 */

/**
 * Magic numbers (file signatures) for common file types
 * These are the first few bytes of each file type
 */
const FILE_SIGNATURES = {
  // PDF
  pdf: [0x25, 0x50, 0x44, 0x46], // %PDF

  // Microsoft Word (.doc)
  doc: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1],

  // Microsoft Word (.docx) - ZIP-based format
  docx: [0x50, 0x4b, 0x03, 0x04], // PK (ZIP header)

  // JPEG
  jpeg: [0xff, 0xd8, 0xff],

  // PNG
  png: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],

  // GIF
  gif: [0x47, 0x49, 0x46, 0x38], // GIF8
} as const;

type FileType = keyof typeof FILE_SIGNATURES;

/**
 * Check if buffer starts with the given signature
 */
function matchesSignature(buffer: Buffer, signature: number[]): boolean {
  if (buffer.length < signature.length) return false;

  for (let i = 0; i < signature.length; i++) {
    if (buffer[i] !== signature[i]) return false;
  }

  return true;
}

/**
 * Validate file type using magic numbers
 *
 * @param buffer - File buffer (first 8+ bytes)
 * @param allowedTypes - Array of allowed file types
 * @returns true if file type matches one of the allowed types
 */
export function validateFileType(
  buffer: Buffer,
  allowedTypes: FileType[]
): boolean {
  for (const type of allowedTypes) {
    const signature = FILE_SIGNATURES[type];
    if (matchesSignature(buffer, signature)) {
      return true;
    }
  }

  return false;
}

/**
 * Special case for .docx validation (additional check beyond ZIP signature)
 * .docx files are ZIP archives, so we need to verify the ZIP contains Word content
 *
 * @param buffer - Full file buffer
 * @returns true if file appears to be a valid .docx
 */
export function validateDocx(buffer: Buffer): boolean {
  // First check if it's a ZIP file
  if (!matchesSignature(buffer, FILE_SIGNATURES.docx)) {
    return false;
  }

  // Check for Word-specific markers in the ZIP content
  // Look for "[Content_Types].xml" which is present in all Office Open XML files
  const content = buffer.toString("utf-8");
  return (
    content.includes("[Content_Types].xml") ||
    content.includes("word/document.xml")
  );
}

/**
 * Comprehensive file validation for job applications
 *
 * @param file - File object from FormData
 * @param allowedTypes - Array of allowed MIME types
 * @param maxSizeBytes - Maximum file size in bytes
 * @returns { valid: boolean, error?: string }
 */
export async function validateUploadedFile(
  file: File,
  allowedTypes: string[],
  maxSizeBytes: number
): Promise<{ valid: boolean; error?: string }> {
  // Check MIME type first (quick check)
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} not allowed. Allowed types: ${allowedTypes.join(", ")}`,
    };
  }

  // Check file size
  if (file.size > maxSizeBytes) {
    const maxMB = (maxSizeBytes / (1024 * 1024)).toFixed(1);
    return { valid: false, error: `File size must be under ${maxMB}MB` };
  }

  // Read first 8 bytes for magic number validation
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Map MIME types to our file type keys
  const typeMap: Record<string, FileType[]> = {
    "application/pdf": ["pdf"],
    "application/msword": ["doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      "docx",
    ],
    "image/jpeg": ["jpeg"],
    "image/png": ["png"],
    "image/gif": ["gif"],
  };

  const fileTypes = typeMap[file.type];
  if (!fileTypes) {
    return { valid: false, error: "Unsupported file type" };
  }

  // Special handling for .docx (needs deeper validation)
  if (file.type.includes("wordprocessingml")) {
    if (!validateDocx(buffer)) {
      return { valid: false, error: "File is not a valid Word document" };
    }
    return { valid: true };
  }

  // Validate using magic numbers
  if (!validateFileType(buffer, fileTypes)) {
    return {
      valid: false,
      error: "File content does not match declared type (possible file rename)",
    };
  }

  return { valid: true };
}
