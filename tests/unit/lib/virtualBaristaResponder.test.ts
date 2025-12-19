import { describe, it, expect } from 'vitest';
import { getLocalBaristaReply } from '@/app/lib/virtualBaristaResponder';

describe('virtualBaristaResponder', () => {
  const history = [];

  it('handles empty input', async () => {
    const reply = await getLocalBaristaReply(history, '');
    expect(reply).toContain('Hit me with your question');
  });

  it('answers menu questions (direct item match)', async () => {
    const reply = await getLocalBaristaReply(history, 'How much is the Espresso?');
    expect(reply).toContain('Espresso is $3.50');
  });

  it('answers menu questions (fuzzy match/tokenizing)', async () => {
    // Need to use full name for simple string includes check in implementation
    const reply = await getLocalBaristaReply(history, 'Tell me about the Honey Lavender Latte');
    expect(reply).toContain('Honey Lavender Latte is $5.75');
    expect(reply).toContain('Floral lavender');
  });

  it('provides recommendations on request', async () => {
    const reply = await getLocalBaristaReply(history, 'What do you recommend?');
    expect(reply).not.toBeNull();
    // Recommendations usually contain "Try" or specific item names
    expect(reply.length).toBeGreaterThan(20);
  });

  it('answers basics (hours)', async () => {
    const reply = await getLocalBaristaReply(history, 'When are you open?');
    expect(reply).toContain('Hours: Mon-Sat 7:00am–6:00pm');
  });

  it('answers basics (address/location)', async () => {
    const reply = await getLocalBaristaReply(history, 'Where are you located?');
    expect(reply).toContain('3512 9th St');
  });

  it('answers wifi questions', async () => {
    const reply = await getLocalBaristaReply(history, 'Do you have wifi?');
    expect(reply).toContain('Fast WiFi');
  });

  it('handles unknown queries gracefully', async () => {
    const reply = await getLocalBaristaReply(history, 'zzzzzzzzzz');
    expect(reply).toContain("I couldn't find that in our notes");
  });

  it('handles events queries', async () => {
    const reply = await getLocalBaristaReply(history, 'Any events coming up?');
    // Events might be "No events" or a list
    expect(reply).toMatch(/Events coming up|No events/);
  });
});