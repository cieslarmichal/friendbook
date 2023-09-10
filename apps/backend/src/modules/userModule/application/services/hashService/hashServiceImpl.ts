import { hash, compare, genSalt } from 'bcrypt';
import { symbols } from '../../../symbols.js';
import { UserModuleConfig } from '../../../userModuleConfig.js';
import { HashService } from './hashService.js';
import { Inject, Injectable } from '@libs/dependency-injection';

@Injectable()
export class HashServiceImpl implements HashService {
  public constructor(
    @Inject(symbols.userModuleConfig)
    private readonly userModuleConfig: UserModuleConfig,
  ) {}

  public async hash(plainData: string): Promise<string> {
    const salt = await this.generateSalt();

    return hash(plainData, salt);
  }

  public async compare(plainData: string, hashedData: string): Promise<boolean> {
    return compare(plainData, hashedData);
  }

  private async generateSalt(): Promise<string> {
    const { hashSaltRounds } = this.userModuleConfig;

    return genSalt(hashSaltRounds);
  }
}
