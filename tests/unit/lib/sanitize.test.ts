/**
 * Unit Tests for Input Sanitization Utilities
 *
 * Tests XSS prevention, HTML escaping, and input validation
 * Target Coverage: 95%+
 */

import { describe, test, expect } from 'vitest';
import {
  sanitizeText,
  sanitizeMultilineText,
  sanitizeEmail,
  sanitizePhone,
  sanitizeUrl,
  sanitizeJsonString,
  sanitizeObject,
} from '@/app/lib/sanitize';

describe('sanitizeText', () => {
  describe('HTML Tag Removal', () => {
    test('removes script tags', () => {
      expect(sanitizeText('<script>alert("xss")</script>')).toBe('alert("xss")');
      expect(sanitizeText('Hello <script>alert(1)</script> World')).toBe('Hello alert(1) World');
    });

    test('removes all HTML tags', () => {
      expect(sanitizeText('<b>bold</b>')).toBe('bold');
      expect(sanitizeText('<div>test</div>')).toBe('test');
      expect(sanitizeText('<p>paragraph</p>')).toBe('paragraph');
      expect(sanitizeText('Hello <strong>world</strong>!')).toBe('Hello world!');
    });

    test('removes self-closing tags', () => {
      expect(sanitizeText('Test <br/> line')).toBe('Test line');
      expect(sanitizeText('Image <img src="x"/> here')).toBe('Image here');
    });

    test('removes nested HTML tags', () => {
      expect(sanitizeText('<div><p><span>nested</span></p></div>')).toBe('nested');
    });
  });

  describe('JavaScript Injection Prevention', () => {
    test('removes javascript: protocol', () => {
      expect(sanitizeText('javascript:alert(1)')).toBe('alert(1)');
      expect(sanitizeText('JAVASCRIPT:alert(1)')).toBe('alert(1)');
      expect(sanitizeText('JaVaScRiPt:alert(1)')).toBe('alert(1)');
    });

    test('removes event handlers', () => {
      expect(sanitizeText('onload=alert(1)')).toBe('alert(1)');
      expect(sanitizeText('onclick=alert(1)')).toBe('alert(1)');
      expect(sanitizeText('onerror=alert(1)')).toBe('alert(1)');
      expect(sanitizeText('onmouseover=alert(1)')).toBe('alert(1)');
    });

    test('removes multiple event handlers', () => {
      expect(sanitizeText('onload=x onclick=y')).toBe('x y');
    });
  });

  describe('Dangerous Characters', () => {
    test('removes null bytes', () => {
      expect(sanitizeText('test\0null')).toBe('testnull');
      expect(sanitizeText('test\x00byte')).toBe('testbyte');
    });
  });

  describe('Whitespace Normalization', () => {
    test('normalizes multiple spaces', () => {
      expect(sanitizeText('test   multiple   spaces')).toBe('test multiple spaces');
      expect(sanitizeText('test\t\ttabs')).toBe('test tabs');
    });

    test('trims leading and trailing whitespace', () => {
      expect(sanitizeText('  test  ')).toBe('test');
      expect(sanitizeText('\n\ntest\n\n')).toBe('test');
      expect(sanitizeText('\t\ttest\t\t')).toBe('test');
    });

    test('converts newlines to spaces', () => {
      expect(sanitizeText('line1\nline2')).toBe('line1 line2');
      expect(sanitizeText('line1\r\nline2')).toBe('line1 line2');
    });
  });

  describe('Edge Cases', () => {
    test('handles empty string', () => {
      expect(sanitizeText('')).toBe('');
    });

    test('handles whitespace-only string', () => {
      expect(sanitizeText('   ')).toBe('');
      expect(sanitizeText('\n\n\n')).toBe('');
    });

    test('handles normal text without changes', () => {
      expect(sanitizeText('Hello World')).toBe('Hello World');
      expect(sanitizeText('Test 123')).toBe('Test 123');
    });

    test('preserves special characters in text', () => {
      expect(sanitizeText("O'Brien")).toBe("O'Brien");
      expect(sanitizeText('Test @ email.com')).toBe('Test @ email.com');
      expect(sanitizeText('Price: $10.99')).toBe('Price: $10.99');
    });
  });
});

