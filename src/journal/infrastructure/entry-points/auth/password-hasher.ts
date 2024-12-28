import { createHash } from 'crypto';
import { IPasswordHash } from '../../../../journal/domain/model';

export class PassportHasher implements IPasswordHash {
  transform(password: string): string {
    const hash = createHash('sha224');
    hash.update(password);
    const pwdHash = hash.digest('hex');
    return pwdHash;
  }
}
