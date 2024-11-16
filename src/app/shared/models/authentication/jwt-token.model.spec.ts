import { JwtToken } from './jwt-token.model';

describe('JwtToken', () => {
  it('should create an instance', () => {
    expect(new JwtToken()).toBeTruthy();
  });
});