describe('sanitizeMultilineText', () => {
  test('preserves newlines while removing HTML', () => {
    const input = 'Line 1\n<script>bad</script>\nLine 2';
    expect(sanitizeMultilineText(input)).toBe('Line 1\nbad\nLine 2');
  });

  test('normalizes CRLF to LF', () => {
    expect(sanitizeMultilineText('line1\r\nline2')).toBe('line1\nline2');
  });

  test('normalizes CR to LF', () => {
    expect(sanitizeMultilineText('line1\rline2')).toBe('line1\nline2');
  });

  test('removes HTML tags while keeping line structure', () => {
    const input = 'Para 1\n<b>Bold</b>\nPara 2';
    expect(sanitizeMultilineText(input)).toBe('Para 1\nBold\nPara 2');
  });

  test('removes script injection in multiline text', () => {
    const input = 'Safe line\n<script>alert(1)</script>\nAnother line';
    expect(sanitizeMultilineText(input)).toBe('Safe line\nalert(1)\nAnother line');
  });

  test('normalizes horizontal whitespace but keeps newlines', () => {
    expect(sanitizeMultilineText('line1   spaces\nline2   more')).toBe('line1 spaces\nline2 more');
  });

  test('trims overall but preserves internal line breaks', () => {
    expect(sanitizeMultilineText('\n\ntest\n\n')).toBe('test');
    expect(sanitizeMultilineText('  line1\nline2  ')).toBe('line1\nline2');
  });

  test('handles empty string', () => {
    expect(sanitizeMultilineText('')).toBe('');
  });
});

describe('sanitizeEmail', () => {
  test('converts to lowercase', () => {
    expect(sanitizeEmail('TEST@EXAMPLE.COM')).toBe('test@example.com');
    expect(sanitizeEmail('User@Domain.Com')).toBe('user@domain.com');
  });

  test('removes invalid characters', () => {
    expect(sanitizeEmail('test<>@example.com')).toBe('test@example.com');
    expect(sanitizeEmail('test"@example.com')).toBe('test@example.com');
    expect(sanitizeEmail("test'@example.com")).toBe('test@example.com');
  });

  test('allows valid email characters', () => {
    expect(sanitizeEmail('test+tag@example.com')).toBe('test+tag@example.com');
    expect(sanitizeEmail('test-user@example.com')).toBe('test-user@example.com');
    expect(sanitizeEmail('test_user@example.com')).toBe('test_user@example.com');
    expect(sanitizeEmail('test.user@example.com')).toBe('test.user@example.com');
  });

  test('trims whitespace', () => {
    expect(sanitizeEmail('  test@example.com  ')).toBe('test@example.com');
  });

  test('handles empty string', () => {
    expect(sanitizeEmail('')).toBe('');
  });

  test('removes spaces within email', () => {
    expect(sanitizeEmail('test @example.com')).toBe('test@example.com');
    expect(sanitizeEmail('test@ example.com')).toBe('test@example.com');
  });
});

describe('sanitizePhone', () => {
  test('removes non-numeric characters except allowed ones', () => {
    expect(sanitizePhone('(555) 123-4567')).toBe('(555) 123-4567');
    expect(sanitizePhone('+1-555-123-4567')).toBe('+1-555-123-4567');
  });

  test('removes letters', () => {
    expect(sanitizePhone('555-CALL-NOW')).toBe('555--');
  });

  test('preserves allowed characters: +, -, (), space', () => {
    expect(sanitizePhone('+1 (555) 123-4567')).toBe('+1 (555) 123-4567');
  });

  test('trims whitespace', () => {
    expect(sanitizePhone('  555-1234  ')).toBe('555-1234');
  });

  test('handles empty string', () => {
    expect(sanitizePhone('')).toBe('');
  });

  test('removes special characters', () => {
    expect(sanitizePhone('555.123.4567')).toBe('5551234567');
    expect(sanitizePhone('555#123#4567')).toBe('5551234567');
  });
});

describe('sanitizeUrl', () => {
  describe('Valid URLs', () => {
    test('accepts valid http URLs', () => {
      expect(sanitizeUrl('http://example.com')).toBe('http://example.com/');
      expect(sanitizeUrl('http://example.com/path')).toBe('http://example.com/path');
    });

    test('accepts valid https URLs', () => {
      expect(sanitizeUrl('https://example.com')).toBe('https://example.com/');
      expect(sanitizeUrl('https://example.com/page')).toBe('https://example.com/page');
    });

    test('preserves query parameters', () => {
      expect(sanitizeUrl('https://example.com?param=value')).toBe('https://example.com/?param=value');
    });

    test('preserves hash fragments', () => {
      expect(sanitizeUrl('https://example.com#section')).toBe('https://example.com/#section');
    });
  });

  describe('Dangerous URLs', () => {
    test('rejects javascript: protocol', () => {
      expect(sanitizeUrl('javascript:alert(1)')).toBeNull();
      expect(sanitizeUrl('JAVASCRIPT:alert(1)')).toBeNull();
    });

    test('rejects data: URLs', () => {
      expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBeNull();
    });

    test('rejects file: protocol', () => {
      expect(sanitizeUrl('file:///etc/passwd')).toBeNull();
    });

    test('rejects URLs without protocol', () => {
      expect(sanitizeUrl('example.com')).toBeNull();
      expect(sanitizeUrl('//example.com')).toBeNull();
    });

    test('rejects invalid URLs', () => {
      expect(sanitizeUrl('not a url')).toBeNull();
      expect(sanitizeUrl('http://')).toBeNull();
    });
  });

  describe('Edge Cases', () => {
    test('handles empty string', () => {
      expect(sanitizeUrl('')).toBeNull();
    });

    test('trims whitespace', () => {
      expect(sanitizeUrl('  https://example.com  ')).toBe('https://example.com/');
    });
  });
});

