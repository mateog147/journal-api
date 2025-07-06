import { createHash } from 'crypto';
import { IPasswordHash } from '../../../domain';

export class PassportHasher implements IPasswordHash {
  transform(password: string): string {
    const hash = createHash('sha224');
    hash.update(password);
    const pwdHash = hash.digest('hex');
    return pwdHash;
  }
}