describe('sanitizeJsonString', () => {
  test('removes control characters', () => {
    expect(sanitizeJsonString('test\x00null')).toBe('testnull');
    expect(sanitizeJsonString('test\x1Fcontrol')).toBe('testcontrol');
  });

  test('escapes backslashes', () => {
    expect(sanitizeJsonString('test\\path')).toBe('test\\\\path');
  });

  test('escapes double quotes', () => {
    expect(sanitizeJsonString('test "quoted"')).toBe('test \\"quoted\\"');
  });

  test('trims whitespace', () => {
    expect(sanitizeJsonString('  test  ')).toBe('test');
  });

  test('handles empty string', () => {
    expect(sanitizeJsonString('')).toBe('');
  });

  test('handles complex combinations', () => {
    expect(sanitizeJsonString('test\\path "quote" \x00null')).toBe('test\\\\path \\"quote\\" null');
  });
});

describe('sanitizeObject', () => {
  test('recursively sanitizes string values', () => {
    const input = {
      name: '<script>alert(1)</script>John',
      description: 'Test <b>bold</b>',
    };
    const result = sanitizeObject(input);
    expect(result.name).toBe('alert(1)John');
    expect(result.description).toBe('Test bold');
  });

  test('sanitizes email fields specially', () => {
    const input = {
      email: 'TEST@EXAMPLE.COM',
      userEmail: 'USER@DOMAIN.COM',
    };
    const result = sanitizeObject(input, { emailFields: ['email', 'userEmail'] });
    expect(result.email).toBe('test@example.com');
    expect(result.userEmail).toBe('user@domain.com');
  });

  test('sanitizes phone fields specially', () => {
    const input = {
      phone: '555.123.4567',
      mobile: '(555) 987-6543',
    };
    const result = sanitizeObject(input, { phoneFields: ['phone', 'mobile'] });
    expect(result.phone).toBe('5551234567');
    expect(result.mobile).toBe('(555) 987-6543');
  });

  test('sanitizes URL fields specially', () => {
    const input = {
      website: 'https://example.com',
      url: 'javascript:alert(1)',
    };
    const result = sanitizeObject(input, { urlFields: ['website', 'url'] });
    expect(result.website).toBe('https://example.com/');
    expect(result.url).toBe(''); // Invalid URL becomes empty string
  });

  test('handles nested objects', () => {
    const input = {
      user: {
        name: '<b>John</b>',
        profile: {
          bio: '<script>xss</script>Bio',
        },
      },
    };
    const result = sanitizeObject(input);
    expect((result.user as any).name).toBe('John');
    expect((result.user as any).profile.bio).toBe('xssBio');
  });

  test('sanitizes arrays of strings', () => {
    const input = {
      tags: ['<b>tag1</b>', '<script>tag2</script>'],
    };
    const result = sanitizeObject(input);
    expect(result.tags).toEqual(['tag1', 'tag2']);
  });

  test('preserves non-string values', () => {
    const input = {
      count: 42,
      active: true,
      price: 19.99,
      date: null,
      undefined: undefined,
    };
    const result = sanitizeObject(input);
    expect(result.count).toBe(42);
    expect(result.active).toBe(true);
    expect(result.price).toBe(19.99);
    expect(result.date).toBeNull();
    expect(result.undefined).toBeUndefined();
  });

  test('handles empty object', () => {
    const result = sanitizeObject({});
    expect(result).toEqual({});
  });

  test('handles complex real-world scenario', () => {
    const input = {
      name: '  John O\'Brien  ',
      email: 'JOHN@EXAMPLE.COM  ',
      phone: '+1 (555) 123-4567',
      website: 'https://example.com',
      bio: 'Developer\n<script>alert(1)</script>\nPassionate coder',
      tags: ['<b>javascript</b>', 'react', '<i>typescript</i>'],
      metadata: {
        created: '2024-01-01',
        author: '<script>hacker</script>Admin',
      },
    };

    const result = sanitizeObject(input, {
      emailFields: ['email'],
      phoneFields: ['phone'],
      urlFields: ['website'],
    });

    expect(result.name).toBe("John O'Brien");
    expect(result.email).toBe('john@example.com');
    expect(result.phone).toBe('+1 (555) 123-4567');
    expect(result.website).toBe('https://example.com/');
    expect(result.bio).toBe('Developer alert(1) Passionate coder'); // sanitizeText removes tags but keeps contents, converts newlines to spaces
    expect(result.tags).toEqual(['javascript', 'react', 'typescript']);
    expect((result.metadata as any).author).toBe('hackerAdmin');
  });
});
